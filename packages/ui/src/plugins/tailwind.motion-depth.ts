// Bounded Context Owner: Design System Guild
import plugin from 'tailwindcss/plugin'

export default plugin(function ({ addUtilities }) {
  addUtilities({
    '.z-app-0': { zIndex: 'var(--z-app-0)' },
    '.z-app-1': { zIndex: 'var(--z-app-1)' },
    '.z-app-2': { zIndex: 'var(--z-app-2)' },
    '.z-app-3': { zIndex: 'var(--z-app-3)' },
    '.z-app-4': { zIndex: 'var(--z-app-4)' },
    '.z-app-5': { zIndex: 'var(--z-app-5)' },
    '.shadow-e0': { boxShadow: 'var(--shadow-e0)' },
    '.shadow-e1': { boxShadow: 'var(--shadow-e1)' },
    '.shadow-e2': { boxShadow: 'var(--shadow-e2)' },
    '.shadow-e3': { boxShadow: 'var(--shadow-e3)' },
    '.shadow-e4': { boxShadow: 'var(--shadow-e4)' },
    '.shadow-e5': { boxShadow: 'var(--shadow-e5)' },
    '.duration-xs': { transitionDuration: 'var(--motion-duration-xs)' },
    '.duration-sm': { transitionDuration: 'var(--motion-duration-sm)' },
    '.duration-md': { transitionDuration: 'var(--motion-duration-md)' },
    '.duration-lg': { transitionDuration: 'var(--motion-duration-lg)' },
    '.duration-xl': { transitionDuration: 'var(--motion-duration-xl)' },
    '.ease-standard': { transitionTimingFunction: 'var(--motion-ease-standard)' },
    '.ease-decel': { transitionTimingFunction: 'var(--motion-ease-decel)' },
    '.ease-accel': { transitionTimingFunction: 'var(--motion-ease-accel)' },
  })
})

