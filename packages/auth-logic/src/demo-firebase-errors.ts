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
import { logger } from "@hive/core";

// Example 1: Basic error handling in a function
export async function exampleAuthOperation() {
  try {
    // Simulate a Firebase Auth operation
    throw new Error("auth/user-not-found");
  } catch (error) {
    const userFriendlyError = FirebaseErrorHandler.handleError(error);

    logger.debug("User sees error", { message: userFriendlyError.message });
    logger.debug("Error action", { action: userFriendlyError.action });
    logger.debug("Error retry status", { isRetryable: userFriendlyError.isRetryable });

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
      logger.info("Sign in successful", { email });
    } catch (error) {
      const errorDisplay = getErrorDisplay(error);

      // Show error to user
      console.error(
        `${errorDisplay.message}\nAction: ${errorDisplay.actionButtonText}`
      );

      if (errorDisplay.shouldShowRetry) {
        // Show retry button
        logger.debug("Show retry button");
      }

      if (errorDisplay.shouldContactSupport) {
        // Show contact support option
        logger.debug("Show contact support");
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
      logger.debug("Retry available");
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
            logger.error('Error boundary caught:', error);
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
    logger.debug("Error details", { 
      message: error.message,
      action: error.action,
      severity: error.severity,
      code: error.code 
    });
  },

  "auth/too-many-requests": () => {
    const error = FirebaseErrorHandler.handleAuthError(
      new Error("auth/too-many-requests")
    );
    logger.debug("Error details", { 
      message: error.message,
      action: error.action,
      severity: error.severity,
      code: error.code 
    });
  },

  // Functions errors
  "functions/permission-denied": () => {
    const error = FirebaseErrorHandler.handleFunctionsError(
      new Error("functions/permission-denied")
    );
    logger.debug("Error details", { 
      message: error.message,
      action: error.action,
      severity: error.severity,
      code: error.code 
    });
  },

  // Generic errors
  "generic-error": () => {
    const error = FirebaseErrorHandler.handleError(
      new Error("Something went wrong")
    );
    logger.debug("Error details", { 
      message: error.message,
      code: error.code 
    });
  },
};

export const demoAuthErrors = {
  // Simulated Firebase Auth errors for testing
  'auth/user-not-found': {
    code: 'auth/user-not-found',
    message: 'There is no user record corresponding to this identifier. The user may have been deleted.',
  },
  'auth/wrong-password': {
    code: 'auth/wrong-password',
    message: 'The password is invalid or the user does not have a password.',
  },
  'auth/email-already-in-use': {
    code: 'auth/email-already-in-use',
    message: 'The email address is already in use by another account.',
  },
  'auth/weak-password': {
    code: 'auth/weak-password',
    message: 'The password is too weak.',
  },
  'auth/invalid-email': {
    code: 'auth/invalid-email',
    message: 'The email address is badly formatted.',
  },
  'auth/user-disabled': {
    code: 'auth/user-disabled',
    message: 'The user account has been disabled by an administrator.',
  },
  'auth/too-many-requests': {
    code: 'auth/too-many-requests',
    message: 'We have blocked all requests from this device due to unusual activity. Try again later.',
  },
  'auth/operation-not-allowed': {
    code: 'auth/operation-not-allowed',
    message: 'The given sign-in provider is disabled for this Firebase project.',
  },
};

export const triggerDemoError = (errorCode: keyof typeof demoAuthErrors) => {
  const error = demoAuthErrors[errorCode];
  if (error) {
    console.error('🔥 Demo Firebase Error:', error);
    throw new Error(`${error.code}: ${error.message}`);
  } else {
    console.error('🔥 Demo Firebase Error: Unknown error code:', errorCode);
    throw new Error(`Unknown error code: ${errorCode}`);
  }
};

export default {
  exampleAuthOperation,
  ExampleAuthComponent,
  exampleFunctionCall,
  getErrorBoundaryExample,
  commonErrorScenarios,
};
