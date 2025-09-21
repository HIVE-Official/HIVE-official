import os
import re
from pathlib import Path

def fix_ui_package_systematically():
    """Comprehensive fix for all remaining UI package issues"""
    ui_src = Path("packages/ui/src")
    fixed_files = 0
    total_fixes = 0
    
    # Patterns to fix
    patterns = [
        # Missing commas in object/interface definitions
        (r'(\w+):\s*([^,}\n]+)(?:\n\s*)(\w+):', r'\1: \2,\n    \3:'),
        
        # Missing semicolons in type definitions
        (r'(\w+):\s*(\w+(?:<[^>]+>)?(?:\[\])?)(?:\n\s*)(\w+):', r'\1: \2;\n    \3:'),
        
        # Missing commas in function parameters
        (r'(\w+):\s*([^,)\n]+)(?:\n\s*)(\w+):', r'\1: \2,\n    \3:'),
        
        # Fix export declarations
        (r'export\s*{\s*([^}]+)\s*}\s*from', r'export { \1 } from'),
    ]
    
    for tsx_file in ui_src.rglob("*.tsx"):
        try:
            with open(tsx_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            file_fixed = False
            
            for pattern, replacement in patterns:
                new_content = re.sub(pattern, replacement, content, flags=re.MULTILINE)
                if new_content != content:
                    content = new_content
                    file_fixed = True
                    total_fixes += 1
            
            # Additional fixes for common corruption patterns
            if 'string[]};' in content:
                content = content.replace('string[]};', 'string[];')
                file_fixed = True
                total_fixes += 1
                
            if 'Record<string, any>};' in content:
                content = content.replace('Record<string, any>};', 'Record<string, any>;')
                file_fixed = True
                total_fixes += 1
            
            if file_fixed:
                with open(tsx_file, 'w', encoding='utf-8') as f:
                    f.write(content)
                fixed_files += 1
                print(f"✅ Fixed: {tsx_file}")
                
        except Exception as e:
            print(f"❌ Error processing {tsx_file}: {e}")
    
    for ts_file in ui_src.rglob("*.ts"):
        try:
            with open(ts_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            file_fixed = False
            
            for pattern, replacement in patterns:
                new_content = re.sub(pattern, replacement, content, flags=re.MULTILINE)
                if new_content != content:
                    content = new_content
                    file_fixed = True
                    total_fixes += 1
            
            if 'string[]};' in content:
                content = content.replace('string[]};', 'string[];')
                file_fixed = True
                total_fixes += 1
                
            if 'Record<string, any>};' in content:
                content = content.replace('Record<string, any>};', 'Record<string, any>;')
                file_fixed = True
                total_fixes += 1
            
            if file_fixed:
                with open(ts_file, 'w', encoding='utf-8') as f:
                    f.write(content)
                fixed_files += 1
                print(f"✅ Fixed: {ts_file}")
                
        except Exception as e:
            print(f"❌ Error processing {ts_file}: {e}")
    
    return fixed_files, total_fixes

if __name__ == "__main__":
    print("🔧 Starting comprehensive UI package fixes...")
    fixed_files, total_fixes = fix_ui_package_systematically()
    print("
🎉 Fix Summary:"    print(f"   Files fixed: {fixed_files}")
    print(f"   Total fixes applied: {total_fixes}")
    print("   Run 'npx tsc --noEmit' in packages/ui to verify")
