import os
import re
from pathlib import Path

def fix_ui_syntax_issues():
    """Simple but effective fixes for common syntax issues"""
    ui_src = Path("packages/ui/src")
    fixed_count = 0
    
    print("🔧 Starting UI package syntax fixes...")
    
    for file_path in ui_src.rglob("*.tsx"):
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            changes = 0
            
            # Fix missing commas in object literals
            content = re.sub(r'(\w+):\s*([^,}\n]+)(?:\n\s*)(\w+):', r'\1: \2,\n    \3:', content, flags=re.MULTILINE)
            
            # Fix missing semicolons in type definitions  
            content = re.sub(r'(\w+):\s*(\w+(?:<[^>]+>)?(?:\[\])?)(?:\n\s*)(\w+):', r'\1: \2;\n    \3:', content, flags=re.MULTILINE)
            
            # Fix common corruption patterns
            if 'string[]};' in content:
                content = content.replace('string[]};', 'string[];')
                changes += 1
                
            if 'Record<string, any>};' in content:
                content = content.replace('Record<string, any>};', 'Record<string, any>;')
                changes += 1
            
            if content != original_content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                fixed_count += 1
                print(f"✅ Fixed: {file_path}")
                
        except Exception as e:
            print(f"❌ Error with {file_path}: {e}")
    
    return fixed_count

if __name__ == "__main__":
    fixed_count = fix_ui_syntax_issues()
    print(f"\n🎉 Fixed {fixed_count} files")
    print("Run: cd packages/ui && npx tsc --noEmit")
