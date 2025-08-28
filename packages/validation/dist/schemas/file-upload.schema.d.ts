import { z } from "zod";
export declare const FileTypeSchema: z.ZodEnum<["image", "video", "audio", "document", "archive", "code", "other"]>;
export declare const FilePurposeSchema: z.ZodEnum<["avatar", "cover_photo", "post_attachment", "tool_asset", "space_banner", "event_image", "ritual_attachment", "profile_media", "general_upload"]>;
export declare const UploadStatusSchema: z.ZodEnum<["pending", "uploading", "processing", "completed", "failed", "cancelled"]>;
export declare const FileMetadataSchema: z.ZodObject<{
    filename: z.ZodString;
    originalName: z.ZodString;
    mimeType: z.ZodString;
    size: z.ZodNumber;
    dimensions: z.ZodOptional<z.ZodObject<{
        width: z.ZodNumber;
        height: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        width: number;
        height: number;
    }, {
        width: number;
        height: number;
    }>>;
    duration: z.ZodOptional<z.ZodNumber>;
    checksum: z.ZodOptional<z.ZodString>;
    verified: z.ZodDefault<z.ZodBoolean>;
    processedVersions: z.ZodDefault<z.ZodArray<z.ZodObject<{
        version: z.ZodString;
        url: z.ZodString;
        size: z.ZodNumber;
        dimensions: z.ZodOptional<z.ZodObject<{
            width: z.ZodNumber;
            height: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            width: number;
            height: number;
        }, {
            width: number;
            height: number;
        }>>;
    }, "strip", z.ZodTypeAny, {
        url: string;
        size: number;
        version: string;
        dimensions?: {
            width: number;
            height: number;
        } | undefined;
    }, {
        url: string;
        size: number;
        version: string;
        dimensions?: {
            width: number;
            height: number;
        } | undefined;
    }>, "many">>;
    safetyCheck: z.ZodOptional<z.ZodObject<{
        status: z.ZodEnum<["pending", "safe", "flagged", "rejected"]>;
        confidence: z.ZodOptional<z.ZodNumber>;
        flags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        reviewedAt: z.ZodOptional<z.ZodDate>;
        reviewedBy: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        status: "safe" | "flagged" | "pending" | "rejected";
        flags: string[];
        confidence?: number | undefined;
        reviewedAt?: Date | undefined;
        reviewedBy?: string | undefined;
    }, {
        status: "safe" | "flagged" | "pending" | "rejected";
        confidence?: number | undefined;
        flags?: string[] | undefined;
        reviewedAt?: Date | undefined;
        reviewedBy?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    verified: boolean;
    filename: string;
    originalName: string;
    mimeType: string;
    size: number;
    processedVersions: {
        url: string;
        size: number;
        version: string;
        dimensions?: {
            width: number;
            height: number;
        } | undefined;
    }[];
    duration?: number | undefined;
    dimensions?: {
        width: number;
        height: number;
    } | undefined;
    checksum?: string | undefined;
    safetyCheck?: {
        status: "safe" | "flagged" | "pending" | "rejected";
        flags: string[];
        confidence?: number | undefined;
        reviewedAt?: Date | undefined;
        reviewedBy?: string | undefined;
    } | undefined;
}, {
    filename: string;
    originalName: string;
    mimeType: string;
    size: number;
    duration?: number | undefined;
    verified?: boolean | undefined;
    dimensions?: {
        width: number;
        height: number;
    } | undefined;
    checksum?: string | undefined;
    processedVersions?: {
        url: string;
        size: number;
        version: string;
        dimensions?: {
            width: number;
            height: number;
        } | undefined;
    }[] | undefined;
    safetyCheck?: {
        status: "safe" | "flagged" | "pending" | "rejected";
        confidence?: number | undefined;
        flags?: string[] | undefined;
        reviewedAt?: Date | undefined;
        reviewedBy?: string | undefined;
    } | undefined;
}>;
export declare const FileUploadSchema: z.ZodObject<{
    id: z.ZodString;
    uploadId: z.ZodString;
    status: z.ZodEnum<["pending", "uploading", "processing", "completed", "failed", "cancelled"]>;
    metadata: z.ZodObject<{
        filename: z.ZodString;
        originalName: z.ZodString;
        mimeType: z.ZodString;
        size: z.ZodNumber;
        dimensions: z.ZodOptional<z.ZodObject<{
            width: z.ZodNumber;
            height: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            width: number;
            height: number;
        }, {
            width: number;
            height: number;
        }>>;
        duration: z.ZodOptional<z.ZodNumber>;
        checksum: z.ZodOptional<z.ZodString>;
        verified: z.ZodDefault<z.ZodBoolean>;
        processedVersions: z.ZodDefault<z.ZodArray<z.ZodObject<{
            version: z.ZodString;
            url: z.ZodString;
            size: z.ZodNumber;
            dimensions: z.ZodOptional<z.ZodObject<{
                width: z.ZodNumber;
                height: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                width: number;
                height: number;
            }, {
                width: number;
                height: number;
            }>>;
        }, "strip", z.ZodTypeAny, {
            url: string;
            size: number;
            version: string;
            dimensions?: {
                width: number;
                height: number;
            } | undefined;
        }, {
            url: string;
            size: number;
            version: string;
            dimensions?: {
                width: number;
                height: number;
            } | undefined;
        }>, "many">>;
        safetyCheck: z.ZodOptional<z.ZodObject<{
            status: z.ZodEnum<["pending", "safe", "flagged", "rejected"]>;
            confidence: z.ZodOptional<z.ZodNumber>;
            flags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            reviewedAt: z.ZodOptional<z.ZodDate>;
            reviewedBy: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            status: "safe" | "flagged" | "pending" | "rejected";
            flags: string[];
            confidence?: number | undefined;
            reviewedAt?: Date | undefined;
            reviewedBy?: string | undefined;
        }, {
            status: "safe" | "flagged" | "pending" | "rejected";
            confidence?: number | undefined;
            flags?: string[] | undefined;
            reviewedAt?: Date | undefined;
            reviewedBy?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        verified: boolean;
        filename: string;
        originalName: string;
        mimeType: string;
        size: number;
        processedVersions: {
            url: string;
            size: number;
            version: string;
            dimensions?: {
                width: number;
                height: number;
            } | undefined;
        }[];
        duration?: number | undefined;
        dimensions?: {
            width: number;
            height: number;
        } | undefined;
        checksum?: string | undefined;
        safetyCheck?: {
            status: "safe" | "flagged" | "pending" | "rejected";
            flags: string[];
            confidence?: number | undefined;
            reviewedAt?: Date | undefined;
            reviewedBy?: string | undefined;
        } | undefined;
    }, {
        filename: string;
        originalName: string;
        mimeType: string;
        size: number;
        duration?: number | undefined;
        verified?: boolean | undefined;
        dimensions?: {
            width: number;
            height: number;
        } | undefined;
        checksum?: string | undefined;
        processedVersions?: {
            url: string;
            size: number;
            version: string;
            dimensions?: {
                width: number;
                height: number;
            } | undefined;
        }[] | undefined;
        safetyCheck?: {
            status: "safe" | "flagged" | "pending" | "rejected";
            confidence?: number | undefined;
            flags?: string[] | undefined;
            reviewedAt?: Date | undefined;
            reviewedBy?: string | undefined;
        } | undefined;
    }>;
    type: z.ZodEnum<["image", "video", "audio", "document", "archive", "code", "other"]>;
    purpose: z.ZodEnum<["avatar", "cover_photo", "post_attachment", "tool_asset", "space_banner", "event_image", "ritual_attachment", "profile_media", "general_upload"]>;
    url: z.ZodOptional<z.ZodString>;
    storageLocation: z.ZodOptional<z.ZodString>;
    cdnUrl: z.ZodOptional<z.ZodString>;
    uploadedBy: z.ZodString;
    visibility: z.ZodEnum<["public", "authenticated", "private"]>;
    accessToken: z.ZodOptional<z.ZodString>;
    downloads: z.ZodDefault<z.ZodNumber>;
    lastAccessed: z.ZodOptional<z.ZodDate>;
    expiresAt: z.ZodOptional<z.ZodDate>;
    deletedAt: z.ZodOptional<z.ZodDate>;
    error: z.ZodOptional<z.ZodObject<{
        code: z.ZodString;
        message: z.ZodString;
        details: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    }, "strip", z.ZodTypeAny, {
        code: string;
        message: string;
        details?: Record<string, any> | undefined;
    }, {
        code: string;
        message: string;
        details?: Record<string, any> | undefined;
    }>>;
    processingStarted: z.ZodOptional<z.ZodDate>;
    processingCompleted: z.ZodOptional<z.ZodDate>;
    tags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    description: z.ZodOptional<z.ZodString>;
    associatedWith: z.ZodOptional<z.ZodObject<{
        type: z.ZodEnum<["post", "space", "user", "tool", "event", "ritual"]>;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        type: "user" | "space" | "post" | "tool" | "event" | "ritual";
    }, {
        id: string;
        type: "user" | "space" | "post" | "tool" | "event" | "ritual";
    }>>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: "code" | "other" | "image" | "video" | "audio" | "document" | "archive";
    status: "completed" | "failed" | "pending" | "uploading" | "processing" | "cancelled";
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
    metadata: {
        verified: boolean;
        filename: string;
        originalName: string;
        mimeType: string;
        size: number;
        processedVersions: {
            url: string;
            size: number;
            version: string;
            dimensions?: {
                width: number;
                height: number;
            } | undefined;
        }[];
        duration?: number | undefined;
        dimensions?: {
            width: number;
            height: number;
        } | undefined;
        checksum?: string | undefined;
        safetyCheck?: {
            status: "safe" | "flagged" | "pending" | "rejected";
            flags: string[];
            confidence?: number | undefined;
            reviewedAt?: Date | undefined;
            reviewedBy?: string | undefined;
        } | undefined;
    };
    visibility: "public" | "private" | "authenticated";
    uploadId: string;
    purpose: "avatar" | "cover_photo" | "post_attachment" | "tool_asset" | "space_banner" | "event_image" | "ritual_attachment" | "profile_media" | "general_upload";
    uploadedBy: string;
    downloads: number;
    expiresAt?: Date | undefined;
    url?: string | undefined;
    description?: string | undefined;
    storageLocation?: string | undefined;
    cdnUrl?: string | undefined;
    accessToken?: string | undefined;
    lastAccessed?: Date | undefined;
    deletedAt?: Date | undefined;
    error?: {
        code: string;
        message: string;
        details?: Record<string, any> | undefined;
    } | undefined;
    processingStarted?: Date | undefined;
    processingCompleted?: Date | undefined;
    associatedWith?: {
        id: string;
        type: "user" | "space" | "post" | "tool" | "event" | "ritual";
    } | undefined;
}, {
    id: string;
    type: "code" | "other" | "image" | "video" | "audio" | "document" | "archive";
    status: "completed" | "failed" | "pending" | "uploading" | "processing" | "cancelled";
    createdAt: Date;
    updatedAt: Date;
    metadata: {
        filename: string;
        originalName: string;
        mimeType: string;
        size: number;
        duration?: number | undefined;
        verified?: boolean | undefined;
        dimensions?: {
            width: number;
            height: number;
        } | undefined;
        checksum?: string | undefined;
        processedVersions?: {
            url: string;
            size: number;
            version: string;
            dimensions?: {
                width: number;
                height: number;
            } | undefined;
        }[] | undefined;
        safetyCheck?: {
            status: "safe" | "flagged" | "pending" | "rejected";
            confidence?: number | undefined;
            flags?: string[] | undefined;
            reviewedAt?: Date | undefined;
            reviewedBy?: string | undefined;
        } | undefined;
    };
    visibility: "public" | "private" | "authenticated";
    uploadId: string;
    purpose: "avatar" | "cover_photo" | "post_attachment" | "tool_asset" | "space_banner" | "event_image" | "ritual_attachment" | "profile_media" | "general_upload";
    uploadedBy: string;
    expiresAt?: Date | undefined;
    tags?: string[] | undefined;
    url?: string | undefined;
    description?: string | undefined;
    storageLocation?: string | undefined;
    cdnUrl?: string | undefined;
    accessToken?: string | undefined;
    downloads?: number | undefined;
    lastAccessed?: Date | undefined;
    deletedAt?: Date | undefined;
    error?: {
        code: string;
        message: string;
        details?: Record<string, any> | undefined;
    } | undefined;
    processingStarted?: Date | undefined;
    processingCompleted?: Date | undefined;
    associatedWith?: {
        id: string;
        type: "user" | "space" | "post" | "tool" | "event" | "ritual";
    } | undefined;
}>;
export declare const UploadConfigSchema: z.ZodObject<{
    maxFileSize: z.ZodDefault<z.ZodNumber>;
    allowedTypes: z.ZodArray<z.ZodString, "many">;
    allowedExtensions: z.ZodArray<z.ZodString, "many">;
    maxImageDimensions: z.ZodOptional<z.ZodObject<{
        width: z.ZodDefault<z.ZodNumber>;
        height: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        width: number;
        height: number;
    }, {
        width?: number | undefined;
        height?: number | undefined;
    }>>;
    autoResize: z.ZodDefault<z.ZodBoolean>;
    generateThumbnails: z.ZodDefault<z.ZodBoolean>;
    compressImages: z.ZodDefault<z.ZodBoolean>;
    requireSafetyCheck: z.ZodDefault<z.ZodBoolean>;
    virusScan: z.ZodDefault<z.ZodBoolean>;
    storageClass: z.ZodDefault<z.ZodEnum<["standard", "cold", "archive"]>>;
    enableCDN: z.ZodDefault<z.ZodBoolean>;
    defaultVisibility: z.ZodDefault<z.ZodEnum<["public", "authenticated", "private"]>>;
    signedUrlExpiry: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    maxFileSize: number;
    allowedTypes: string[];
    allowedExtensions: string[];
    autoResize: boolean;
    generateThumbnails: boolean;
    compressImages: boolean;
    requireSafetyCheck: boolean;
    virusScan: boolean;
    storageClass: "archive" | "standard" | "cold";
    enableCDN: boolean;
    defaultVisibility: "public" | "private" | "authenticated";
    signedUrlExpiry: number;
    maxImageDimensions?: {
        width: number;
        height: number;
    } | undefined;
}, {
    allowedTypes: string[];
    allowedExtensions: string[];
    maxFileSize?: number | undefined;
    maxImageDimensions?: {
        width?: number | undefined;
        height?: number | undefined;
    } | undefined;
    autoResize?: boolean | undefined;
    generateThumbnails?: boolean | undefined;
    compressImages?: boolean | undefined;
    requireSafetyCheck?: boolean | undefined;
    virusScan?: boolean | undefined;
    storageClass?: "archive" | "standard" | "cold" | undefined;
    enableCDN?: boolean | undefined;
    defaultVisibility?: "public" | "private" | "authenticated" | undefined;
    signedUrlExpiry?: number | undefined;
}>;
export declare const UploadSessionSchema: z.ZodObject<{
    id: z.ZodString;
    userId: z.ZodString;
    purpose: z.ZodEnum<["avatar", "cover_photo", "post_attachment", "tool_asset", "space_banner", "event_image", "ritual_attachment", "profile_media", "general_upload"]>;
    config: z.ZodObject<{
        maxFileSize: z.ZodDefault<z.ZodNumber>;
        allowedTypes: z.ZodArray<z.ZodString, "many">;
        allowedExtensions: z.ZodArray<z.ZodString, "many">;
        maxImageDimensions: z.ZodOptional<z.ZodObject<{
            width: z.ZodDefault<z.ZodNumber>;
            height: z.ZodDefault<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            width: number;
            height: number;
        }, {
            width?: number | undefined;
            height?: number | undefined;
        }>>;
        autoResize: z.ZodDefault<z.ZodBoolean>;
        generateThumbnails: z.ZodDefault<z.ZodBoolean>;
        compressImages: z.ZodDefault<z.ZodBoolean>;
        requireSafetyCheck: z.ZodDefault<z.ZodBoolean>;
        virusScan: z.ZodDefault<z.ZodBoolean>;
        storageClass: z.ZodDefault<z.ZodEnum<["standard", "cold", "archive"]>>;
        enableCDN: z.ZodDefault<z.ZodBoolean>;
        defaultVisibility: z.ZodDefault<z.ZodEnum<["public", "authenticated", "private"]>>;
        signedUrlExpiry: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        maxFileSize: number;
        allowedTypes: string[];
        allowedExtensions: string[];
        autoResize: boolean;
        generateThumbnails: boolean;
        compressImages: boolean;
        requireSafetyCheck: boolean;
        virusScan: boolean;
        storageClass: "archive" | "standard" | "cold";
        enableCDN: boolean;
        defaultVisibility: "public" | "private" | "authenticated";
        signedUrlExpiry: number;
        maxImageDimensions?: {
            width: number;
            height: number;
        } | undefined;
    }, {
        allowedTypes: string[];
        allowedExtensions: string[];
        maxFileSize?: number | undefined;
        maxImageDimensions?: {
            width?: number | undefined;
            height?: number | undefined;
        } | undefined;
        autoResize?: boolean | undefined;
        generateThumbnails?: boolean | undefined;
        compressImages?: boolean | undefined;
        requireSafetyCheck?: boolean | undefined;
        virusScan?: boolean | undefined;
        storageClass?: "archive" | "standard" | "cold" | undefined;
        enableCDN?: boolean | undefined;
        defaultVisibility?: "public" | "private" | "authenticated" | undefined;
        signedUrlExpiry?: number | undefined;
    }>;
    totalFiles: z.ZodDefault<z.ZodNumber>;
    completedFiles: z.ZodDefault<z.ZodNumber>;
    failedFiles: z.ZodDefault<z.ZodNumber>;
    uploadedBytes: z.ZodDefault<z.ZodNumber>;
    totalBytes: z.ZodDefault<z.ZodNumber>;
    status: z.ZodEnum<["active", "completed", "failed", "cancelled"]>;
    files: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    errors: z.ZodDefault<z.ZodArray<z.ZodObject<{
        fileId: z.ZodOptional<z.ZodString>;
        error: z.ZodString;
        timestamp: z.ZodDate;
    }, "strip", z.ZodTypeAny, {
        timestamp: Date;
        error: string;
        fileId?: string | undefined;
    }, {
        timestamp: Date;
        error: string;
        fileId?: string | undefined;
    }>, "many">>;
    userAgent: z.ZodOptional<z.ZodString>;
    ipAddress: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodDate;
    completedAt: z.ZodOptional<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    id: string;
    status: "completed" | "active" | "failed" | "cancelled";
    userId: string;
    createdAt: Date;
    config: {
        maxFileSize: number;
        allowedTypes: string[];
        allowedExtensions: string[];
        autoResize: boolean;
        generateThumbnails: boolean;
        compressImages: boolean;
        requireSafetyCheck: boolean;
        virusScan: boolean;
        storageClass: "archive" | "standard" | "cold";
        enableCDN: boolean;
        defaultVisibility: "public" | "private" | "authenticated";
        signedUrlExpiry: number;
        maxImageDimensions?: {
            width: number;
            height: number;
        } | undefined;
    };
    purpose: "avatar" | "cover_photo" | "post_attachment" | "tool_asset" | "space_banner" | "event_image" | "ritual_attachment" | "profile_media" | "general_upload";
    totalFiles: number;
    completedFiles: number;
    failedFiles: number;
    uploadedBytes: number;
    totalBytes: number;
    files: string[];
    errors: {
        timestamp: Date;
        error: string;
        fileId?: string | undefined;
    }[];
    userAgent?: string | undefined;
    ipAddress?: string | undefined;
    completedAt?: Date | undefined;
}, {
    id: string;
    status: "completed" | "active" | "failed" | "cancelled";
    userId: string;
    createdAt: Date;
    config: {
        allowedTypes: string[];
        allowedExtensions: string[];
        maxFileSize?: number | undefined;
        maxImageDimensions?: {
            width?: number | undefined;
            height?: number | undefined;
        } | undefined;
        autoResize?: boolean | undefined;
        generateThumbnails?: boolean | undefined;
        compressImages?: boolean | undefined;
        requireSafetyCheck?: boolean | undefined;
        virusScan?: boolean | undefined;
        storageClass?: "archive" | "standard" | "cold" | undefined;
        enableCDN?: boolean | undefined;
        defaultVisibility?: "public" | "private" | "authenticated" | undefined;
        signedUrlExpiry?: number | undefined;
    };
    purpose: "avatar" | "cover_photo" | "post_attachment" | "tool_asset" | "space_banner" | "event_image" | "ritual_attachment" | "profile_media" | "general_upload";
    userAgent?: string | undefined;
    totalFiles?: number | undefined;
    completedFiles?: number | undefined;
    failedFiles?: number | undefined;
    uploadedBytes?: number | undefined;
    totalBytes?: number | undefined;
    files?: string[] | undefined;
    errors?: {
        timestamp: Date;
        error: string;
        fileId?: string | undefined;
    }[] | undefined;
    ipAddress?: string | undefined;
    completedAt?: Date | undefined;
}>;
export declare const FileAccessLogSchema: z.ZodObject<{
    fileId: z.ZodString;
    accessedBy: z.ZodOptional<z.ZodString>;
    accessType: z.ZodEnum<["view", "download", "thumbnail", "metadata"]>;
    referrer: z.ZodOptional<z.ZodString>;
    userAgent: z.ZodOptional<z.ZodString>;
    ipAddress: z.ZodOptional<z.ZodString>;
    responseCode: z.ZodNumber;
    bytesTransferred: z.ZodDefault<z.ZodNumber>;
    createdAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    createdAt: Date;
    fileId: string;
    accessType: "metadata" | "view" | "download" | "thumbnail";
    responseCode: number;
    bytesTransferred: number;
    userAgent?: string | undefined;
    referrer?: string | undefined;
    ipAddress?: string | undefined;
    accessedBy?: string | undefined;
}, {
    createdAt: Date;
    fileId: string;
    accessType: "metadata" | "view" | "download" | "thumbnail";
    responseCode: number;
    userAgent?: string | undefined;
    referrer?: string | undefined;
    ipAddress?: string | undefined;
    accessedBy?: string | undefined;
    bytesTransferred?: number | undefined;
}>;
export declare const FileQuotaSchema: z.ZodObject<{
    userId: z.ZodString;
    maxStorage: z.ZodNumber;
    maxFiles: z.ZodNumber;
    maxDailyUploads: z.ZodNumber;
    usedStorage: z.ZodDefault<z.ZodNumber>;
    usedFiles: z.ZodDefault<z.ZodNumber>;
    dailyUploads: z.ZodDefault<z.ZodNumber>;
    dailyResetAt: z.ZodDate;
    lastUpload: z.ZodOptional<z.ZodDate>;
    quotaExceeded: z.ZodDefault<z.ZodBoolean>;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    userId: string;
    updatedAt: Date;
    maxStorage: number;
    maxFiles: number;
    maxDailyUploads: number;
    usedStorage: number;
    usedFiles: number;
    dailyUploads: number;
    dailyResetAt: Date;
    quotaExceeded: boolean;
    lastUpload?: Date | undefined;
}, {
    userId: string;
    updatedAt: Date;
    maxStorage: number;
    maxFiles: number;
    maxDailyUploads: number;
    dailyResetAt: Date;
    usedStorage?: number | undefined;
    usedFiles?: number | undefined;
    dailyUploads?: number | undefined;
    lastUpload?: Date | undefined;
    quotaExceeded?: boolean | undefined;
}>;
export type FileUpload = z.infer<typeof FileUploadSchema>;
export type FileMetadata = z.infer<typeof FileMetadataSchema>;
export type UploadConfig = z.infer<typeof UploadConfigSchema>;
export type UploadSession = z.infer<typeof UploadSessionSchema>;
export type FileAccessLog = z.infer<typeof FileAccessLogSchema>;
export type FileQuota = z.infer<typeof FileQuotaSchema>;
export type FileType = z.infer<typeof FileTypeSchema>;
export type FilePurpose = z.infer<typeof FilePurposeSchema>;
export type UploadStatus = z.infer<typeof UploadStatusSchema>;
//# sourceMappingURL=file-upload.schema.d.ts.map