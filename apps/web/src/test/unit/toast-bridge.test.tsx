import React from 'react';
import { describe, it, expect } from 'vitest';
import { createRoot } from 'react-dom/client';
import { ToastProvider, useToast } from '@/hooks/use-toast';

function WithHook() {
  const { success } = useToast();
  return (
    <button id="trigger" onClick={() => success('Hook Toast', 'via success()')}>Trigger</button>
  );
}

function mount(node: React.ReactNode) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  root.render(node as any);
  return { container, root };
}

function Viewer() {
  const { toasts } = useToast();
  return <div id="count">{toasts.length}</div>;
}

describe('ToastProvider bridge', () => {
  it('increments toasts when hive:toast event is dispatched', async () => {
    const { container } = mount(
      <ToastProvider>
        <Viewer />
      </ToastProvider>
    );

    await new Promise(r => setTimeout(r, 0));
    expect((container.querySelector('#count') as HTMLElement).textContent).toBe('0');
    // Allow effect to register event listener
    await new Promise(r => setTimeout(r, 0));
    window.dispatchEvent(new CustomEvent('hive:toast', { detail: { title: 'Bridge Toast', type: 'success', duration: 500 } }));
    await new Promise(r => setTimeout(r, 10));
    expect((container.querySelector('#count') as HTMLElement).textContent).toBe('1');
  });
});
