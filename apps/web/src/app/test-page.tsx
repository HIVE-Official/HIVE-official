export default function TestPage() {
  return (
    <div className="min-h-screen bg-void-900 text-white flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">HIVE Test Page</h1>
        <p className="text-neutral-400">
          Basic page to test if the server is working
        </p>
        <div className="space-y-2">
          <a href="/onboarding" className="block p-2 bg-gold-600 rounded text-void-900 hover:bg-gold-700">
            Go to Onboarding
          </a>
          <a href="/auth/login" className="block p-2 bg-blue-600 rounded text-white hover:bg-blue-700">
            Go to Login
          </a>
        </div>
      </div>
    </div>
  );
}