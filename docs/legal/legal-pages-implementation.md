# HIVE Legal Pages Implementation

## Overview

This document outlines the implementation of HIVE's legal pages system, including Terms of Service, Privacy Policy, and Community Guidelines. The system is designed to be comprehensive, user-friendly, and maintainable.

## Architecture

### Page Structure

All legal pages follow a consistent structure:

```
/legal/
├── terms/           # Terms of Service
├── privacy/         # Privacy Policy  
└── community-guidelines/  # Community Guidelines
```

### Design Principles

1. **Plain-English First**: Each section starts with a TL;DR summary in conversational language
2. **Comprehensive-Lite**: Covers all announced feature classes without speculative content
3. **Version Management**: Built-in version tracking and history
4. **HIVE Brand Alignment**: Dark theme with gold accents, consistent with platform design

## Content Strategy

### Terms of Service (`/legal/terms`)

**Scope**: Comprehensive coverage of all vBETA features and announced capabilities:
- User accounts and eligibility (13+, .edu email)
- User-generated content and IP ownership
- Space moderation and community guidelines
- Tool creation and sharing policies
- Analytics and privacy practices
- Account suspension and termination procedures

**Key Features**:
- Student IP ownership with platform display license
- Two-tier moderation (builders first, platform oversight)
- Tool safety and security requirements
- COPPA, GDPR, and CCPA compliance flags

### Privacy Policy (`/legal/privacy`)

**Scope**: Comprehensive data practices covering:
- Information collection (account, content, analytics)
- Data usage and sharing policies
- Security measures and protections
- User privacy rights and controls
- Regional compliance (EU GDPR, California CCPA)
- Children's privacy (COPPA)

**Key Features**:
- Anonymized analytics by default
- No data selling policy
- Granular privacy controls
- Data export and deletion rights
- Clear retention policies

### Community Guidelines (`/legal/community-guidelines`)

**Scope**: Behavioral standards and community expectations:
- Core values (respect, authenticity, growth)
- Communication standards
- Academic integrity guidelines
- Content standards and prohibited material
- Tool creation guidelines
- Privacy and safety practices
- Moderation and enforcement procedures

**Key Features**:
- Values-driven approach
- Academic integrity focus
- Two-tier moderation system
- Clear reporting and appeals process

## Technical Implementation

### Component Architecture

Each legal page uses a consistent React component structure:

```typescript
interface LegalDocument {
  version: string
  effectiveDate: string
  title: string
  content: React.ReactNode
}
```

### Key Features

1. **Responsive Design**: Mobile-first approach with proper typography scaling
2. **Accessibility**: Semantic HTML, proper heading hierarchy, keyboard navigation
3. **SEO Optimization**: Proper meta tags, structured content, descriptive URLs
4. **Version Management**: Built-in version history and effective date tracking
5. **Navigation**: Consistent header with back navigation and document type indicators

### Styling

- **Theme**: Dark background (`bg-black`) with gold accents (`text-gold`)
- **Typography**: Proper prose styling with `prose-invert` for dark theme
- **Layout**: Centered content with max-width constraints for readability
- **Interactive Elements**: Hover states and focus indicators for accessibility

## Content Guidelines

### TL;DR Sections

Each major section includes a highlighted TL;DR box:
- Gold border and background tint
- Conversational, Gen Z-friendly language
- One-sentence summary of the key point
- Positioned at the start of each section

### Legal Language Balance

- **Primary**: Plain English explanations
- **Secondary**: Legal precision where required
- **Structure**: Conversational intro → detailed legal text
- **Tone**: Confident-friendly (Apple Support meets campus RA)

### Cross-References

- Internal links between legal documents
- Contact information for different types of inquiries
- Clear escalation paths for issues and appeals

## Compliance Features

### COPPA (Children's Privacy)
- Clear 13+ age requirement
- No collection from children under 13
- Prompt deletion if discovered

### GDPR (European Union)
- Data subject rights
- Consent withdrawal mechanisms
- Supervisory authority contact information
- Data portability provisions

### CCPA (California)
- Right to know data collection practices
- Right to delete personal information
- Right to opt-out (though we don't sell data)
- Non-discrimination provisions

## Contact Information

### Support Channels
- **General Legal**: legal@hive.co
- **Privacy Rights**: privacy@hive.co, data-rights@hive.co
- **Community Issues**: community@hive.co, safety@hive.co
- **Appeals**: appeals@hive.co
- **General Support**: support@hive.co

## Version Management

### Current Version
- **Version**: 2025-01-15
- **Effective Date**: January 15, 2025
- **Status**: Initial release for vBETA launch

### Future Updates
- Version history displayed at bottom of each page
- Material changes communicated via platform and email
- Previous versions accessible via query parameters (planned)
- Changelog maintained for transparency

## Future Enhancements

### Planned Features
1. **MDX Integration**: Move from hardcoded content to MDX files for easier editing
2. **Version Query Support**: Access previous versions via `?v=YYYY-MM-DD`
3. **Change Notifications**: In-app notifications for policy updates
4. **Multi-language Support**: Internationalization for global expansion
5. **Interactive Elements**: Embedded forms for data requests and appeals

### Maintenance Process
1. **Content Updates**: Edit MDX files in `/legal` directory
2. **Version Bumping**: Update version and effective date
3. **Review Process**: Legal review before publication
4. **Communication**: Notify users of material changes
5. **Archive Management**: Maintain previous versions for compliance

## Testing and Validation

### Accessibility Testing
- Screen reader compatibility
- Keyboard navigation
- Color contrast compliance
- Semantic HTML structure

### Legal Review
- Compliance with applicable laws
- Consistency across documents
- Clarity of language and terms
- Completeness of coverage

### User Experience Testing
- Mobile responsiveness
- Reading comprehension
- Navigation flow
- Contact information accessibility

## Integration Points

### Onboarding Flow
- Links from legal consent step
- Required reading before account creation
- Consent logging and verification

### Platform Integration
- Footer links on all pages
- Settings page references
- Help and support integration
- Admin dashboard compliance tools

## Conclusion

The HIVE legal pages system provides a solid foundation for vBETA launch while maintaining flexibility for future growth. The combination of comprehensive coverage, user-friendly presentation, and technical robustness ensures both legal compliance and positive user experience. 