import { z } from "zod";
export declare const AdminUsersStatisticsSchema: z.ZodObject<{
    total: z.ZodNumber;
    active: z.ZodNumber;
    inactive: z.ZodNumber;
    byMajor: z.ZodRecord<z.ZodString, z.ZodNumber>;
    byYear: z.ZodRecord<z.ZodString, z.ZodNumber>;
    growth: z.ZodObject<{
        lastWeek: z.ZodNumber;
        lastMonth: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        lastWeek?: number;
        lastMonth?: number;
    }, {
        lastWeek?: number;
        lastMonth?: number;
    }>;
}, "strip", z.ZodTypeAny, {
    active?: number;
    inactive?: number;
    total?: number;
    byMajor?: Record<string, number>;
    byYear?: Record<string, number>;
    growth?: {
        lastWeek?: number;
        lastMonth?: number;
    };
}, {
    active?: number;
    inactive?: number;
    total?: number;
    byMajor?: Record<string, number>;
    byYear?: Record<string, number>;
    growth?: {
        lastWeek?: number;
        lastMonth?: number;
    };
}>;
export declare const AdminSpacesByTypeSchema: z.ZodRecord<z.ZodString, z.ZodObject<{
    total: z.ZodNumber;
    active: z.ZodNumber;
    dormant: z.ZodNumber;
    members: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    active?: number;
    total?: number;
    members?: number;
    dormant?: number;
}, {
    active?: number;
    total?: number;
    members?: number;
    dormant?: number;
}>>;
export declare const AdminSpacesStatisticsSchema: z.ZodObject<{
    total: z.ZodNumber;
    active: z.ZodNumber;
    dormant: z.ZodNumber;
    byType: z.ZodRecord<z.ZodString, z.ZodObject<{
        total: z.ZodNumber;
        active: z.ZodNumber;
        dormant: z.ZodNumber;
        members: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        active?: number;
        total?: number;
        members?: number;
        dormant?: number;
    }, {
        active?: number;
        total?: number;
        members?: number;
        dormant?: number;
    }>>;
    hasBuilders: z.ZodNumber;
    totalMembers: z.ZodNumber;
    averageMembers: z.ZodNumber;
    activationRate: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    active?: number;
    total?: number;
    dormant?: number;
    byType?: Record<string, {
        active?: number;
        total?: number;
        members?: number;
        dormant?: number;
    }>;
    hasBuilders?: number;
    totalMembers?: number;
    averageMembers?: number;
    activationRate?: number;
}, {
    active?: number;
    total?: number;
    dormant?: number;
    byType?: Record<string, {
        active?: number;
        total?: number;
        members?: number;
        dormant?: number;
    }>;
    hasBuilders?: number;
    totalMembers?: number;
    averageMembers?: number;
    activationRate?: number;
}>;
export declare const AdminBuilderRequestsStatisticsSchema: z.ZodObject<{
    total: z.ZodNumber;
    pending: z.ZodNumber;
    approved: z.ZodNumber;
    rejected: z.ZodNumber;
    urgent: z.ZodNumber;
    approvalRate: z.ZodNumber;
    averageResponseTime: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    urgent?: number;
    total?: number;
    pending?: number;
    approved?: number;
    rejected?: number;
    approvalRate?: number;
    averageResponseTime?: number;
}, {
    urgent?: number;
    total?: number;
    pending?: number;
    approved?: number;
    rejected?: number;
    approvalRate?: number;
    averageResponseTime?: number;
}>;
export declare const AdminSystemStatisticsSchema: z.ZodObject<{
    status: z.ZodString;
    uptime: z.ZodNumber;
    memory: z.ZodNullable<z.ZodObject<{
        heapUsed: z.ZodNumber;
        heapTotal: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        heapUsed?: number;
        heapTotal?: number;
    }, {
        heapUsed?: number;
        heapTotal?: number;
    }>>;
    collections: z.ZodObject<{
        users: z.ZodNumber;
        spaces: z.ZodNumber;
        builderRequests: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        spaces?: number;
        users?: number;
        builderRequests?: number;
    }, {
        spaces?: number;
        users?: number;
        builderRequests?: number;
    }>;
    lastUpdated: z.ZodString;
}, "strip", z.ZodTypeAny, {
    status?: string;
    uptime?: number;
    memory?: {
        heapUsed?: number;
        heapTotal?: number;
    };
    collections?: {
        spaces?: number;
        users?: number;
        builderRequests?: number;
    };
    lastUpdated?: string;
}, {
    status?: string;
    uptime?: number;
    memory?: {
        heapUsed?: number;
        heapTotal?: number;
    };
    collections?: {
        spaces?: number;
        users?: number;
        builderRequests?: number;
    };
    lastUpdated?: string;
}>;
export declare const AdminDashboardStatisticsSchema: z.ZodObject<{
    users: z.ZodObject<{
        total: z.ZodNumber;
        active: z.ZodNumber;
        inactive: z.ZodNumber;
        byMajor: z.ZodRecord<z.ZodString, z.ZodNumber>;
        byYear: z.ZodRecord<z.ZodString, z.ZodNumber>;
        growth: z.ZodObject<{
            lastWeek: z.ZodNumber;
            lastMonth: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            lastWeek?: number;
            lastMonth?: number;
        }, {
            lastWeek?: number;
            lastMonth?: number;
        }>;
    }, "strip", z.ZodTypeAny, {
        active?: number;
        inactive?: number;
        total?: number;
        byMajor?: Record<string, number>;
        byYear?: Record<string, number>;
        growth?: {
            lastWeek?: number;
            lastMonth?: number;
        };
    }, {
        active?: number;
        inactive?: number;
        total?: number;
        byMajor?: Record<string, number>;
        byYear?: Record<string, number>;
        growth?: {
            lastWeek?: number;
            lastMonth?: number;
        };
    }>;
    spaces: z.ZodObject<{
        total: z.ZodNumber;
        active: z.ZodNumber;
        dormant: z.ZodNumber;
        byType: z.ZodRecord<z.ZodString, z.ZodObject<{
            total: z.ZodNumber;
            active: z.ZodNumber;
            dormant: z.ZodNumber;
            members: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            active?: number;
            total?: number;
            members?: number;
            dormant?: number;
        }, {
            active?: number;
            total?: number;
            members?: number;
            dormant?: number;
        }>>;
        hasBuilders: z.ZodNumber;
        totalMembers: z.ZodNumber;
        averageMembers: z.ZodNumber;
        activationRate: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        active?: number;
        total?: number;
        dormant?: number;
        byType?: Record<string, {
            active?: number;
            total?: number;
            members?: number;
            dormant?: number;
        }>;
        hasBuilders?: number;
        totalMembers?: number;
        averageMembers?: number;
        activationRate?: number;
    }, {
        active?: number;
        total?: number;
        dormant?: number;
        byType?: Record<string, {
            active?: number;
            total?: number;
            members?: number;
            dormant?: number;
        }>;
        hasBuilders?: number;
        totalMembers?: number;
        averageMembers?: number;
        activationRate?: number;
    }>;
    builderRequests: z.ZodObject<{
        total: z.ZodNumber;
        pending: z.ZodNumber;
        approved: z.ZodNumber;
        rejected: z.ZodNumber;
        urgent: z.ZodNumber;
        approvalRate: z.ZodNumber;
        averageResponseTime: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        urgent?: number;
        total?: number;
        pending?: number;
        approved?: number;
        rejected?: number;
        approvalRate?: number;
        averageResponseTime?: number;
    }, {
        urgent?: number;
        total?: number;
        pending?: number;
        approved?: number;
        rejected?: number;
        approvalRate?: number;
        averageResponseTime?: number;
    }>;
    system: z.ZodObject<{
        status: z.ZodString;
        uptime: z.ZodNumber;
        memory: z.ZodNullable<z.ZodObject<{
            heapUsed: z.ZodNumber;
            heapTotal: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            heapUsed?: number;
            heapTotal?: number;
        }, {
            heapUsed?: number;
            heapTotal?: number;
        }>>;
        collections: z.ZodObject<{
            users: z.ZodNumber;
            spaces: z.ZodNumber;
            builderRequests: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            spaces?: number;
            users?: number;
            builderRequests?: number;
        }, {
            spaces?: number;
            users?: number;
            builderRequests?: number;
        }>;
        lastUpdated: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        status?: string;
        uptime?: number;
        memory?: {
            heapUsed?: number;
            heapTotal?: number;
        };
        collections?: {
            spaces?: number;
            users?: number;
            builderRequests?: number;
        };
        lastUpdated?: string;
    }, {
        status?: string;
        uptime?: number;
        memory?: {
            heapUsed?: number;
            heapTotal?: number;
        };
        collections?: {
            spaces?: number;
            users?: number;
            builderRequests?: number;
        };
        lastUpdated?: string;
    }>;
}, "strip", z.ZodTypeAny, {
    spaces?: {
        active?: number;
        total?: number;
        dormant?: number;
        byType?: Record<string, {
            active?: number;
            total?: number;
            members?: number;
            dormant?: number;
        }>;
        hasBuilders?: number;
        totalMembers?: number;
        averageMembers?: number;
        activationRate?: number;
    };
    system?: {
        status?: string;
        uptime?: number;
        memory?: {
            heapUsed?: number;
            heapTotal?: number;
        };
        collections?: {
            spaces?: number;
            users?: number;
            builderRequests?: number;
        };
        lastUpdated?: string;
    };
    users?: {
        active?: number;
        inactive?: number;
        total?: number;
        byMajor?: Record<string, number>;
        byYear?: Record<string, number>;
        growth?: {
            lastWeek?: number;
            lastMonth?: number;
        };
    };
    builderRequests?: {
        urgent?: number;
        total?: number;
        pending?: number;
        approved?: number;
        rejected?: number;
        approvalRate?: number;
        averageResponseTime?: number;
    };
}, {
    spaces?: {
        active?: number;
        total?: number;
        dormant?: number;
        byType?: Record<string, {
            active?: number;
            total?: number;
            members?: number;
            dormant?: number;
        }>;
        hasBuilders?: number;
        totalMembers?: number;
        averageMembers?: number;
        activationRate?: number;
    };
    system?: {
        status?: string;
        uptime?: number;
        memory?: {
            heapUsed?: number;
            heapTotal?: number;
        };
        collections?: {
            spaces?: number;
            users?: number;
            builderRequests?: number;
        };
        lastUpdated?: string;
    };
    users?: {
        active?: number;
        inactive?: number;
        total?: number;
        byMajor?: Record<string, number>;
        byYear?: Record<string, number>;
        growth?: {
            lastWeek?: number;
            lastMonth?: number;
        };
    };
    builderRequests?: {
        urgent?: number;
        total?: number;
        pending?: number;
        approved?: number;
        rejected?: number;
        approvalRate?: number;
        averageResponseTime?: number;
    };
}>;
export declare const AdminDashboardResponseSchema: z.ZodObject<{
    success: z.ZodLiteral<true>;
    timestamp: z.ZodString;
    adminUser: z.ZodString;
    platform: z.ZodObject<{
        name: z.ZodString;
        version: z.ZodString;
        environment: z.ZodString;
        university: z.ZodString;
        campusId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name?: string;
        version?: string;
        environment?: string;
        campusId?: string;
        university?: string;
    }, {
        name?: string;
        version?: string;
        environment?: string;
        campusId?: string;
        university?: string;
    }>;
    statistics: z.ZodObject<{
        users: z.ZodObject<{
            total: z.ZodNumber;
            active: z.ZodNumber;
            inactive: z.ZodNumber;
            byMajor: z.ZodRecord<z.ZodString, z.ZodNumber>;
            byYear: z.ZodRecord<z.ZodString, z.ZodNumber>;
            growth: z.ZodObject<{
                lastWeek: z.ZodNumber;
                lastMonth: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                lastWeek?: number;
                lastMonth?: number;
            }, {
                lastWeek?: number;
                lastMonth?: number;
            }>;
        }, "strip", z.ZodTypeAny, {
            active?: number;
            inactive?: number;
            total?: number;
            byMajor?: Record<string, number>;
            byYear?: Record<string, number>;
            growth?: {
                lastWeek?: number;
                lastMonth?: number;
            };
        }, {
            active?: number;
            inactive?: number;
            total?: number;
            byMajor?: Record<string, number>;
            byYear?: Record<string, number>;
            growth?: {
                lastWeek?: number;
                lastMonth?: number;
            };
        }>;
        spaces: z.ZodObject<{
            total: z.ZodNumber;
            active: z.ZodNumber;
            dormant: z.ZodNumber;
            byType: z.ZodRecord<z.ZodString, z.ZodObject<{
                total: z.ZodNumber;
                active: z.ZodNumber;
                dormant: z.ZodNumber;
                members: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                active?: number;
                total?: number;
                members?: number;
                dormant?: number;
            }, {
                active?: number;
                total?: number;
                members?: number;
                dormant?: number;
            }>>;
            hasBuilders: z.ZodNumber;
            totalMembers: z.ZodNumber;
            averageMembers: z.ZodNumber;
            activationRate: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            active?: number;
            total?: number;
            dormant?: number;
            byType?: Record<string, {
                active?: number;
                total?: number;
                members?: number;
                dormant?: number;
            }>;
            hasBuilders?: number;
            totalMembers?: number;
            averageMembers?: number;
            activationRate?: number;
        }, {
            active?: number;
            total?: number;
            dormant?: number;
            byType?: Record<string, {
                active?: number;
                total?: number;
                members?: number;
                dormant?: number;
            }>;
            hasBuilders?: number;
            totalMembers?: number;
            averageMembers?: number;
            activationRate?: number;
        }>;
        builderRequests: z.ZodObject<{
            total: z.ZodNumber;
            pending: z.ZodNumber;
            approved: z.ZodNumber;
            rejected: z.ZodNumber;
            urgent: z.ZodNumber;
            approvalRate: z.ZodNumber;
            averageResponseTime: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            urgent?: number;
            total?: number;
            pending?: number;
            approved?: number;
            rejected?: number;
            approvalRate?: number;
            averageResponseTime?: number;
        }, {
            urgent?: number;
            total?: number;
            pending?: number;
            approved?: number;
            rejected?: number;
            approvalRate?: number;
            averageResponseTime?: number;
        }>;
        system: z.ZodObject<{
            status: z.ZodString;
            uptime: z.ZodNumber;
            memory: z.ZodNullable<z.ZodObject<{
                heapUsed: z.ZodNumber;
                heapTotal: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                heapUsed?: number;
                heapTotal?: number;
            }, {
                heapUsed?: number;
                heapTotal?: number;
            }>>;
            collections: z.ZodObject<{
                users: z.ZodNumber;
                spaces: z.ZodNumber;
                builderRequests: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                spaces?: number;
                users?: number;
                builderRequests?: number;
            }, {
                spaces?: number;
                users?: number;
                builderRequests?: number;
            }>;
            lastUpdated: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            status?: string;
            uptime?: number;
            memory?: {
                heapUsed?: number;
                heapTotal?: number;
            };
            collections?: {
                spaces?: number;
                users?: number;
                builderRequests?: number;
            };
            lastUpdated?: string;
        }, {
            status?: string;
            uptime?: number;
            memory?: {
                heapUsed?: number;
                heapTotal?: number;
            };
            collections?: {
                spaces?: number;
                users?: number;
                builderRequests?: number;
            };
            lastUpdated?: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        spaces?: {
            active?: number;
            total?: number;
            dormant?: number;
            byType?: Record<string, {
                active?: number;
                total?: number;
                members?: number;
                dormant?: number;
            }>;
            hasBuilders?: number;
            totalMembers?: number;
            averageMembers?: number;
            activationRate?: number;
        };
        system?: {
            status?: string;
            uptime?: number;
            memory?: {
                heapUsed?: number;
                heapTotal?: number;
            };
            collections?: {
                spaces?: number;
                users?: number;
                builderRequests?: number;
            };
            lastUpdated?: string;
        };
        users?: {
            active?: number;
            inactive?: number;
            total?: number;
            byMajor?: Record<string, number>;
            byYear?: Record<string, number>;
            growth?: {
                lastWeek?: number;
                lastMonth?: number;
            };
        };
        builderRequests?: {
            urgent?: number;
            total?: number;
            pending?: number;
            approved?: number;
            rejected?: number;
            approvalRate?: number;
            averageResponseTime?: number;
        };
    }, {
        spaces?: {
            active?: number;
            total?: number;
            dormant?: number;
            byType?: Record<string, {
                active?: number;
                total?: number;
                members?: number;
                dormant?: number;
            }>;
            hasBuilders?: number;
            totalMembers?: number;
            averageMembers?: number;
            activationRate?: number;
        };
        system?: {
            status?: string;
            uptime?: number;
            memory?: {
                heapUsed?: number;
                heapTotal?: number;
            };
            collections?: {
                spaces?: number;
                users?: number;
                builderRequests?: number;
            };
            lastUpdated?: string;
        };
        users?: {
            active?: number;
            inactive?: number;
            total?: number;
            byMajor?: Record<string, number>;
            byYear?: Record<string, number>;
            growth?: {
                lastWeek?: number;
                lastMonth?: number;
            };
        };
        builderRequests?: {
            urgent?: number;
            total?: number;
            pending?: number;
            approved?: number;
            rejected?: number;
            approvalRate?: number;
            averageResponseTime?: number;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    success?: true;
    timestamp?: string;
    adminUser?: string;
    platform?: {
        name?: string;
        version?: string;
        environment?: string;
        campusId?: string;
        university?: string;
    };
    statistics?: {
        spaces?: {
            active?: number;
            total?: number;
            dormant?: number;
            byType?: Record<string, {
                active?: number;
                total?: number;
                members?: number;
                dormant?: number;
            }>;
            hasBuilders?: number;
            totalMembers?: number;
            averageMembers?: number;
            activationRate?: number;
        };
        system?: {
            status?: string;
            uptime?: number;
            memory?: {
                heapUsed?: number;
                heapTotal?: number;
            };
            collections?: {
                spaces?: number;
                users?: number;
                builderRequests?: number;
            };
            lastUpdated?: string;
        };
        users?: {
            active?: number;
            inactive?: number;
            total?: number;
            byMajor?: Record<string, number>;
            byYear?: Record<string, number>;
            growth?: {
                lastWeek?: number;
                lastMonth?: number;
            };
        };
        builderRequests?: {
            urgent?: number;
            total?: number;
            pending?: number;
            approved?: number;
            rejected?: number;
            approvalRate?: number;
            averageResponseTime?: number;
        };
    };
}, {
    success?: true;
    timestamp?: string;
    adminUser?: string;
    platform?: {
        name?: string;
        version?: string;
        environment?: string;
        campusId?: string;
        university?: string;
    };
    statistics?: {
        spaces?: {
            active?: number;
            total?: number;
            dormant?: number;
            byType?: Record<string, {
                active?: number;
                total?: number;
                members?: number;
                dormant?: number;
            }>;
            hasBuilders?: number;
            totalMembers?: number;
            averageMembers?: number;
            activationRate?: number;
        };
        system?: {
            status?: string;
            uptime?: number;
            memory?: {
                heapUsed?: number;
                heapTotal?: number;
            };
            collections?: {
                spaces?: number;
                users?: number;
                builderRequests?: number;
            };
            lastUpdated?: string;
        };
        users?: {
            active?: number;
            inactive?: number;
            total?: number;
            byMajor?: Record<string, number>;
            byYear?: Record<string, number>;
            growth?: {
                lastWeek?: number;
                lastMonth?: number;
            };
        };
        builderRequests?: {
            urgent?: number;
            total?: number;
            pending?: number;
            approved?: number;
            rejected?: number;
            approvalRate?: number;
            averageResponseTime?: number;
        };
    };
}>;
export type AdminDashboardResponse = z.infer<typeof AdminDashboardResponseSchema>;
export type AdminDashboardStatistics = z.infer<typeof AdminDashboardStatisticsSchema>;
export type AdminUsersStatistics = z.infer<typeof AdminUsersStatisticsSchema>;
export type AdminSpacesStatistics = z.infer<typeof AdminSpacesStatisticsSchema>;
export type AdminBuilderRequestsStatistics = z.infer<typeof AdminBuilderRequestsStatisticsSchema>;
export type AdminSystemStatistics = z.infer<typeof AdminSystemStatisticsSchema>;
//# sourceMappingURL=dashboard.d.ts.map