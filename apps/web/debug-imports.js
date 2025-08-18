// Debug what's actually being exported from @hive/ui
import * as HiveUI from '@hive/ui';

console.log('Available exports from @hive/ui:');
console.log(Object.keys(HiveUI));

console.log('\nLooking for PageContainer:');
console.log('PageContainer:', HiveUI.PageContainer);

console.log('\nLooking for Button:');
console.log('Button:', HiveUI.Button);

console.log('\nLooking for HiveButton:');
console.log('HiveButton:', HiveUI.HiveButton);