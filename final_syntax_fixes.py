import os
import re

def fix_final_syntax_issues(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        fixed = False
        
        # Fix missing commas in array/object definitions
        content = re.sub(r'(\w+):(\s*\w+)(?:\n\s*)(\w+):', r'\1:\2,\n    \3:', content)
        
        # Fix missing semicolons in type definitions
        content = re.sub(r'(\w+):\s*(\w+(?:<[^>]+>)?(?:\[\])?)(?:\n\s*)(\w+):', r'\1: \2;\n    \3:', content)
        
        # Fix missing commas in export statements
        content = re.sub(r'export\s*{\s*([^}]+)\s*}\s*from', r'export { \1 } from', content)
        
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        return False
    except Exception as e:
        return False

def main():
    print("🔧 FINAL SYNTAX FIXES...")
    
    files_to_check = [
        'packages/ui/src/atomic/atoms/color-system.ts',
        'packages/ui/src/atomic/atoms/index.ts', 
        'packages/ui/src/atomic/foundations/design-principles.ts'
    ]
    
    fixed_count = 0
    for file_path in files_to_check:
        if os.path.exists(file_path):
            if fix_final_syntax_issues(file_path):
                fixed_count += 1
                print(f"✅ Fixed: {file_path}")
    
    print(f"🎉 FIXED {fixed_count} FILES WITH FINAL SYNTAX CORRECTIONS")

if __name__ == '__main__':
    main()
