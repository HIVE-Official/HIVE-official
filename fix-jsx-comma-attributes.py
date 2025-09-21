#!/usr/bin/env python3
"""
Fix JSX attributes that have been corrupted with comma syntax.
Converts object-style comma-separated attributes back to proper JSX.
"""
import os
import re
from pathlib import Path

def fix_jsx_comma_attributes():
    """Fix JSX attributes that incorrectly use comma syntax"""
    ui_src = Path("packages/ui/src")
    fixed_files = 0
    total_fixes = 0

    print("🔍 Scanning for JSX comma-separated attribute corruption...")

    # Process all TypeScript/TSX files
    for file_path in list(ui_src.rglob("*.tsx")) + list(ui_src.rglob("*.ts")):
        # Skip backup files
        if '.bak' in str(file_path):
            continue

        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                lines = f.readlines()

            fixed_lines = []
            file_modified = False
            line_fixes = 0

            for i, line in enumerate(lines):
                # Pattern 1: Fix attributes ending with comma
                # Match: attribute="value",
                # Replace with: attribute="value"
                if re.search(r'(\w+)="([^"]*)",\s*$', line):
                    fixed_line = re.sub(r'(\w+)="([^"]*)",\s*$', r'\1="\2"', line)
                    fixed_lines.append(fixed_line)
                    if fixed_line != line:
                        file_modified = True
                        line_fixes += 1

                # Pattern 2: Fix attributes with equals and comma on same line within JSX
                # Match: attribute={value},
                elif re.search(r'(\w+)=\{([^}]*)\},\s*$', line):
                    fixed_line = re.sub(r'(\w+)=\{([^}]*)\},\s*$', r'\1={\2}', line)
                    fixed_lines.append(fixed_line)
                    if fixed_line != line:
                        file_modified = True
                        line_fixes += 1

                # Pattern 3: Fix single word attributes with comma
                # Match lines like:    fill="none",
                elif re.search(r'^\s+(\w+)="([^"]*)",\s*$', line):
                    fixed_line = re.sub(r'^(\s+)(\w+)="([^"]*)",\s*$', r'\1\2="\3"', line)
                    fixed_lines.append(fixed_line)
                    if fixed_line != line:
                        file_modified = True
                        line_fixes += 1

                else:
                    fixed_lines.append(line)

            # Write back if any fixes were made
            if file_modified:
                # Create backup
                backup_path = str(file_path) + '.jsx-comma.bak'
                with open(backup_path, 'w', encoding='utf-8') as f:
                    f.writelines(lines)

                # Write fixed content
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.writelines(fixed_lines)

                fixed_files += 1
                total_fixes += line_fixes
                rel_path = file_path.relative_to('.')
                print(f"✅ Fixed {line_fixes} comma attributes in: {rel_path}")

        except Exception as e:
            print(f"❌ Error processing {file_path}: {e}")

    return fixed_files, total_fixes

def verify_specific_file():
    """Verify fixes in button-enhanced.tsx specifically"""
    file_path = Path("packages/ui/src/atomic/atoms/button-enhanced.tsx")
    print(f"\n📋 Checking {file_path}...")

    try:
        with open(file_path, 'r') as f:
            content = f.read()

        # Check for remaining comma patterns
        comma_attrs = re.findall(r'(\w+)="[^"]*",', content)
        if comma_attrs:
            print(f"⚠️  Still has {len(comma_attrs)} comma attributes")
            print(f"   First few: {comma_attrs[:5]}")
        else:
            print("✅ No comma attributes found")

        # Run TypeScript check on this file
        import subprocess
        result = subprocess.run(
            ['npx', 'tsc', '--noEmit', 'src/atomic/atoms/button-enhanced.tsx'],
            cwd='packages/ui',
            capture_output=True,
            text=True,
            timeout=10
        )

        if result.returncode == 0:
            print("✅ File compiles successfully!")
        else:
            errors = [line for line in result.stdout.split('\n') if 'error TS' in line]
            print(f"⚠️  File still has {len(errors)} TypeScript errors")

    except Exception as e:
        print(f"❌ Could not verify: {e}")

if __name__ == "__main__":
    print("🔧 JSX Comma Attribute Fix")
    print("="*50)

    fixed_files, total_fixes = fix_jsx_comma_attributes()

    print("\n" + "="*50)
    print("🎉 Fix Summary:")
    print(f"   Files fixed: {fixed_files}")
    print(f"   Total comma attributes fixed: {total_fixes}")

    if fixed_files > 0:
        verify_specific_file()

    print("\n📝 Next steps:")
    print("   1. Run 'pnpm build --filter=@hive/ui' to test")
    print("   2. Check for other corruption patterns if errors persist")
    print("   3. Run full monorepo build when ready")