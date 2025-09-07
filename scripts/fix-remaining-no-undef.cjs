#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Files that need manual fixes based on remaining errors
const manualFixes = [
  {
    file: 'apps/web/src/app/(dashboard)/feed/components/feed-main.tsx',
    fixes: [
      {
        find: 'import { useFeedSync as _useFeedSync, useRealtimeNotifications as _useRealtimeNotifications} from \'@/hooks/use-cross-slice-sync\';',
        replace: 'import { useFeedSync, useRealtimeNotifications } from \'@/hooks/use-cross-slice-sync\';'
      },
      {
        find: /const \{ _user \} = useUnifiedAuth\(\);/,
        replace: 'const { user: _user } = useUnifiedAuth();'
      }
    ]
  },
  {
    file: 'apps/web/src/app/(dashboard)/feed/page.tsx',
    fixes: [
      {
        find: 'const { user } = useAuth(); // TODO: Import useAuth hook',
        replace: 'const { user } = useUnifiedAuth();'
      },
      {
        find: /await likePost\(_postId\);/g,
        replace: 'await _likePost(_postId);'
      },
      {
        find: /await commentOnPost\(_postId, content\);/g,
        replace: 'await _commentOnPost(_postId, content);'
      },
      {
        find: /await sharePost\(_postId\);/g,
        replace: 'await _sharePost(_postId);'
      },
      {
        find: /onPost={handleCreatePost}/,
        replace: 'onPost={_handleCreatePost}'
      },
      {
        find: /onLike={handleLike}/,
        replace: 'onLike={_handleLike}'
      },
      {
        find: /onComment={handleComment}/,
        replace: 'onComment={_handleComment}'
      },
      {
        find: /onShare={handleShare}/,
        replace: 'onShare={_handleShare}'
      }
    ]
  },
  {
    file: 'apps/web/src/app/(dashboard)/hivelab/page.tsx',
    fixes: [
      {
        find: /handleToolSave\(_tool\);/g,
        replace: '_handleToolSave(_tool);'
      },
      {
        find: /handleToolPreview\(_tool\);/g,
        replace: '_handleToolPreview(_tool);'
      },
      {
        find: /handleModeSelect\([^)]*\)/g,
        replace: '_handleModeSelect'
      }
    ]
  },
  {
    file: 'apps/web/src/app/(dashboard)/profile/analytics/page.tsx',
    fixes: [
      {
        find: 'import { useRouter as _useRouter} from \'next/navigation\';',
        replace: ''
      },
      {
        find: 'const { _profile, isLoading: __profile, isLoading } = useHiveProfile();',
        replace: 'const { profile: _profile, isLoading } = useProfile(); // TODO: Replace with correct hook'
      },
      {
        find: /if \(!profile\) return null;/,
        replace: 'if (!_profile) return null;'
      },
      {
        find: /profile\.identity\./g,
        replace: '_profile.identity.'
      },
      {
        find: /profile\.builder\?/g,
        replace: '_profile.builder?'
      }
    ]
  }
];

function fixFile(fileInfo) {
  const filePath = path.join(__dirname, '..', fileInfo.file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let hasChanges = false;

  console.log(`🔧 Processing: ${fileInfo.file}`);

  for (const fix of fileInfo.fixes) {
    if (fix.find instanceof RegExp) {
      if (fix.find.test(content)) {
        content = content.replace(fix.find, fix.replace);
        hasChanges = true;
        console.log(`   ✅ Applied regex fix`);
      }
    } else {
      if (content.includes(fix.find)) {
        content = content.replace(fix.find, fix.replace);
        hasChanges = true;
        console.log(`   ✅ Applied fix: ${fix.find.substring(0, 50)}...`);
      }
    }
  }

  if (hasChanges) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Updated: ${fileInfo.file}`);
  } else {
    console.log(`ℹ️  No changes needed: ${fileInfo.file}`);
  }
}

// Apply all manual fixes
console.log('🚀 Applying targeted no-undef fixes...\n');

for (const fileInfo of manualFixes) {
  try {
    fixFile(fileInfo);
  } catch (error) {
    console.error(`❌ Error fixing ${fileInfo.file}:`, error.message);
  }
}

console.log('\n✅ Targeted fixes complete!');