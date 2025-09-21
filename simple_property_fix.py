import os
import re
from pathlib import Path

def fix_property_assignments():
    ui_src = Path("packages/ui/src")
    fixed_count = 0
    
    print("Fixing property assignments...")
    
    for tsx_file in ui_src.rglob("*.tsx"):
        try:
            with open(tsx_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            
            # Fix common property assignment patterns
            content = re.sub(r'variant\s+"([^"]+)"', r'variant: "\1"', content)
            content = re.sub(r'size\s+"([^"]+)"', r'size: "\1"', content)
            content = re.sub(r'type\s+"([^"]+)"', r'type: "\1"', content)
            content = re.sub(r'defaultValue\s+"([^"]+)"', r'defaultValue: "\1"', content)
            
            # Fix boolean properties
            content = re.sub(r'disabled\s+true\b', r'disabled: true', content)
            content = re.sub(r'disabled\s+false\b', r'disabled: false', content)
            content = re.sub(r'required\s+true\b', r'required: true', content)
            content = re.sub(r'required\s+false\b', r'required: false', content)
            content = re.sub(r'checked\s+true\b', r'checked: true', content)
            content = re.sub(r'checked\s+false\b', r'checked: false', content)
            
            if content != original_content:
                with open(tsx_file, 'w', encoding='utf-8') as f:
                    f.write(content)
                fixed_count += 1
                print(f"Fixed: {tsx_file}")
                
        except Exception as e:
            print(f"Error with {tsx_file}: {e}")
    
    print(f"Fixed {fixed_count} files")
    print("Run: cd packages/ui && npx tsc --noEmit")

if __name__ == "__main__":
    fix_property_assignments()
