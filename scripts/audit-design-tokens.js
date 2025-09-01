#!/usr/bin/env node

/**
 * HIVE Design Token Audit Script
 * Finds and reports inconsistent design token usage
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

class DesignTokenAuditor {
  constructor() {
    // Patterns that indicate non-semantic token usage
    this.problematicPatterns = {
      // Direct Tailwind colors
      hardcodedColors: /\b(bg-gray-\d+|text-gray-\d+|border-gray-\d+|bg-black|bg-white|text-black|text-white)\b/g,
      
      // Non-semantic color names
      nonSemanticColors: /\b(bg-gold-\d+|text-gold-\d+|border-gold-\d+|bg-red-\d+|bg-blue-\d+|bg-green-\d+)\b/g,
      
      // Hardcoded hex colors
      hexColors: /#[0-9a-fA-F]{3,6}/g,
      
      // RGB colors
      rgbColors: /rgb\\(\\d+,\\s*\\d+,\\s*\\d+\\)/g,
      
      // Pixel values that should use spacing tokens
      pixelSpacing: /\\b(p-\\d+px|m-\\d+px|gap-\\d+px|w-\\d+px|h-\\d+px)\\b/g,
      
      // Non-semantic spacing
      nonSemanticSpacing: /\\b(p-\\d{2,}|m-\\d{2,}|gap-\\d{2,})\\b/g,
      
      // Hardcoded border radius
      hardcodedRadius: /\\b(rounded-\\d+px)\\b/g,
      
      // Old HIVE color references
      oldHiveColors: /\\b(hive-gold|hive-charcoal|hive-steel|hive-champagne)\\b/g
    };

    // Correct semantic token patterns
    this.semanticPatterns = {
      colors: /var\\(--hive-(background|text|border|brand|status)-[a-z-]+\\)/g,
      spacing: /\\b(p-\\d+|m-\\d+|gap-\\d+|space-[xy]-\\d+)\\b/g,
      radius: /\\b(rounded-sm|rounded-md|rounded-lg|rounded-xl|rounded-2xl|rounded-3xl)\\b/g
    };

    this.stats = {
      filesScanned: 0,
      issuesFound: 0,
      issuesByType: {},
      fileIssues: {}
    };
  }

  async auditDirectory(directory) {
    console.log(`🔍 Starting design token audit in: ${directory}`);
    
    const files = glob.sync(`${directory}/**/*.{tsx,ts,jsx,js}`, {
      ignore: ['**/node_modules/**', '**/dist/**', '**/*.test.*', '**/*.stories.*']
    });

    for (const file of files) {
      await this.auditFile(file);
    }

    this.generateReport();
  }

  async auditFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const relativePath = path.relative(process.cwd(), filePath);
      
      this.stats.filesScanned++;
      const fileIssues = [];

      // Check each problematic pattern
      Object.entries(this.problematicPatterns).forEach(([patternName, regex]) => {
        const matches = [...content.matchAll(regex)];
        
        matches.forEach(match => {
          const line = this.getLineNumber(content, match.index);
          const issue = {
            type: patternName,
            pattern: match[0],
            line: line,
            context: this.getContext(content, match.index)
          };
          
          fileIssues.push(issue);
          this.stats.issuesFound++;
          this.stats.issuesByType[patternName] = (this.stats.issuesByType[patternName] || 0) + 1;
        });
      });

      if (fileIssues.length > 0) {
        this.stats.fileIssues[relativePath] = fileIssues;
      }

    } catch (error) {
      console.error(`❌ Error auditing ${filePath}:`, error.message);
    }
  }

  getLineNumber(content, index) {
    return content.substring(0, index).split('\\n').length;
  }

  getContext(content, index) {
    const lines = content.split('\\n');
    const lineNum = this.getLineNumber(content, index) - 1;
    const start = Math.max(0, lineNum - 1);
    const end = Math.min(lines.length, lineNum + 2);
    
    return lines.slice(start, end).map((line, i) => {
      const actualLine = start + i + 1;
      const indicator = actualLine === lineNum + 1 ? '→' : ' ';
      return `${indicator} ${actualLine}: ${line}`;
    }).join('\\n');
  }

  generateReport() {
    console.log('\\n📊 Design Token Audit Report\\n');
    
    // Summary
    console.log(`Files scanned: ${this.stats.filesScanned}`);
    console.log(`Total issues found: ${this.stats.issuesFound}`);
    
    // Issues by type
    if (Object.keys(this.stats.issuesByType).length > 0) {
      console.log('\\n🎨 Issues by Type:');
      Object.entries(this.stats.issuesByType)
        .sort((a, b) => b[1] - a[1])
        .forEach(([type, count]) => {
          console.log(`  ${type}: ${count} occurrences`);
        });
    }

    // Top problematic files
    if (Object.keys(this.stats.fileIssues).length > 0) {
      console.log('\\n📁 Most Problematic Files:');
      Object.entries(this.stats.fileIssues)
        .sort((a, b) => b[1].length - a[1].length)
        .slice(0, 10)
        .forEach(([file, issues]) => {
          console.log(`  ${file}: ${issues.length} issues`);
        });
    }
  }

  generateDetailedReport() {
    const report = {
      summary: {
        filesScanned: this.stats.filesScanned,
        issuesFound: this.stats.issuesFound,
        issuesByType: this.stats.issuesByType
      },
      fileIssues: this.stats.fileIssues,
      recommendations: this.generateRecommendations()
    };

    const reportPath = './design-token-audit-report.json';
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`\\n📄 Detailed report saved to: ${reportPath}`);

    return report;
  }

  generateRecommendations() {
    const recommendations = [];

    if (this.stats.issuesByType.hardcodedColors > 0) {
      recommendations.push({
        priority: 'HIGH',
        issue: 'Hardcoded Colors',
        count: this.stats.issuesByType.hardcodedColors,
        solution: 'Replace with semantic tokens like var(--hive-text-primary), var(--hive-background-secondary)',
        examples: [
          'text-black → text-[var(--hive-text-primary)]',
          'bg-gray-100 → bg-[var(--hive-background-secondary)]'
        ]
      });
    }

    if (this.stats.issuesByType.nonSemanticColors > 0) {
      recommendations.push({
        priority: 'MEDIUM',
        issue: 'Non-semantic Color Names',
        count: this.stats.issuesByType.nonSemanticColors,
        solution: 'Use semantic color tokens that describe purpose, not appearance',
        examples: [
          'bg-gold-500 → bg-[var(--hive-brand-secondary)]',
          'border-red-400 → border-[var(--hive-status-error)]'
        ]
      });
    }

    if (this.stats.issuesByType.oldHiveColors > 0) {
      recommendations.push({
        priority: 'HIGH',
        issue: 'Old HIVE Color References',
        count: this.stats.issuesByType.oldHiveColors,
        solution: 'Update to new semantic token system',
        examples: [
          'hive-gold → var(--hive-brand-secondary)',
          'hive-charcoal → var(--hive-background-primary)'
        ]
      });
    }

    return recommendations;
  }

  // Fix common issues automatically
  async autoFix(directory) {
    console.log(`🔧 Auto-fixing common design token issues in: ${directory}`);
    
    const files = glob.sync(`${directory}/**/*.{tsx,ts}`, {
      ignore: ['**/node_modules/**', '**/dist/**', '**/*.test.*']
    });

    const fixes = {
      // Color fixes
      'text-black': 'text-[var(--hive-text-primary)]',
      'text-white': 'text-[var(--hive-text-inverse)]',
      'bg-white': 'bg-[var(--hive-background-primary)]',
      'bg-black': 'bg-[var(--hive-background-inverse)]',
      'bg-gray-100': 'bg-[var(--hive-background-secondary)]',
      'bg-gray-900': 'bg-[var(--hive-background-primary)]',
      'border-gray-300': 'border-[var(--hive-border-default)]',
      'text-gray-600': 'text-[var(--hive-text-muted)]',
      
      // HIVE brand colors
      'bg-gold': 'bg-[var(--hive-brand-secondary)]',
      'text-gold': 'text-[var(--hive-brand-secondary)]',
      'border-gold': 'border-[var(--hive-brand-secondary)]',
      
      // Old HIVE tokens
      'hive-gold': 'var(--hive-brand-secondary)',
      'hive-charcoal': 'var(--hive-background-primary)',
      'hive-steel': 'var(--hive-text-muted)'
    };

    let fixedFiles = 0;
    let totalFixes = 0;

    for (const file of files) {
      let content = fs.readFileSync(file, 'utf8');
      const originalContent = content;
      let fileFixes = 0;

      Object.entries(fixes).forEach(([oldToken, newToken]) => {
        const regex = new RegExp(`\\\\b${oldToken.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}\\\\b`, 'g');
        const matches = content.match(regex);
        if (matches) {
          content = content.replace(regex, newToken);
          fileFixes += matches.length;
        }
      });

      if (content !== originalContent) {
        fs.writeFileSync(file, content);
        fixedFiles++;
        totalFixes += fileFixes;
        console.log(`✅ Fixed ${fileFixes} issues in ${path.relative(process.cwd(), file)}`);
      }
    }

    console.log(`\\n🎉 Auto-fix complete:`);
    console.log(`Files modified: ${fixedFiles}`);
    console.log(`Total fixes applied: ${totalFixes}`);
  }
}

// CLI Usage
if (require.main === module) {
  const auditor = new DesignTokenAuditor();
  const command = process.argv[2];
  const directory = process.argv[3] || '.';

  switch (command) {
    case 'audit':
      auditor.auditDirectory(directory);
      break;
    
    case 'report':
      auditor.auditDirectory(directory).then(() => {
        auditor.generateDetailedReport();
      });
      break;
    
    case 'fix':
      auditor.autoFix(directory);
      break;
    
    default:
      console.log(`
Usage: 
  node audit-design-tokens.js audit [directory]   - Audit design token usage
  node audit-design-tokens.js report [directory]  - Generate detailed report
  node audit-design-tokens.js fix [directory]     - Auto-fix common issues

Examples:
  node audit-design-tokens.js audit apps/web/src
  node audit-design-tokens.js fix packages/ui/src
      `);
  }
}

module.exports = DesignTokenAuditor;