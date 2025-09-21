#!/usr/bin/env python3
"""
HIVE UI Critical JSX Issues Fix
Addresses critical JSX structure problems preventing TypeScript compilation
"""

import os
import re
import glob

def fix_critical_jsx_issues(file_path):
    """Fix critical JSX structure issues"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        original_content = content
        fixes_applied = 0

        # Pattern 1: Fix JSX props ending with semicolon
        # e.g., 'required;' -> 'required'
        pattern1 = r'(\w+);(\s*\n\s*)(\.\.\.|\}|<\/)'
        matches1 = re.findall(pattern1, content)
        if matches1:
            content = re.sub(pattern1, r'\1\2\3', content)
            fixes_applied += len(matches1)
            print(f"  Fixed {len(matches1)} JSX props ending with semicolon")

        # Pattern 2: Fix malformed JSX opening tags with missing >
        # e.g., '<div className="something"}{element}' -> '<div className="something">\n{element}'
        pattern2 = r'(<\w+[^>]*)"([^"]*)}([^>]*{[^}]+})'
        matches2 = re.findall(pattern2, content)
        if matches2:
            content = re.sub(pattern2, r'\1"\2>\n\3', content)
            fixes_applied += len(matches2)
            print(f"  Fixed {len(matches2)} malformed JSX opening tags")

        # Pattern 3: Fix JSX attributes missing space separation
        # e.g., 'prop="value"      otherprop="value"' -> 'prop="value"\n      otherprop="value"'
        pattern3 = r'(\w+="[^"]*")(\s{6,})(\w+="[^"]*")'
        matches3 = re.findall(pattern3, content)
        if matches3:
            content = re.sub(pattern3, r'\1\n\2\3', content)
            fixes_applied += len(matches3)
            print(f"  Fixed {len(matches3)} JSX attributes missing line breaks")

        # Pattern 4: Fix incomplete JSX tag closures in multiline components
        # e.g., '}' at end of line where should be ');'
        pattern4 = r'}(\s*\n\s*)\},(\s*\n)'
        matches4 = re.findall(pattern4, content)
        if matches4:
            content = re.sub(pattern4, r'}\1),\2', content)
            fixes_applied += len(matches4)
            print(f"  Fixed {len(matches4)} incomplete JSX component closures")

        # Pattern 5: Fix return statements with missing parentheses
        # e.g., 'return (JSX stuff' without closing );
        pattern5 = r'(\breturn\s*\([^)]*<[^>]*>[^)]*)}(?=\s*\n\s*\})'
        matches5 = re.findall(pattern5, content)
        if matches5:
            content = re.sub(pattern5, r'\1);', content)
            fixes_applied += len(matches5)
            print(f"  Fixed {len(matches5)} return statement closures")

        # Pattern 6: Fix object property ending with semicolon instead of comma
        # e.g., 'property: value;' in object -> 'property: value,'
        pattern6 = r'(\w+:\s*[^,;]+);(\s*\n\s*\w+:)'
        matches6 = re.findall(pattern6, content)
        if matches6:
            content = re.sub(pattern6, r'\1,\2', content)
            fixes_applied += len(matches6)
            print(f"  Fixed {len(matches6)} object properties ending with semicolon")

        # Write back if changes were made
        if fixes_applied > 0:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return fixes_applied

        return 0

    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return 0

def main():
    """Fix critical JSX issues in UI package"""
    print("🚨 HIVE UI Critical JSX Issues Fix")
    print("=" * 50)

    # Focus on the most problematic files first
    critical_files = [
        "/Users/laneyfraass/hive_ui/packages/ui/src/atomic/atoms/checkbox-enhanced.tsx",
        "/Users/laneyfraass/hive_ui/packages/ui/src/atomic/atoms/radio-enhanced.tsx",
        "/Users/laneyfraass/hive_ui/packages/ui/src/atomic/atoms/select-enhanced.tsx",
        "/Users/laneyfraass/hive_ui/packages/ui/src/atomic/atoms/switch-enhanced.tsx",
        "/Users/laneyfraass/hive_ui/packages/ui/src/atomic/atoms/hive-brand.tsx",
    ]

    total_fixes = 0
    files_fixed = 0

    for file_path in critical_files:
        if os.path.exists(file_path):
            rel_path = os.path.relpath(file_path, "/Users/laneyfraass/hive_ui/packages/ui/src")
            fixes = fix_critical_jsx_issues(file_path)

            if fixes > 0:
                print(f"✅ {rel_path}: {fixes} critical fixes")
                total_fixes += fixes
                files_fixed += 1
            else:
                print(f"✓ {rel_path}: no critical issues")
        else:
            print(f"❌ File not found: {file_path}")

    print("=" * 50)
    print(f"🎯 CRITICAL FIX RESULTS:")
    print(f"   Files processed: {len(critical_files)}")
    print(f"   Files fixed: {files_fixed}")
    print(f"   Total fixes: {total_fixes}")
    print("=" * 50)

if __name__ == "__main__":
    main()