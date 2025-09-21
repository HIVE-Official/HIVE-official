import os
import re

def fix_string_arrays(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Pattern to fix: string[];}` -> `string[];`
        original_content = content
        content = re.sub(r'string\[\];}', 'string[];', content)
        
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        return False
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return False

def main():
    fixed_count = 0
    for root, dirs, files in os.walk('packages/ui/src'):
        for file in files:
            if file.endswith(('.ts', '.tsx')):
                file_path = os.path.join(root, file)
                if fix_string_arrays(file_path):
                    fixed_count += 1
                    print(f"Fixed: {file_path}")
    
    print(f"Total files fixed: {fixed_count}")

if __name__ == '__main__':
    main()
