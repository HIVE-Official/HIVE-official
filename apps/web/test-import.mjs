// Test what's actually being exported from @hive/ui
try {
  const hiveUI = await import('@hive/ui');
  console.log('Successfully imported @hive/ui');
  console.log('Available exports:', Object.keys(hiveUI));
  console.log('PageContainer:', hiveUI.PageContainer);
  console.log('Button:', hiveUI.Button);
  console.log('Card:', hiveUI.Card);
  console.log('Label:', hiveUI.Label);
  console.log('Switch:', hiveUI.Switch);
} catch (error) {
  console.error('Import failed:', error.message);
  console.error('Full error:', error);
}