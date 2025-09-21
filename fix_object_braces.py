import os
import re
from pathlib import Path

def fix_object_braces():
    ui_src = Path("packages/ui/src")
    fixed_count = 0
    
    print("Fixing missing object braces...")
    
    for tsx_file in ui_src.rglob("*.tsx"):
        try:
            with open(tsx_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            
            # Fix pattern: property: {, -> property: {
            content = re.sub(r'(\w+):\s*{\s*,', r'\1: {', content)
            
            # Fix pattern: property: {,\s*(\w+) -> property: {\n    \1
            content = re.sub(r'(\w+):\s*{\s*,(\w+)', r'\1: {\n    \2', content)
            
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
    fix_object_braces()
