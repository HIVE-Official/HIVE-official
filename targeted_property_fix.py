import os
import re
from pathlib import Path

def fix_property_assignments():
    """Targeted fix for TS1136 Property assignment expected errors"""
    ui_src = Path("packages/ui/src")
    fixed_count = 0
    total_fixes = 0
    
    print("🔧 Targeting TS1136 Property assignment expected errors...")
    
    # Pattern: Look for destructured assignments or object literals with missing colons
    # e.g., { prop value } should be { prop: value }
    
    for tsx_file in ui_src.rglob("*.tsx"):
        try:
            with open(tsx_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            changes = 0
            
            # Fix common patterns where property names are missing colons
            # Pattern: { prop value } -> { prop: value }
            # This is tricky because we need to be careful not to break valid syntax
            
            # Look for patterns like: { someProp value } where value is not a string/number
            # This is a simplified approach - we need to be very careful
            
            # Pattern 1: In interface/type definitions
            # { propName type } -> { propName: type }
            
            # Pattern 2: In object literals  
            # { key value } -> { key: value }
            
            # Let's try a more conservative approach - look for specific known issues
            # from the error messages we saw
            
            # Fix pattern: variant "primary" -> variant: "primary"
            content = re.sub(r'variant\s+"([^"]+)"', r'variant: "\1"', content)
            content = re.sub(r'size\s+"([^"]+)"', r'size: "\1"', content)
            content = re.sub(r'type\s+"([^"]+)"', r'type: "\1"', content)
            
            # Fix pattern: disabled true -> disabled: true
            content = re.sub(r'disabled\s+true\b', r'disabled: true', content)
            content = re.sub(r'disabled\s+false\b', r'disabled: false', content)
            
            # Fix pattern: required true -> required: true
            content = re.sub(r'required\s+true\b', r'required: true', content)
            content = re.sub(r'required\s+false\b', r'required: false', content)
            
            # Fix pattern: checked true -> checked: true
            content = re.sub(r'checked\s+true\b', r'checked: true', content)
            content = re.sub(r'checked\s+false\b', r'checked: false', content)
            
            if content != original_content:
                with open(tsx_file, 'w', encoding='utf-8') as f:
                    f.write(content)
                fixed_count += 1
                print(f"✅ Fixed property assignments: {tsx_file}")
                
        except Exception as e:
            print(f"❌ Error with {tsx_file}: {e}")
    
    print("
🎯 Targeted fixes applied to property assignments"    print(f"   Files processed: {fixed_count}")
    print("   Run: cd packages/ui && npx tsc --noEmit"
    
    return fixed_count

if __name__ == "__main__":
    fix_property_assignments()
