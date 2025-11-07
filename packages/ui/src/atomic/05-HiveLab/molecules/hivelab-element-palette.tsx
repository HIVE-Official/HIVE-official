import * as React from 'react';
import { Card, CardContent, Input, Label, Button } from '../../00-Global/atoms';
import { ElementRegistry, initializeElementSystem, type ElementDefinition } from '../../lib/hivelab/element-system';

export interface HiveLabElementPaletteProps {
  onDragStart?: (element: ElementDefinition) => void;
  onInsert?: (element: ElementDefinition) => void;
}

export function HiveLabElementPalette({ onDragStart, onInsert }: HiveLabElementPaletteProps) {
  const [query, setQuery] = React.useState('');
  const [elements, setElements] = React.useState<ElementDefinition[]>([]);

  React.useEffect(() => {
    const registry = initializeElementSystem();
    setElements(registry.getAllElements());
  }, []);

  const filtered = React.useMemo(() => {
    if (!query.trim()) return elements;
    const q = query.toLowerCase();
    return elements.filter(e => e.name.toLowerCase().includes(q) || e.description.toLowerCase().includes(q));
  }, [query, elements]);

  return (
    <div className="h-full flex flex-col gap-3">
      <div>
        <Label htmlFor="palette-search" className="text-xs">Search elements</Label>
        <Input id="palette-search" value={query} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)} placeholder="Find elements..." className="mt-1" />
      </div>
      <div className="flex-1 overflow-auto space-y-2 pr-1" role="list">
        {filtered.map((el) => (
          <Card key={el.id} className="bg-hive-background-tertiary border-hive-border-default" role="listitem">
            <CardContent className="p-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-hive-background-primary border border-hive-border-default flex items-center justify-center text-sm" aria-hidden>📦</div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white truncate">{el.name}</div>
                <div className="text-xs text-hive-text-tertiary truncate">{el.description}</div>
              </div>
              <Button size="sm" variant="secondary" draggable onDragStart={() => onDragStart?.(el)} onClick={() => onInsert?.(el)} aria-label={`Insert ${el.name}`}>
                Add
              </Button>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && (
          <div className="text-sm text-hive-text-tertiary p-2">No elements found</div>
        )}
      </div>
    </div>
  );
}

HiveLabElementPalette.displayName = 'HiveLabElementPalette';

