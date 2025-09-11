// Type guard to check if user has required properties
export function isHiveUser(user) {
    return user && typeof user.id === 'string' && typeof user.email === 'string';
}
// Utility to map Firebase user to HiveUser
export function mapFirebaseUserToHiveUser(firebaseUser) {
    return {
        id: firebaseUser.uid || firebaseUser.id,
        uid: firebaseUser.uid || firebaseUser.id, // Keep both for compatibility
        email: firebaseUser.email,
        displayName: firebaseUser.displayName || firebaseUser.name,
        photoURL: firebaseUser.photoURL || firebaseUser.profilePicture,
        token: firebaseUser.token || firebaseUser.accessToken,
        ...firebaseUser // Spread any additional properties
    };
}
//# sourceMappingURL=user.js.map