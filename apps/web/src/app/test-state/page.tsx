import { StateManagementDemo } from '@/components/demo/state-management-demo';

export default function TestStatePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">State Management Test Page</h1>
        <StateManagementDemo />
      </div>
    </div>
  );
}