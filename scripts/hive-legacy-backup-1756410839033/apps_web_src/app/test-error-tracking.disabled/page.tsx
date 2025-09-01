'use client';

import { ButtonEnhanced } from '@hive/ui';

export default function TestErrorTracking() {
  const triggerJSError = () => {
    throw new Error('Test JavaScript Error');
  };

  const triggerNullError = () => {
     
    throw null;
  };

  const triggerStringError = () => {
    throw 'String error message';
  };

  const triggerPromiseRejection = () => {
    void Promise.reject('Test promise rejection');
  };

  const triggerUndefinedRejection = () => {
    void Promise.reject(undefined);
  };

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Error Tracking Test Page</h1>
      <p className="text-muted-foreground">
        This page helps test the fixed error tracking system. Open the browser console and network tab to see the errors being tracked.
      </p>
      
      <div className="space-y-2">
        <ButtonEnhanced onClick={triggerJSError} variant="destructive">
          Trigger JavaScript Error
        </ButtonEnhanced>
        
        <ButtonEnhanced onClick={triggerNullError} variant="destructive">
          Trigger Null Error
        </ButtonEnhanced>
        
        <ButtonEnhanced onClick={triggerStringError} variant="destructive">
          Trigger String Error
        </ButtonEnhanced>
        
        <ButtonEnhanced onClick={triggerPromiseRejection} variant="destructive">
          Trigger Promise Rejection
        </ButtonEnhanced>
        
        <ButtonEnhanced onClick={triggerUndefinedRejection} variant="destructive">
          Trigger Undefined Rejection
        </ButtonEnhanced>
      </div>
      
      <div className="mt-8 p-4 bg-muted rounded-lg">
        <h2 className="font-semibold mb-2">Expected Behavior:</h2>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>All errors should be sent to /api/analytics/error</li>
          <li>Server should return 200 OK (not 400 Bad Request)</li>
          <li>Error payloads should have proper name and message fields</li>
          <li>No more Zod validation errors in the console</li>
        </ul>
      </div>
    </div>
  );
} 