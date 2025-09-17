"use client";

import { Button, Card, PageContainer } from "@hive/ui";
import { ErrorBoundary } from '../../../../components/error-boundary';

export default function ProfileToolsPage() {
  return (
    <ErrorBoundary>
      <PageContainer>
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">HiveLab Tools</h1>
          <p className="text-gray-400">Build and discover tools to enhance your campus experience</p>
        </div>
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Tools Coming Soon</h2>
          <p className="text-gray-300 mb-6">
            The HIVE builder ecosystem is under development. 
            Check back soon for powerful no-code tools!
          </p>
          <Button variant="outline">
            Back to Profile
          </Button>
        </Card>
      </PageContainer>
    </ErrorBoundary>
  );
}