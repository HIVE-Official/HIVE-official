const fs = require('fs');

const content = fs.readFileSync('/Users/laneyfraass/hive_ui/packages/ui/src/atomic/organisms/tool-configuration-panel.tsx', 'utf8');
const lines = content.split('\n');

let depth = 0;
let componentStarted = false;

lines.forEach((line, index) => {
  if (line.includes('export const ToolConfigurationPanel')) {
    componentStarted = true;
    console.log(`Line ${index + 1}: Component starts`);
  }

  if (!componentStarted) return;

  const openBraces = (line.match(/{/g) || []).length;
  const closeBraces = (line.match(/}/g) || []).length;

  depth += openBraces - closeBraces;

  if (depth === 0 && componentStarted) {
    console.log(`Line ${index + 1}: Component ends (depth 0) - "${line.trim()}"`);
    componentStarted = false;
  }

  if (index === 392 - 1 || index === 393 - 1 || index === 400 - 1) {
    console.log(`Line ${index + 1}: depth=${depth} - "${line.trim()}"`);
  }
});