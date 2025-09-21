import os
import re

def fix_comprehensive_corruption(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        fixed = False
        
        # Pattern 1: Record<string, any>}; -> Record<string, any>;
        if 'Record<string, any>};' in content:
            content = re.sub(r'Record<string, any>};', 'Record<string, any>;', content)
            fixed = True
            
        # Pattern 2: string[];}; -> string[]; 
        if 'string[];};' in content:
            content = re.sub(r'string\[\];};', 'string[];', content)
            fixed = True
            
        # Pattern 3: General pattern for type definitions ending with extra }
        # Look for patterns like: property: Type}; -> property: Type;
        patterns = [
            (r'(\w+):\s*(\w+(?:<[^>]+>)?(?:\[\])?)\s*;\s*}', r'\1: \2;'),
        ]
        
        for pattern, replacement in patterns:
            if re.search(pattern, content):
                content = re.sub(pattern, replacement, content)
                fixed = True
        
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
                if fix_comprehensive_corruption(file_path):
                    fixed_count += 1
                    print(f"Fixed: {file_path}")
    
    print(f"Total files fixed: {fixed_count}")

if __name__ == '__main__':
    main()
