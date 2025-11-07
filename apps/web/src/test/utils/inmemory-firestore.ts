import { vi } from 'vitest';

type DocData = Record<string, any>;

let idCounter = 0;
const genId = () => `id_${++idCounter}`;

function getNested(obj: any, path: string) {
  return path.split('.').reduce((o, k) => (o ? o[k] : undefined), obj);
}

function setNested(obj: any, path: string, value: any) {
  const keys = path.split('.');
  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i];
    if (!obj[k] || typeof obj[k] !== 'object') obj[k] = {};
    obj = obj[k];
  }
  obj[keys[keys.length - 1]] = value;
}

function applyUpdate(target: any, updates: DocData) {
  for (const [k, v] of Object.entries(updates)) {
    if (k.includes('.')) {
      const prev = getNested(target, k);
      if (v && v.__op === 'inc') {
        const next = (typeof prev === 'number' ? prev : 0) + v.value;
        setNested(target, k, next);
      } else {
        setNested(target, k, v);
      }
    } else if (v && (v as any).__op === 'inc') {
      target[k] = (typeof target[k] === 'number' ? target[k] : 0) + (v as any).value;
    } else {
      target[k] = v;
    }
  }
}

class InMemoryDocRef {
  constructor(private store: Map<string, DocData>, public id: string, private path: string) {}
  async get() {
    const data = this.store.get(this.id);
    return { exists: !!data, id: this.id, data: () => data } as any;
  }
  async set(data: DocData) { this.store.set(this.id, { ...data }); }
  async update(data: DocData) {
    const existing = this.store.get(this.id) || {};
    applyUpdate(existing, data);
    this.store.set(this.id, existing);
  }
  collection(sub: string) {
    return getCollection(`${this.path}/${this.id}/${sub}`);
  }
}

class InMemoryQuery {
  private filters: Array<{ field: string; op: string; value: any }> = [];
  private order?: { field: string; dir: 'asc'|'desc' };
  private _limit?: number;
  private _offset?: number;
  constructor(private coll: InMemoryCollection) {}
  where(field: string, op: string, value: any) { this.filters.push({ field, op, value }); return this; }
  orderBy(field: string, dir: 'asc'|'desc' = 'asc') { this.order = { field, dir }; return this; }
  limit(n: number) { this._limit = n; return this; }
  offset(n: number) { this._offset = n; return this; }
  async get() {
    let items = this.coll.allDocs();
    // apply filters
    for (const f of this.filters) {
      if (f.op === '==') {
        items = items.filter(d => getNested(d.data, f.field) === f.value);
      } else if (f.op === '>=') {
        items = items.filter(d => getNested(d.data, f.field) >= f.value);
      } else if (f.op === 'in') {
        items = items.filter(d => (f.value || []).includes(getNested(d.data, f.field)));
      }
    }
    if (this.order) {
      const { field, dir } = this.order;
      items = items.sort((a, b) => {
        const av = getNested(a.data, field);
        const bv = getNested(b.data, field);
        if (av === bv) return 0;
        return (av > bv ? 1 : -1) * (dir === 'asc' ? 1 : -1);
      });
    }
    if (this._offset) items = items.slice(this._offset);
    if (this._limit != null) items = items.slice(0, this._limit);
    return {
      size: items.length,
      empty: items.length === 0,
      docs: items.map(it => ({ id: it.id, data: () => it.data, ref: this.coll.doc(it.id) }))
    } as any;
  }
}

export class InMemoryCollection {
  private store: Map<string, DocData> = new Map();
  constructor(private path: string) {}
  doc(id?: string) { return new InMemoryDocRef(this.store, id ?? genId(), this.path); }
  async get() {
    const docs = this.allDocs().map(d => ({ id: d.id, data: () => d.data }));
    return { docs } as any;
  }
  where(field: string, op: string, value: any) { return new InMemoryQuery(this).where(field, op, value); }
  orderBy(field: string, dir: 'asc'|'desc' = 'asc') { return new InMemoryQuery(this).orderBy(field, dir); }
  limit(n: number) { return new InMemoryQuery(this).limit(n); }
  offset(n: number) { return new InMemoryQuery(this).offset(n); }
  async add(data: DocData) { const ref = this.doc(); await ref.set(data); return { id: ref.id, get: () => ref.get() } as any; }
  allDocs(): Array<{ id: string; data: DocData }> {
    return Array.from(this.store.entries()).map(([id, data]) => ({ id, data }));
  }
}

const collections: Record<string, InMemoryCollection> = {};
export const getCollection = (path: string) => (collections[path] ||= new InMemoryCollection(path));
export const resetCollections = () => { for (const k of Object.keys(collections)) delete (collections as any)[k]; idCounter = 0; };

export const dbAdminMock = {
  collection: (name: string) => getCollection(name),
  batch: () => {
    return {
      set: (ref: any, data: DocData) => ref.set(data),
      update: (ref: any, data: DocData) => ref.update(data),
      delete: (_ref: any) => {},
      commit: async () => {}
    };
  }
};

export const adminMock = {
  firestore: {
    FieldValue: {
      serverTimestamp: () => new Date(),
      increment: (n: number) => ({ __op: 'inc', value: n })
    }
  }
};
