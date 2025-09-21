import os
import glob

def restore_from_backup(file_path):
    """Restore a file from its backup"""
    # Look for backup files with various extensions
    backup_patterns = [
        file_path + '.bak',
        file_path + '.bak5', 
        file_path + '.bak6',
        file_path + '.backup'
    ]
    
    for backup in backup_patterns:
        if os.path.exists(backup):
            try:
                # Read backup content
                with open(backup, 'r', encoding='utf-8') as f:
                    backup_content = f.read()
                
                # Write to original file
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(backup_content)
                
                print(f"✅ Restored: {file_path} from {backup}")
                return True
            except Exception as e:
                print(f"❌ Failed to restore {file_path}: {e}")
                continue
    
    return False

def main():
    print("🔄 RESTORING FROM BACKUPS...")
    
    # Priority order: critical files first
    priority_patterns = [
        'packages/ui/src/components/ui/*.tsx',      # Core UI components
        'packages/ui/src/navigation/**/*.tsx',      # Navigation components  
        'packages/ui/src/types/*.ts',              # Type definitions
        'packages/ui/src/contexts/*.tsx',          # React contexts
        'packages/ui/src/hooks/*.ts',              # React hooks
        'packages/ui/src/lib/*.ts',                # Utility libraries
        'packages/ui/src/**/*.tsx',                 # All TSX components
        'packages/ui/src/**/*.ts'                  # All TypeScript files
    ]
    
    restored_count = 0
    
    for pattern in priority_patterns:
        files = glob.glob(pattern, recursive=True)
        for file_path in files:
            if restore_from_backup(file_path):
                restored_count += 1
    
    print(f"🎉 RESTORED {restored_count} FILES FROM BACKUPS")
    print("📊 Files restored:")
    print("   - Core UI components")
    print("   - Navigation components") 
    print("   - Type definitions")
    print("   - React contexts")
    print("   - React hooks")
    print("   - Utility libraries")

if __name__ == '__main__':
    main()
