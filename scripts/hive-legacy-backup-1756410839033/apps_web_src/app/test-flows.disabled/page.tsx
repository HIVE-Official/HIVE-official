"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ButtonEnhanced, Card, CardContent, CardHeader, CardTitle } from "@hive/ui";
import { CheckCircle, AlertCircle, ArrowRight, Home } from "lucide-react";
import Link from "next/link";

interface FlowTest {
  id: string;
  name: string;
  description: string;
  path: string;
  expectedOutcome: string;
  category: "auth" | "onboarding" | "main" | "error";
}

const FLOW_TESTS: FlowTest[] = [
  // Auth Flows
  {
    id: "welcome-get-started",
    name: "Welcome → Get Started",
    description: "Click Get Started button on welcome page",
    path: "/welcome",
    expectedOutcome: "Navigate to /auth/email",
    category: "auth"
  },
  {
    id: "auth-email-submit",
    name: "Email → Verify",
    description: "Submit .edu email on auth page",
    path: "/auth/email",
    expectedOutcome: "Navigate to /auth/verify",
    category: "auth"
  },
  {
    id: "auth-choose-email",
    name: "Choose → Email",
    description: "Select email auth option",
    path: "/auth/choose",
    expectedOutcome: "Navigate to /auth/email",
    category: "auth"
  },
  
  // Onboarding Flows
  {
    id: "onboarding-welcome-start",
    name: "Onboarding Welcome → Step 1",
    description: "Click 'Let's begin' on welcome",
    path: "/onboarding/welcome",
    expectedOutcome: "Navigate to /onboarding/1",
    category: "onboarding"
  },
  {
    id: "onboarding-step1-next",
    name: "Step 1 → Step 2",
    description: "Complete name/avatar and continue",
    path: "/onboarding/1",
    expectedOutcome: "Navigate to /onboarding/2",
    category: "onboarding"
  },
  {
    id: "onboarding-step2-next",
    name: "Step 2 → Step 3",
    description: "Complete academic info and continue",
    path: "/onboarding/2",
    expectedOutcome: "Navigate to /onboarding/3",
    category: "onboarding"
  },
  {
    id: "onboarding-step3-complete",
    name: "Step 3 → Complete",
    description: "Select interests and finish",
    path: "/onboarding/3",
    expectedOutcome: "Navigate to /onboarding/complete",
    category: "onboarding"
  },
  {
    id: "onboarding-complete-feed",
    name: "Complete → Feed",
    description: "Click 'Go to Feed Now'",
    path: "/onboarding/complete",
    expectedOutcome: "Navigate to /feed",
    category: "onboarding"
  },
  
  // Main App Flows
  {
    id: "feed-signout",
    name: "Feed → Sign Out",
    description: "Click sign out button",
    path: "/feed",
    expectedOutcome: "Navigate to /auth/email",
    category: "main"
  },
  
  // Error Flows
  {
    id: "404-home",
    name: "404 → Home",
    description: "Click 'Go Home' on 404 page",
    path: "/nonexistent-page",
    expectedOutcome: "Navigate to /",
    category: "error"
  },
  {
    id: "404-back",
    name: "404 → Back",
    description: "Click 'Go Back' on 404 page",
    path: "/nonexistent-page",
    expectedOutcome: "Browser back navigation",
    category: "error"
  }
];

export default function TestFlowsPage() {
  const router = useRouter();
  const [testResults, setTestResults] = useState<Record<string, "pass" | "fail" | "pending">>({});
  
  const handleTestFlow = (test: FlowTest) => {
    setTestResults(prev => ({ ...prev, [test.id]: "pending" }));
    
    // Navigate to the test path
    router.push(test.path);
    
    // In a real test, we'd verify the outcome
    // For now, mark as pending for manual verification
    setTimeout(() => {
      setTestResults(prev => ({ ...prev, [test.id]: "pending" }));
    }, 1000);
  };
  
  const markResult = (testId: string, result: "pass" | "fail") => {
    setTestResults(prev => ({ ...prev, [testId]: result }));
  };
  
  const getResultIcon = (result: "pass" | "fail" | "pending" | undefined) => {
    switch (result) {
      case "pass":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "fail":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case "pending":
        return <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />;
      default:
        return <div className="w-5 h-5 border-2 border-muted rounded-full" />;
    }
  };
  
  const categorizedTests = FLOW_TESTS.reduce((acc, test) => {
    if (!acc[test.category]) acc[test.category] = [];
    acc[test.category].push(test);
    return acc;
  }, {} as Record<string, FlowTest[]>);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-display font-bold text-foreground">
              HIVE Flow Testing Dashboard
            </h1>
            <Link href="/">
              <ButtonEnhanced variant="outline">
                <Home className="w-4 h-4 mr-2" />
                Home
              </ButtonEnhanced>
            </Link>
          </div>
          <p className="text-muted-foreground">
            Test all critical navigation flows to ensure buttons work properly
          </p>
        </div>

        {/* Test Categories */}
        {Object.entries(categorizedTests).map(([category, tests]) => (
          <Card key={category} className="mb-6">
            <CardHeader>
              <CardTitle className="capitalize text-xl">
                {category} Flows ({tests.length} tests)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {tests.map((test) => (
                  <div
                    key={test.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        {getResultIcon(testResults[test.id])}
                        <div>
                          <h3 className="font-medium text-foreground">
                            {test.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {test.description}
                          </p>
                          <p className="text-xs text-accent mt-1">
                            Expected: {test.expectedOutcome}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {testResults[test.id] === "pending" && (
                        <>
                          <ButtonEnhanced
                            size="sm"
                            variant="outline"
                            onClick={() => markResult(test.id, "pass")}
                            className="text-green-600 border-green-600 hover:bg-green-50"
                          >
                            Pass
                          </ButtonEnhanced>
                          <ButtonEnhanced
                            size="sm"
                            variant="outline"
                            onClick={() => markResult(test.id, "fail")}
                            className="text-red-600 border-red-600 hover:bg-red-50"
                          >
                            Fail
                          </ButtonEnhanced>
                        </>
                      )}
                      
                      <ButtonEnhanced
                        size="sm"
                        onClick={() => handleTestFlow(test)}
                        disabled={testResults[test.id] === "pending"}
                      >
                        Test Flow
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </ButtonEnhanced>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Test Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-foreground">
                  {FLOW_TESTS.length}
                </div>
                <div className="text-sm text-muted-foreground">Total Tests</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-500">
                  {Object.values(testResults).filter(r => r === "pass").length}
                </div>
                <div className="text-sm text-muted-foreground">Passed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-500">
                  {Object.values(testResults).filter(r => r === "fail").length}
                </div>
                <div className="text-sm text-muted-foreground">Failed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">
                  {Object.values(testResults).filter(r => r === "pending").length}
                </div>
                <div className="text-sm text-muted-foreground">Pending</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 