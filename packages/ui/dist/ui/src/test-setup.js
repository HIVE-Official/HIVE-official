import '@testing-library/jest-dom';
// Mock ResizeObserver which is not available in jsdom
global.ResizeObserver = class MockResizeObserver {
    constructor() { }
    observe() { }
    unobserve() { }
    disconnect() { }
};
// Mock IntersectionObserver
global.IntersectionObserver = class MockIntersectionObserver {
    constructor() {
        this.root = null;
        this.rootMargin = '';
        this.thresholds = [];
    }
    observe() { }
    unobserve() { }
    disconnect() { }
    takeRecords() { return []; }
};
// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => { },
        removeListener: () => { },
        addEventListener: () => { },
        removeEventListener: () => { },
        dispatchEvent: () => { },
    }),
});
//# sourceMappingURL=test-setup.js.map