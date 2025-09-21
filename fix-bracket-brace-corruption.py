#!/usr/bin/env python3
"""
Fix bracket and brace semicolon corruption patterns.
Specifically targets semicolons in incorrect positions around brackets and braces.
"""
import os
import re
from pathlib import Path

def fix_bracket_brace_corruption():
    """Fix semicolons around brackets and braces"""
    ui_src = Path("packages/ui/src")
    fixed_files = 0
    total_fixes = 0

    # Define corruption patterns and fixes
    patterns = [
        # Pattern 1: Opening bracket followed by semicolon: [;
        (r'\[\s*;', '['),

        # Pattern 2: Semicolon before closing brace: ;},
        (r';\s*\}', '}'),

        # Pattern 3: Semicolon before closing bracket and brace: ;],
        (r';\s*\]', ']'),

        # Pattern 4: Semicolon between items: ; expected. (Fix double semicolons)
        (r';;', ';'),

        # Pattern 5: Semicolon after opening brace in objects/blocks: {;
        (r'\{\s*;', '{'),

        # Pattern 6: Semicolons in wrong places in JSX (cleanup various patterns)
        # Fix patterns like: ); expected. which should be )
        (r'\)\s*;\s*expected\.', ')'),

        # Pattern 7: Fix semicolons in template literals or strings that got corrupted
        (r'(\d+px) instead of (\d+)\);', r'\1 instead of \2)'),

        # Pattern 8: Fix semicolons in variable declarations
        # Lines ending with semicolon and comma: ;,
        (r';\s*,', ','),

        # Pattern 9: Fix semicolons before JSX properties
        # like: label="Required" ; {...props}  -> label="Required" {...props}
        (r'"\s*;\s*\{', '" {'),

        # Pattern 10: Fix semicolons in object properties: key: value;},
        (r':\s*([^,}\n]+);\s*\}', r': \1}'),
    ]

    print("🔍 Scanning for bracket/brace semicolon corruption...")

    # Process all TypeScript/TSX files
    for file_path in list(ui_src.rglob("*.tsx")) + list(ui_src.rglob("*.ts")):
        # Skip backup files
        if '.bak' in str(file_path):
            continue

        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()

            original_content = content
            file_fixes = 0

            # Apply each pattern fix
            for pattern, replacement in patterns:
                new_content = re.sub(pattern, replacement, content)
                if new_content != content:
                    occurrences = len(re.findall(pattern, content))
                    file_fixes += occurrences
                    content = new_content

            # Special case: Fix object/array declarations with semicolons
            # Pattern like: const x = [; should be const x = [
            content = re.sub(r'=\s*\[\s*;', '= [', content)
            if content != original_content:
                file_fixes += len(re.findall(r'=\s*\[\s*;', original_content))

            # Fix closing patterns: ;}, or ;], in multiline contexts
            content = re.sub(r'(\n\s+);\s*\},', r'\1},', content)
            content = re.sub(r'(\n\s+);\s*\],', r'\1],', content)

            # Write back if any fixes were made
            if content != original_content:
                # Create backup
                backup_path = str(file_path) + '.bracket.bak'
                if not os.path.exists(backup_path):
                    with open(backup_path, 'w', encoding='utf-8') as f:
                        f.write(original_content)

                # Write fixed content
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)

                fixed_files += 1
                total_fixes += file_fixes
                rel_path = file_path.relative_to('.')
                print(f"✅ Fixed {file_fixes} issues in: {rel_path}")

        except Exception as e:
            print(f"❌ Error processing {file_path}: {e}")

    return fixed_files, total_fixes

def quick_validation():
    """Quick check for common issues in critical files"""
    critical_files = [
        "packages/ui/src/atomic/atoms/button.tsx",
        "packages/ui/src/atomic/atoms/checkbox-enhanced.tsx",
        "packages/ui/src/atomic/atoms/input-enhanced.tsx",
    ]

    print("\n📋 Quick validation of critical files...")
    for file_path in critical_files:
        try:
            with open(file_path, 'r') as f:
                content = f.read()

            issues = []
            if '[;' in content:
                issues.append("Found '[;' pattern")
            if ';},' in content:
                issues.append("Found ';};' pattern")
            if ';;' in content:
                issues.append("Found double semicolons")

            if issues:
                print(f"⚠️  {file_path}: {', '.join(issues)}")
            else:
                print(f"✅ {file_path}: No obvious issues")

        except Exception as e:
            print(f"❌ Could not check {file_path}: {e}")

if __name__ == "__main__":
    print("🔧 Bracket/Brace Semicolon Corruption Fix")
    print("="*50)

    fixed_files, total_fixes = fix_bracket_brace_corruption()

    print("\n" + "="*50)
    print("🎉 Fix Summary:")
    print(f"   Files fixed: {fixed_files}")
    print(f"   Total issues fixed: {total_fixes}")

    if fixed_files > 0:
        quick_validation()

    print("\n📝 Next steps:")
    print("   1. Run 'pnpm build --filter=@hive/ui' to test")
    print("   2. Check TypeScript error count reduction")
    print("   3. If errors persist, analyze for new patterns")