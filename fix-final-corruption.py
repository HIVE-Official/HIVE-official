#!/usr/bin/env python3
"""
HIVE UI Final Corruption Fix
Addresses remaining TypeScript/JSX syntax errors preventing build
"""

import os
import re
import glob

def fix_final_corruption_patterns(file_path):
    """Fix remaining syntax corruption patterns"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        original_content = content
        fixes_applied = 0

        # Pattern 1: Fix incomplete type union with dangling &
        # e.g., "LabelHTMLAttributes<HTMLLabelElement> & ;" -> "LabelHTMLAttributes<HTMLLabelElement> &"
        pattern1 = r'(\w+<\w+>) & ;'
        matches1 = re.findall(pattern1, content)
        if matches1:
            content = re.sub(pattern1, r'\1 &', content)
            fixes_applied += len(matches1)
            print(f"  Fixed {len(matches1)} incomplete type unions")

        # Pattern 2: Fix array filter expressions ending with semicolon
        # e.g., "includes(key);" -> "includes(key)"
        pattern2 = r'\.includes\([^)]+\);'
        matches2 = re.findall(pattern2, content)
        if matches2:
            content = re.sub(r'(\.includes\([^)]+\));', r'\1)', content)
            fixes_applied += len(matches2)
            print(f"  Fixed {len(matches2)} array filter expressions")

        # Pattern 3: Fix expression statements ending with semicolon in arrow functions
        # e.g., "=> key;" should be "=> key"
        pattern3 = r'=> ([^;]+);(?=\s*[\)\]])'
        matches3 = re.findall(pattern3, content)
        if matches3:
            content = re.sub(pattern3, r'=> \1', content)
            fixes_applied += len(matches3)
            print(f"  Fixed {len(matches3)} arrow function expressions")

        # Pattern 4: Fix object method definitions ending with semicolon
        # e.g., "};" -> "}" when followed by closing parenthesis
        pattern4 = r'};(?=\s*\))'
        matches4 = re.findall(pattern4, content)
        if matches4:
            content = re.sub(pattern4, '}', content)
            fixes_applied += len(matches4)
            print(f"  Fixed {len(matches4)} object method endings")

        # Pattern 5: Fix incomplete JSX closing tags
        # Look for incomplete closing patterns and fix common cases
        pattern5 = r'</(\w+)\s*;'
        matches5 = re.findall(pattern5, content)
        if matches5:
            content = re.sub(pattern5, r'</\1>', content)
            fixes_applied += len(matches5)
            print(f"  Fixed {len(matches5)} incomplete JSX closing tags")

        # Pattern 6: Fix function call parameter lists ending with semicolon
        # e.g., "function(param);" in the middle of expressions
        pattern6 = r'(\w+\([^)]*\));(?=\s*[,\)\]])'
        matches6 = re.findall(pattern6, content)
        if matches6:
            content = re.sub(pattern6, r'\1)', content)
            fixes_applied += len(matches6)
            print(f"  Fixed {len(matches6)} function call parameters")

        # Pattern 7: Fix ternary operator conditions ending with semicolon
        # e.g., "condition ? value;" -> "condition ? value"
        pattern7 = r'\? ([^:]+);(?=\s*:)'
        matches7 = re.findall(pattern7, content)
        if matches7:
            content = re.sub(pattern7, r'? \1', content)
            fixes_applied += len(matches7)
            print(f"  Fixed {len(matches7)} ternary expressions")

        # Pattern 8: Fix logical expressions ending with semicolon
        # e.g., "&& expression;" -> "&& expression"
        pattern8 = r'&& ([^;]+);(?=\s*[\)\}])'
        matches8 = re.findall(pattern8, content)
        if matches8:
            content = re.sub(pattern8, r'&& \1', content)
            fixes_applied += len(matches8)
            print(f"  Fixed {len(matches8)} logical expressions")

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
    """Fix final corruption patterns in UI package"""
    print("🔧 HIVE UI Final Corruption Fix")
    print("=" * 50)

    base_dir = "/Users/laneyfraass/hive_ui/packages/ui/src"

    # Find all TypeScript/TSX files
    file_patterns = [
        os.path.join(base_dir, "**/*.ts"),
        os.path.join(base_dir, "**/*.tsx")
    ]

    all_files = []
    for pattern in file_patterns:
        all_files.extend(glob.glob(pattern, recursive=True))

    print(f"📁 Found {len(all_files)} TypeScript/TSX files")

    total_fixes = 0
    files_fixed = 0

    for file_path in sorted(all_files):
        rel_path = os.path.relpath(file_path, base_dir)
        fixes = fix_final_corruption_patterns(file_path)

        if fixes > 0:
            print(f"✅ {rel_path}: {fixes} fixes")
            total_fixes += fixes
            files_fixed += 1
        elif files_fixed < 5:  # Show first few files even if no fixes
            print(f"✓ {rel_path}: no issues")

    print("=" * 50)
    print(f"🎯 FINAL RESULTS:")
    print(f"   Files processed: {len(all_files)}")
    print(f"   Files fixed: {files_fixed}")
    print(f"   Total fixes: {total_fixes}")
    print("=" * 50)

if __name__ == "__main__":
    main()