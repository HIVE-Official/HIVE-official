# Playwright MCP Best Practices for HIVE Web Testing

## Overview

This document outlines proven methodologies for reliable web testing using Playwright MCP (Model Context Protocol) in the HIVE project. These practices were developed through extensive testing of the revolutionary Option B profile system and ensure consistent, reliable testing workflows.

## ★ Core Testing Principles

**1. Clean Browser Sessions**: Always start with fresh browser state to eliminate contamination from previous tests

**2. Systematic Screenshot Documentation**: Capture evidence at key testing milestones to verify responsive behavior

**3. Proper Error Handling**: Account for loading states, network delays, and authentication flows

**4. Session Management**: Close and restart browser sessions when state contamination occurs

## 🔧 Essential Playwright MCP Commands

### Browser Management

```bash
# Start fresh browser session
mcp__playwright__browser_navigate(url: "http://localhost:3000")

# Resize for responsive testing
mcp__playwright__browser_resize(width: 375, height: 667)  # Mobile
mcp__playwright__browser_resize(width: 768, height: 1024) # Tablet
mcp__playwright__browser_resize(width: 1200, height: 800) # Desktop

# Take systematic screenshots
mcp__playwright__browser_take_screenshot(filename: "test-state-description.png")

# Clean session termination
mcp__playwright__browser_close()
```

### Page Interaction

```bash
# Safe navigation with wait
mcp__playwright__browser_navigate(url: "http://localhost:3000/profile")
mcp__playwright__browser_wait_for(time: 3)  # Allow loading

# Interactive element testing
mcp__playwright__browser_click(element: "Profile Button", ref: "profile-btn")
mcp__playwright__browser_type(element: "Search Field", ref: "search", text: "test query")
```

## 📱 Responsive Testing Workflow

### Standard Screen Sizes

1. **Mobile**: 375px × 667px (iPhone SE)
2. **Tablet**: 768px × 1024px (iPad Portrait)
3. **Desktop**: 1200px × 800px (Standard Desktop)

### Testing Sequence

```bash
# 1. Start with clean browser
mcp__playwright__browser_navigate(url: "http://localhost:3000")

# 2. Test mobile layout
mcp__playwright__browser_resize(width: 375, height: 667)
mcp__playwright__browser_navigate(url: "http://localhost:3000/profile")
mcp__playwright__browser_wait_for(time: 3)
mcp__playwright__browser_take_screenshot(filename: "profile-mobile-test.png")

# 3. Test tablet layout
mcp__playwright__browser_resize(width: 768, height: 1024)
mcp__playwright__browser_wait_for(time: 2)
mcp__playwright__browser_take_screenshot(filename: "profile-tablet-test.png")

# 4. Test desktop layout
mcp__playwright__browser_resize(width: 1200, height: 800)
mcp__playwright__browser_wait_for(time: 2)
mcp__playwright__browser_take_screenshot(filename: "profile-desktop-test.png")

# 5. Clean session closure
mcp__playwright__browser_close()
```

## 🧹 Browser Session Management

### When to Start Fresh Sessions

**Always start fresh when:**
- Previous test visited different routes that may cache state
- Authentication state changes between tests
- Error states occurred in previous test
- Testing different user flows

**Session Contamination Indicators:**
- Repeated API calls for non-existent resources (404s)
- Cached loading states affecting new tests
- Authentication errors persisting across page loads
- Background fetch requests from previous navigation

### Clean Session Protocol

```bash
# Terminate contaminated session
mcp__playwright__browser_close()

# Wait for cleanup
# (Brief pause to ensure clean state)

# Start fresh session
mcp__playwright__browser_navigate(url: "http://localhost:3000")

# Verify clean state with landing page
mcp__playwright__browser_take_screenshot(filename: "clean-session-start.png")
```

## 🔍 Testing Critical User Flows

### Profile System Testing

```bash
# 1. Landing Page → Profile Navigation
mcp__playwright__browser_navigate(url: "http://localhost:3000")
mcp__playwright__browser_take_screenshot(filename: "01-landing-clean.png")

# 2. Navigate to profile
mcp__playwright__browser_navigate(url: "http://localhost:3000/profile")
mcp__playwright__browser_wait_for(time: 3)
mcp__playwright__browser_take_screenshot(filename: "02-profile-loading.png")

# 3. Verify profile loaded
mcp__playwright__browser_wait_for(time: 2)
mcp__playwright__browser_take_screenshot(filename: "03-profile-loaded.png")
```

### Authentication Flow Testing

```bash
# Test unauthenticated state
mcp__playwright__browser_navigate(url: "http://localhost:3000/profile")
mcp__playwright__browser_take_screenshot(filename: "profile-unauthenticated.png")

# Test development authentication
mcp__playwright__browser_navigate(url: "http://localhost:3000/dev-login")
mcp__playwright__browser_take_screenshot(filename: "dev-login-page.png")
```

## 📊 Performance Monitoring

### Network Request Analysis

```bash
# Monitor network activity
mcp__playwright__browser_network_requests()

# Check console for errors
mcp__playwright__browser_console_messages()
```

### API Polling Detection

**Watch for excessive API calls:**
- Profile API calls should be controlled (not every 50ms)
- Completion endpoint should handle 404s gracefully
- Campus detection should cache results

**Healthy patterns:**
- Initial page load: 2-4 API calls
- Profile loading: 1-2 API calls
- Background polling: >30 second intervals

## 🎯 Component-Specific Testing

### CompleteHIVEProfileSystem Testing

```bash
# Test responsive ProfileBentoGrid
mcp__playwright__browser_resize(width: 375, height: 667)
mcp__playwright__browser_navigate(url: "http://localhost:3000/profile")
mcp__playwright__browser_wait_for(time: 3)

# Verify components render properly
mcp__playwright__browser_take_screenshot(filename: "profile-bento-mobile.png")

# Test component interactions
mcp__playwright__browser_click(element: "Profile Card", ref: "profile-card")
mcp__playwright__browser_take_screenshot(filename: "profile-card-interaction.png")
```

### Loading State Testing

```bash
# Capture loading states
mcp__playwright__browser_navigate(url: "http://localhost:3000/profile")
mcp__playwright__browser_take_screenshot(filename: "profile-loading-state.png")
mcp__playwright__browser_wait_for(time: 3)
mcp__playwright__browser_take_screenshot(filename: "profile-loaded-state.png")
```

## 🐛 Troubleshooting Common Issues

### Screenshot Timeouts

**Problem**: Screenshots fail due to page rendering issues
**Solution**: Close browser session and start fresh

```bash
mcp__playwright__browser_close()
# Brief pause
mcp__playwright__browser_navigate(url: "http://localhost:3000")
```

### Background Fetch Errors

**Problem**: Previous navigation causes persistent 404s
**Solution**: Clean session management

```bash
# Check console for repeated errors
mcp__playwright__browser_console_messages()

# If errors persist, restart session
mcp__playwright__browser_close()
mcp__playwright__browser_navigate(url: "http://localhost:3000")
```

### Loading State Issues

**Problem**: Components not rendering in screenshots
**Solution**: Increase wait times and verify network completion

```bash
mcp__playwright__browser_wait_for(time: 5)  # Longer wait
mcp__playwright__browser_network_requests()  # Check completion
```

## 📋 Testing Checklist

### Pre-Test Setup
- [ ] Development server running (`pnpm dev --filter=web`)
- [ ] Clean browser session started
- [ ] Target URL accessible at localhost:3000

### Responsive Testing
- [ ] Mobile layout (375px) tested and documented
- [ ] Tablet layout (768px) tested and documented
- [ ] Desktop layout (1200px) tested and documented
- [ ] Screenshots captured for all breakpoints

### Functionality Testing
- [ ] Navigation flows tested
- [ ] Loading states captured
- [ ] Error states handled
- [ ] Interactive elements verified

### Post-Test Cleanup
- [ ] Browser session closed properly
- [ ] Screenshots saved with descriptive names
- [ ] Network requests reviewed for performance
- [ ] Console errors addressed

## 🚀 Advanced Testing Patterns

### Multi-Device Flow Testing

```bash
# Test mobile-to-desktop responsiveness
mcp__playwright__browser_resize(width: 375, height: 667)
mcp__playwright__browser_navigate(url: "http://localhost:3000/profile")
mcp__playwright__browser_take_screenshot(filename: "mobile-start.png")

mcp__playwright__browser_resize(width: 1200, height: 800)
mcp__playwright__browser_wait_for(time: 2)
mcp__playwright__browser_take_screenshot(filename: "desktop-responsive.png")
```

### Performance Impact Testing

```bash
# Before testing change
mcp__playwright__browser_network_requests()  # Baseline

# Test implementation
mcp__playwright__browser_navigate(url: "http://localhost:3000/profile")
mcp__playwright__browser_wait_for(time: 5)

# After testing change
mcp__playwright__browser_network_requests()  # Compare
```

## 🔧 Integration with HIVE Development

### Profile System Testing

The Option B revolutionary profile system requires specific testing approaches:

1. **CompleteHIVEProfileSystem Component**: Test all responsive breakpoints
2. **ProfileBentoGrid Layout**: Verify card arrangements across screen sizes
3. **API Integration**: Monitor useHiveProfile hook performance
4. **Loading States**: Capture progressive loading behavior

### Development Workflow Integration

```bash
# 1. Make code changes
# 2. Verify dev server stable
# 3. Run responsive testing suite
# 4. Document results with screenshots
# 5. Address any issues found
# 6. Clean browser session for next test
```

## 📈 Success Metrics

### Testing Reliability Indicators

- **Clean Screenshots**: No rendering artifacts or loading spinners
- **Consistent Layouts**: Components render properly across breakpoints
- **Performance**: Controlled API request patterns
- **Error Handling**: Graceful degradation for network issues

### Quality Assurance Markers

- **Mobile First**: All features work on 375px screens
- **Progressive Enhancement**: Desktop features enhance mobile experience
- **Loading States**: Users see appropriate feedback during data loading
- **Error Recovery**: Application handles failures gracefully

---

## 🎯 Conclusion

Following these proven Playwright MCP best practices ensures reliable, consistent web testing for the HIVE platform. The key to success is maintaining clean browser sessions, systematic screenshot documentation, and proper error handling throughout the testing workflow.

These methodologies were battle-tested during the Option B revolutionary profile system implementation and provide a solid foundation for all future HIVE testing efforts.