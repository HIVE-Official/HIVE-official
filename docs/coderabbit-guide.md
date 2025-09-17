# CodeRabbit AI Code Review Guide

## Overview

CodeRabbit is an AI-powered code review tool that automatically reviews pull requests and provides intelligent feedback on code quality, security, performance, and best practices.

## Setup Process

### 1. GitHub App Installation

1. Go to [CodeRabbit GitHub App](https://github.com/apps/coderabbit-ai)
2. Click "Install" and select your repository
3. Grant the necessary permissions:
   - Read access to code
   - Write access to pull requests
   - Read access to checks and statuses

### 2. Configuration

The repository is already configured with:

- `.coderabbit.yml` - Main configuration file
- `.github/workflows/coderabbit.yml` - GitHub Actions integration

## How It Works

### Automatic Reviews

CodeRabbit automatically reviews PRs when:

- A new PR is opened
- New commits are pushed to an existing PR
- A draft PR is marked as ready for review

### Review Scope

CodeRabbit reviews:

- ✅ TypeScript/JavaScript files in `apps/` and `packages/`
- ✅ React components and hooks
- ✅ Firebase functions and configurations
- ✅ Security patterns and potential vulnerabilities
- ✅ Performance implications
- ✅ Accessibility compliance

CodeRabbit skips:

- ❌ Generated files (`dist/`, `build/`, `.next/`)
- ❌ Dependencies (`node_modules/`)
- ❌ Log files and temporary files
- ❌ Static assets in `public/`

## HIVE-Specific Focus Areas

### 1. Security Reviews

- Authentication and authorization patterns
- Data access controls
- Potential security vulnerabilities
- Hardcoded secrets detection

### 2. Performance Reviews

- Bundle size implications
- React rendering optimizations
- Database query efficiency
- Async pattern validation

### 3. Accessibility Reviews

- ARIA attributes usage
- Semantic HTML validation
- Keyboard navigation support
- Screen reader compatibility

### 4. Architecture Reviews

- Monorepo boundary enforcement
- Import/export patterns
- Component composition
- State management patterns

## Using CodeRabbit Effectively

### Reading Reviews

CodeRabbit comments include:

- 🔴 **Errors**: Critical issues that should be fixed
- 🟡 **Warnings**: Important suggestions
- 🔵 **Info**: General improvements and best practices
- 💡 **Tips**: Learning opportunities and alternatives

### Responding to Reviews

1. **Address Critical Issues**: Fix errors and security warnings
2. **Consider Warnings**: Evaluate and implement suggested improvements
3. **Learn from Tips**: Use as learning opportunities
4. **Ask Questions**: Use PR comments to discuss suggestions

### Custom Commands

You can interact with CodeRabbit using comments:

```
@coderabbitai review this file
@coderabbitai explain this code
@coderabbitai suggest improvements for performance
@coderabbitai ignore this warning
```

## Configuration Customization

### Adjusting Review Sensitivity

In `.coderabbit.yml`, you can adjust:

```yaml
ai:
  detail_level: "balanced" # "minimal", "balanced", "detailed"
  tone: "constructive" # "formal", "constructive", "friendly"
```

### Adding Custom Rules

```yaml
custom_rules:
  - name: "custom_pattern"
    pattern: "your_regex_here"
    message: "Custom message"
    severity: "warning"
```

### Excluding Files

```yaml
reviews:
  path_filters:
    exclude:
      - "specific/file/path/**"
      - "**/*.generated.ts"
```

## Best Practices

### For Developers

1. **Small PRs**: Smaller PRs get better, more focused reviews
2. **Clear Descriptions**: Help CodeRabbit understand context
3. **Address Feedback**: Engage with suggestions constructively
4. **Learn Patterns**: Use reviews to improve code quality over time

### For Reviewers

1. **Supplement, Don't Replace**: CodeRabbit complements human review
2. **Focus on Logic**: Let AI handle syntax, focus on business logic
3. **Validate Suggestions**: AI suggestions should be evaluated
4. **Provide Context**: Add human insight AI might miss

## Troubleshooting

### Common Issues

**CodeRabbit not reviewing:**

- Check if PR is marked as draft
- Verify GitHub App permissions
- Check workflow runs in Actions tab

**Too many/few suggestions:**

- Adjust `detail_level` in configuration
- Update `path_filters` to include/exclude files
- Modify `focus_areas` for specific concerns

**False positives:**

- Use `@coderabbitai ignore` for one-off cases
- Update custom rules to exclude patterns
- Adjust language-specific settings

### Getting Help

1. Check GitHub Actions logs
2. Review CodeRabbit documentation
3. Use `@coderabbitai help` in PR comments
4. Contact team leads for configuration changes

## Integration with HIVE Development

### Workflow Integration

CodeRabbit fits into our development process:

```
1. Create feature branch
2. Make changes
3. Open PR → CodeRabbit auto-review
4. Address AI feedback
5. Request human review
6. Merge after approval
```

### Quality Gates

CodeRabbit helps enforce:

- **Type Safety**: Catches TypeScript issues
- **Security**: Identifies potential vulnerabilities
- **Performance**: Flags performance anti-patterns
- **Accessibility**: Ensures WCAG compliance
- **Consistency**: Maintains code style standards

### Metrics and Learning

CodeRabbit helps track:

- Code quality trends
- Common issue patterns
- Team learning opportunities
- Security awareness

## Advanced Features

### Learning from Feedback

CodeRabbit adapts to team preferences:

- Learns from accepted/rejected suggestions
- Adjusts to coding style preferences
- Improves suggestions over time

### Integration with Tools

Works with existing tools:

- **ESLint**: Complements static analysis
- **TypeScript**: Enhances type checking
- **Testing**: Reviews test quality
- **Storybook**: Validates component documentation

## Support and Maintenance

### Regular Updates

- Review and update `.coderabbit.yml` quarterly
- Adjust rules based on team feedback
- Update focus areas as platform evolves

### Team Training

- Regular sessions on interpreting AI feedback
- Best practices for responding to reviews
- Learning opportunities from common suggestions

---

For questions or configuration changes, contact the development team leads.
