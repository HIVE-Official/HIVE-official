/**
 * Demo: Firebase Error Handling Usage Examples
 *
 * This file demonstrates how to use the new Firebase error handling system
 * in HIVE applications. Copy these patterns into your components.
 */

import {
  FirebaseErrorHandler,
  useFirebaseErrorHandler,
} from "./firebase-error-handler";
import { logger } from './logger';

// Example 1: Basic error handling in a function
export async function exampleAuthOperation() {
  try {
    // Simulate a Firebase Auth operation
    throw new Error("auth/user-not-found");
  } catch (error) {
    const userFriendlyError = FirebaseErrorHandler.handleError(error);
    return userFriendlyError;
  }
}

// Example 2: Using the hook in a React component
export function ExampleAuthComponent() {
  const { getErrorDisplay } = useFirebaseErrorHandler();

  const handleSignIn = async (email: string) => {
    try {
      // Your Firebase Auth sign-in logic here
      // await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      const errorDisplay = getErrorDisplay(error);

      // Show error to user
      alert(
        `${errorDisplay.message}\nAction: ${errorDisplay.actionButtonText}`
      );

      if (errorDisplay.shouldShowRetry) {
        // Show retry button
      }

      if (errorDisplay.shouldContactSupport) {
        // Show contact support option
      }
    }
  };

  // Return the handler for use in components
  return { handleSignIn };
}

// Example 3: Error handling for Firebase Functions calls
export async function exampleFunctionCall() {
  try {
    // Simulate calling a Firebase Function
    throw new Error("functions/unauthenticated");
  } catch (error) {
    const userFriendlyError = FirebaseErrorHandler.handleFunctionsError(error);

    if (userFriendlyError.action === "sign-in") {
      // Redirect to sign-in page
      window.location.href = "/auth/login";
    } else if (userFriendlyError.isRetryable) {
      // Show retry option
    }

    return userFriendlyError;
  }
}

// Example 4: Using with React Error Boundary
export function getErrorBoundaryExample() {
  return `
    import { FirebaseErrorBoundary } from '@hive/ui';
    
    function MyApp() {
      return (
        <FirebaseErrorBoundary
          onError={(error, errorInfo) => {
            // Log to analytics service
            logger.error('Error boundary caught', { error });
          }}
        >
          <YourAppContent />
        </FirebaseErrorBoundary>
      );
    }
    
    // Custom error fallback
    function MyAppWithCustomError() {
      return (
        <FirebaseErrorBoundary
          fallback={(error, retry) => (
            <div className="custom-error">
              <h2>Oops! {error.message}</h2>
              {error.isRetryable && (
                <button onClick={retry}>Try Again</button>
              )}
            </div>
          )}
        >
          <YourAppContent />
        </FirebaseErrorBoundary>
      );
    }
  `;
}

// Example 5: Common error scenarios and their handling
export const commonErrorScenarios = {
  // Auth errors
  "auth/user-not-found": () => {
    const error = FirebaseErrorHandler.handleAuthError(
      new Error("auth/user-not-found")
    );
     // "No account found with this email address..."
     // "sign-up"
  },

  "auth/too-many-requests": () => {
    const error = FirebaseErrorHandler.handleAuthError(
      new Error("auth/too-many-requests")
    );
     // "Too many failed attempts..."
     // "warning"
  },

  // Functions errors
  "functions/permission-denied": () => {
    const error = FirebaseErrorHandler.handleFunctionsError(
      new Error("functions/permission-denied")
    );
     // "You don't have permission..."
     // "contact-support"
  },

  // Generic errors
  "generic-error": () => {
    const error = FirebaseErrorHandler.handleError(
      new Error("Something went wrong")
    );
     // Uses the original error message
     // "generic-error"
  },
};

export default {
  exampleAuthOperation,
  ExampleAuthComponent,
  exampleFunctionCall,
  getErrorBoundaryExample,
  commonErrorScenarios,
};
