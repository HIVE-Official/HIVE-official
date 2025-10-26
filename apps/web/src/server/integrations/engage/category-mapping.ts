// Bounded Context Owner: Community Guild
// Map Engage categories into canonical platform tags (event type, campus area, audience, group)

const normalize = (s: string) => s.trim().toLowerCase();
const slug = (s: string) => normalize(s).replace(/[^a-z0-9]+/g, '-');

type CategoryMap = Record<string, readonly string[]>;

// Synonym map → canonical tag(s)
const EVENT_TYPE: CategoryMap = {
  'athletics': ['event:athletics'],
  'sports': ['event:athletics'],
  'cultural': ['event:cultural'],
  'arts': ['event:arts'],
  'performing arts': ['event:arts'],
  'social': ['event:social'],
  'career/professional development': ['event:career', 'event:professional-development'],
  'professional development': ['event:professional-development'],
  'career': ['event:career'],
  'academic': ['event:academic'],
  'workshop': ['event:workshop'],
  'wellness': ['event:wellness'],
};

const CAMPUS_AREA: CategoryMap = {
  'north campus': ['campus:north'],
  'south campus': ['campus:south'],
  'downtown campus': ['campus:downtown'],
  'downtown': ['campus:downtown'],
  'online': ['campus:online'],
};

const AUDIENCE: CategoryMap = {
  'undergraduate students': ['audience:undergrad'],
  "master's students": ['audience:masters'],
  'graduate students': ['audience:grad'],
  'phd students': ['audience:phd'],
  'staff': ['audience:staff'],
  'alumni': ['audience:alumni'],
};

const GROUP: CategoryMap = {
  'greek life': ['group:greek'],
  'residential': ['group:residential'],
  'residence life': ['group:residential'],
};

const TABLES: readonly CategoryMap[] = [EVENT_TYPE, CAMPUS_AREA, AUDIENCE, GROUP];

export function mapEngageCategories(categories: readonly string[]): { canonical: readonly string[]; raw: readonly string[] } {
  const raw = categories.map((c) => c.trim()).filter(Boolean);
  const canonical = new Set<string>();
  for (const c of raw) {
    const key = normalize(c);
    let mapped = false;
    for (const table of TABLES) {
      const tags = table[key as keyof typeof table] as readonly string[] | undefined;
      if (tags && tags.length) {
        for (const t of tags) canonical.add(t);
        mapped = true;
      }
    }
    if (!mapped) {
      // Keep a raw slugged tag for transparency/discovery if no mapping exists
      canonical.add(`raw:${slug(c)}`);
    }
  }
  return { canonical: Array.from(canonical), raw };
}

