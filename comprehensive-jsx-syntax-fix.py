#!/usr/bin/env python3
"""
Comprehensive JSX syntax fix for UI package corruption patterns.
Fixes multiple identified corruption patterns in a single pass.
"""
import os
import re
from pathlib import Path

def fix_jsx_syntax_corruption():
    """Fix all identified JSX syntax corruption patterns"""
    ui_src = Path("packages/ui/src")
    fixed_files = 0
    total_fixes = 0

    # Define all corruption patterns and their fixes
    patterns = [
        # Pattern 1: Arrow function with semicolon before JSX
        (r'\) => \(;', r') => ('),

        # Pattern 2: JSX attribute with trailing semicolon
        (r'(\w+)="([^"]*)" ;', r'\1="\2"'),

        # Pattern 3: JSX self-closing tag with space before semicolon
        (r'/> ;', r'/>'),

        # Pattern 4: Object property with double semicolon
        (r';;', r';'),

        # Pattern 5: JSX closing tag with semicolon
        (r'</(\w+)> ;', r'</\1>'),

        # Pattern 6: JSX opening tag attribute with semicolon inside quotes
        (r'="([^"]*);([^"]*)"', r'="\1\2"'),
    ]

    print("🔍 Scanning for JSX syntax corruption patterns...")
    print(f"   Working directory: {ui_src}")
    print()

    # Process all TypeScript/TSX files
    for file_path in list(ui_src.rglob("*.tsx")) + list(ui_src.rglob("*.ts")):
        # Skip backup files
        if file_path.suffix == '.bak':
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

            # Write back if any fixes were made
            if content != original_content:
                # Create backup
                backup_path = str(file_path) + '.bak'
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

def verify_fixes():
    """Run TypeScript compiler to verify fixes"""
    print("\n📝 Verifying TypeScript compilation...")
    import subprocess

    try:
        result = subprocess.run(
            ['npx', 'tsc', '--noEmit'],
            cwd='packages/ui',
            capture_output=True,
            text=True,
            timeout=30
        )

        if result.returncode == 0:
            print("✅ TypeScript compilation successful!")
            return True
        else:
            error_lines = result.stderr.split('\n') if result.stderr else result.stdout.split('\n')
            error_count = len([line for line in error_lines if 'error TS' in line])
            print(f"⚠️  TypeScript still has {error_count} errors")
            print("   First few errors:")
            for line in error_lines[:10]:
                if 'error TS' in line:
                    print(f"   {line}")
            return False

    except subprocess.TimeoutExpired:
        print("⏱️  TypeScript check timed out (this is normal for large projects)")
        return None
    except Exception as e:
        print(f"❌ Could not run TypeScript check: {e}")
        return None

if __name__ == "__main__":
    print("🔧 Comprehensive JSX Syntax Fix")
    print("="*50)

    fixed_files, total_fixes = fix_jsx_syntax_corruption()

    print("\n" + "="*50)
    print("🎉 Fix Summary:")
    print(f"   Files fixed: {fixed_files}")
    print(f"   Total issues fixed: {total_fixes}")

    if fixed_files > 0:
        verify_fixes()

    print("\n📝 Next steps:")
    print("   1. Run 'pnpm build --filter=@hive/ui' to test the build")
    print("   2. If errors persist, examine them for new patterns")
    print("   3. Run 'pnpm build' for full monorepo when UI compiles")