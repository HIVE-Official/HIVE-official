#!/usr/bin/env python3
"""
Fix arrow function JSX corruption in UI package.
Specifically fixes the pattern: ') => (;' which should be ') => ('
"""
import os
import re
from pathlib import Path

def fix_arrow_function_corruption():
    """Fix the specific arrow function semicolon corruption pattern"""
    ui_src = Path("packages/ui/src")
    fixed_files = 0
    total_fixes = 0

    # Pattern to fix: ') => (;' should be ') => ('
    # This corruption adds a semicolon before JSX opening parenthesis
    pattern = r'\) => \(;'
    replacement = r') => ('

    print("🔍 Scanning for arrow function corruption pattern...")

    # Process all TypeScript files
    for file_path in ui_src.rglob("*.tsx"):
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()

            # Check if pattern exists in file
            if pattern in content:
                # Count occurrences for reporting
                occurrences = len(re.findall(pattern, content))

                # Apply fix
                fixed_content = re.sub(pattern, replacement, content)

                # Write back to file
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(fixed_content)

                fixed_files += 1
                total_fixes += occurrences
                print(f"✅ Fixed {occurrences} occurrences in: {file_path.relative_to('.')}")

        except Exception as e:
            print(f"❌ Error processing {file_path}: {e}")

    # Also check .ts files
    for file_path in ui_src.rglob("*.ts"):
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()

            # Check if pattern exists in file
            if pattern in content:
                # Count occurrences for reporting
                occurrences = len(re.findall(pattern, content))

                # Apply fix
                fixed_content = re.sub(pattern, replacement, content)

                # Write back to file
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(fixed_content)

                fixed_files += 1
                total_fixes += occurrences
                print(f"✅ Fixed {occurrences} occurrences in: {file_path.relative_to('.')}")

        except Exception as e:
            print(f"❌ Error processing {file_path}: {e}")

    return fixed_files, total_fixes

if __name__ == "__main__":
    print("🔧 Starting arrow function corruption fix...")
    print("   Pattern to fix: ') => (;' -> ') => ('")
    print()

    fixed_files, total_fixes = fix_arrow_function_corruption()

    print("\n" + "="*50)
    print("🎉 Fix Summary:")
    print(f"   Files fixed: {fixed_files}")
    print(f"   Total occurrences fixed: {total_fixes}")
    print("\n📝 Next steps:")
    print("   1. Run 'pnpm build --filter=@hive/ui' to test the fix")
    print("   2. If more errors, examine them for additional patterns")
    print("   3. Run full build when UI package compiles")