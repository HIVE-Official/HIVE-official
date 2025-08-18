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

// Example 1: Basic error handling in a function
export async function exampleAuthOperation() {
  try {
    // Simulate a Firebase Auth operation
    throw new Error("auth/user-not-found");
  } catch (error) {
    const userFriendlyError = FirebaseErrorHandler.handleError(error);

    console.log("User sees:", userFriendlyError.message);
    console.log("Action:", userFriendlyError.action);
    console.log("Can retry:", userFriendlyError.isRetryable);

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
      console.log("Sign in successful for:", email);
    } catch (error) {
      const errorDisplay = getErrorDisplay(error);

      // Show error to user
      alert(
        `${errorDisplay.message}\nAction: ${errorDisplay.actionButtonText}`
      );

      if (errorDisplay.shouldShowRetry) {
        // Show retry button
        console.log("Show retry button");
      }

      if (errorDisplay.shouldContactSupport) {
        // Show contact support option
        console.log("Show contact support");
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
      console.log("Retry available");
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
            console.error('Error boundary caught:', error);
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
    console.log("Message:", error.message); // "No account found with this email address..."
    console.log("Action:", error.action); // "sign-up"
  },

  "auth/too-many-requests": () => {
    const error = FirebaseErrorHandler.handleAuthError(
      new Error("auth/too-many-requests")
    );
    console.log("Message:", error.message); // "Too many failed attempts..."
    console.log("Severity:", error.severity); // "warning"
  },

  // Functions errors
  "functions/permission-denied": () => {
    const error = FirebaseErrorHandler.handleFunctionsError(
      new Error("functions/permission-denied")
    );
    console.log("Message:", error.message); // "You don't have permission..."
    console.log("Action:", error.action); // "contact-support"
  },

  // Generic errors
  "generic-error": () => {
    const error = FirebaseErrorHandler.handleError(
      new Error("Something went wrong")
    );
    console.log("Message:", error.message); // Uses the original error message
    console.log("Code:", error.code); // "generic-error"
  },
};

export default {
  exampleAuthOperation,
  ExampleAuthComponent,
  exampleFunctionCall,
  getErrorBoundaryExample,
  commonErrorScenarios,
};
