/**
 * Default action code settings for HIVE magic links
 */
export const getDefaultActionCodeSettings = (schoolId) => ({
    url: `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify?schoolId=${schoolId}`,
    handleCodeInApp: true,
    iOS: {
        bundleId: process.env.NEXT_PUBLIC_IOS_BUNDLE_ID || 'com.hive.app',
    },
    android: {
        packageName: process.env.NEXT_PUBLIC_ANDROID_PACKAGE_NAME || 'com.hive.app',
        installApp: true,
        minimumVersion: '1',
    },
});
/**
 * Validates an email domain against the school's domain
 */
export const validateEmailDomain = (email, schoolDomain) => {
    const emailDomain = email.split('@')[1]?.toLowerCase();
    return emailDomain === schoolDomain.toLowerCase();
};
//# sourceMappingURL=emailLink.js.map