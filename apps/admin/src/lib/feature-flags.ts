import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';
import { db } from './firebase';

export interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'scheduled' | 'archived';
  type: 'release' | 'experiment' | 'operational' | 'permission';
  environment: 'development' | 'staging' | 'production' | 'all';
  rolloutPercentage: number;
  
  // Targeting
  targetSegments: UserSegment[];
  excludeSegments: UserSegment[];
  
  // Scheduling
  scheduledStart?: Timestamp;
  scheduledEnd?: Timestamp;
  
  // A/B Testing
  variants?: FeatureFlagVariant[];
  experimentConfig?: ExperimentConfig;
  
  // Metadata
  createdBy: string;
  createdAt: Timestamp;
  updatedBy: string;
  updatedAt: Timestamp;
  
  // Emergency controls
  killSwitch: boolean;
  killSwitchReason?: string;
  killSwitchActivatedBy?: string;
  killSwitchActivatedAt?: Timestamp;
  
  // Audit
  auditLog: FeatureFlagAuditEntry[];
}

export interface UserSegment {
  type: 'school' | 'year' | 'major' | 'role' | 'custom' | 'random';
  operator: 'equals' | 'in' | 'not_in' | 'contains' | 'greater_than' | 'less_than';
  value: string | string[] | number;
  label: string;
}

export interface FeatureFlagVariant {
  id: string;
  name: string;
  description: string;
  weight: number;
  config: Record<string, any>;
}

export interface ExperimentConfig {
  hypothesis: string;
  successMetrics: string[];
  duration: number; // days
  minimumSampleSize: number;
  statisticalSignificance: number;
  conversionEvent?: string;
}

export interface FeatureFlagAuditEntry {
  timestamp: Timestamp;
  userId: string;
  userName: string;
  action: 'created' | 'updated' | 'activated' | 'deactivated' | 'kill_switch' | 'scheduled' | 'archived';
  changes: Record<string, { from: any; to: any }>;
  reason?: string;
}

export interface PlatformConfig {
  id: string;
  category: 'features' | 'limits' | 'content' | 'security' | 'performance' | 'ui';
  key: string;
  value: any;
  type: 'boolean' | 'string' | 'number' | 'object' | 'array';
  description: string;
  environment: 'development' | 'staging' | 'production' | 'all';
  
  // Validation
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    required?: boolean;
    allowedValues?: any[];
  };
  
  // Emergency controls
  emergencyValue?: any;
  isEmergencyActive: boolean;
  
  // Metadata
  createdBy: string;
  createdAt: Timestamp;
  updatedBy: string;
  updatedAt: Timestamp;
  
  // Audit
  auditLog: ConfigAuditEntry[];
}

export interface ConfigAuditEntry {
  timestamp: Timestamp;
  userId: string;
  userName: string;
  action: 'created' | 'updated' | 'emergency_activated' | 'emergency_deactivated';
  oldValue: any;
  newValue: any;
  reason?: string;
}

export interface UserSegmentEvaluator {
  userId: string;
  userProfile: {
    schoolId: string;
    major?: string;
    year?: number;
    role: string;
    isVerified: boolean;
    createdAt: Timestamp;
    customAttributes?: Record<string, any>;
  };
}

export class FeatureFlagService {
  private static instance: FeatureFlagService;
  private flagCache: Map<string, FeatureFlag> = new Map();
  private configCache: Map<string, PlatformConfig> = new Map();
  private cacheExpiry: Map<string, number> = new Map();
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  public static getInstance(): FeatureFlagService {
    if (!FeatureFlagService.instance) {
      FeatureFlagService.instance = new FeatureFlagService();
    }
    return FeatureFlagService.instance;
  }

  // Feature Flag Management
  async createFeatureFlag(flag: Omit<FeatureFlag, 'id' | 'createdAt' | 'updatedAt' | 'auditLog'>): Promise<string> {
    const flagId = doc(collection(db, 'featureFlags')).id;
    const now = serverTimestamp();
    
    const newFlag: FeatureFlag = {
      ...flag,
      id: flagId,
      createdAt: now as Timestamp,
      updatedAt: now as Timestamp,
      auditLog: [{
        timestamp: now as Timestamp,
        userId: flag.createdBy,
        userName: 'Admin User', // TODO: Get from user context
        action: 'created',
        changes: {},
        reason: 'Initial creation'
      }]
    };

    await setDoc(doc(db, 'featureFlags', flagId), newFlag);
    this.flagCache.set(flagId, newFlag);
    return flagId;
  }

  async updateFeatureFlag(
    flagId: string, 
    updates: Partial<FeatureFlag>, 
    userId: string, 
    userName: string,
    reason?: string
  ): Promise<void> {
    const flagRef = doc(db, 'featureFlags', flagId);
    const currentFlag = await this.getFeatureFlag(flagId);
    
    if (!currentFlag) {
      throw new Error('Feature flag not found');
    }

    // Calculate changes for audit log
    const changes: Record<string, { from: any; to: any }> = {};
    for (const [key, newValue] of Object.entries(updates)) {
      if (key in currentFlag && (currentFlag as any)[key] !== newValue) {
        changes[key] = {
          from: (currentFlag as any)[key],
          to: newValue
        };
      }
    }

    const auditEntry: FeatureFlagAuditEntry = {
      timestamp: serverTimestamp() as Timestamp,
      userId,
      userName,
      action: updates.killSwitch ? 'kill_switch' : 
              updates.status === 'active' ? 'activated' :
              updates.status === 'inactive' ? 'deactivated' : 'updated',
      changes,
      reason
    };

    const updateData = {
      ...updates,
      updatedBy: userId,
      updatedAt: serverTimestamp(),
      auditLog: [...currentFlag.auditLog, auditEntry]
    };

    await updateDoc(flagRef, updateData);
    
    // Update cache
    const updatedFlag = { ...currentFlag, ...updateData };
    this.flagCache.set(flagId, updatedFlag);
    this.cacheExpiry.set(flagId, Date.now() + this.CACHE_TTL);
  }

  async getFeatureFlag(flagId: string): Promise<FeatureFlag | null> {
    // Check cache first
    const cached = this.flagCache.get(flagId);
    const cacheTime = this.cacheExpiry.get(flagId);
    
    if (cached && cacheTime && Date.now() < cacheTime) {
      return cached;
    }

    // Fetch from Firestore
    const flagDoc = await getDoc(doc(db, 'featureFlags', flagId));
    if (!flagDoc.exists()) {
      return null;
    }

    const flag = { id: flagDoc.id, ...flagDoc.data() } as FeatureFlag;
    
    // Update cache
    this.flagCache.set(flagId, flag);
    this.cacheExpiry.set(flagId, Date.now() + this.CACHE_TTL);
    
    return flag;
  }

  async getAllFeatureFlags(): Promise<FeatureFlag[]> {
    const flagsQuery = query(
      collection(db, 'featureFlags'),
      orderBy('updatedAt', 'desc')
    );
    
    const snapshot = await getDocs(flagsQuery);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as FeatureFlag));
  }

  async getActiveFeatureFlags(): Promise<FeatureFlag[]> {
    const flagsQuery = query(
      collection(db, 'featureFlags'),
      where('status', '==', 'active'),
      where('killSwitch', '==', false),
      orderBy('name')
    );
    
    const snapshot = await getDocs(flagsQuery);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as FeatureFlag));
  }

  // User Evaluation
  async evaluateFeatureFlag(
    flagId: string, 
    userEvaluator: UserSegmentEvaluator
  ): Promise<{
    enabled: boolean;
    variant?: FeatureFlagVariant;
    reason: string;
  }> {
    const flag = await this.getFeatureFlag(flagId);
    
    if (!flag) {
      return { enabled: false, reason: 'Flag not found' };
    }

    // Kill switch check
    if (flag.killSwitch) {
      return { enabled: false, reason: 'Kill switch activated' };
    }

    // Status check
    if (flag.status !== 'active') {
      return { enabled: false, reason: `Flag status: ${flag.status}` };
    }

    // Schedule check
    const now = new Date();
    if (flag.scheduledStart && flag.scheduledStart.toDate() > now) {
      return { enabled: false, reason: 'Not yet scheduled to start' };
    }
    
    if (flag.scheduledEnd && flag.scheduledEnd.toDate() < now) {
      return { enabled: false, reason: 'Scheduled to end' };
    }

    // Segment targeting check
    if (!this.evaluateUserSegments(userEvaluator, flag.targetSegments, flag.excludeSegments)) {
      return { enabled: false, reason: 'User not in target segments' };
    }

    // Rollout percentage check
    if (flag.rolloutPercentage < 100) {
      const userId = userEvaluator.userId;
      const hash = this.hashUserId(userId + flag.id);
      const userPercentile = hash % 100;
      
      if (userPercentile >= flag.rolloutPercentage) {
        return { enabled: false, reason: 'Outside rollout percentage' };
      }
    }

    // Variant selection for experiments
    let selectedVariant: FeatureFlagVariant | undefined;
    if (flag.variants && flag.variants.length > 0) {
      selectedVariant = this.selectVariant(userEvaluator.userId + flag.id, flag.variants);
    }

    return { 
      enabled: true, 
      variant: selectedVariant,
      reason: 'All conditions met' 
    };
  }

  private evaluateUserSegments(
    userEvaluator: UserSegmentEvaluator,
    targetSegments: UserSegment[],
    excludeSegments: UserSegment[]
  ): boolean {
    // If no target segments, include all users
    if (targetSegments.length === 0) {
      // But check exclude segments
      return !excludeSegments.some(segment => this.matchesSegment(userEvaluator, segment));
    }

    // User must match at least one target segment
    const matchesTarget = targetSegments.some(segment => 
      this.matchesSegment(userEvaluator, segment)
    );

    if (!matchesTarget) {
      return false;
    }

    // User must not match any exclude segment
    const matchesExclude = excludeSegments.some(segment => 
      this.matchesSegment(userEvaluator, segment)
    );

    return !matchesExclude;
  }

  private matchesSegment(userEvaluator: UserSegmentEvaluator, segment: UserSegment): boolean {
    const { userProfile } = userEvaluator;
    let userValue: any;

    // Get user value based on segment type
    switch (segment.type) {
      case 'school':
        userValue = userProfile.schoolId;
        break;
      case 'year':
        userValue = userProfile.year;
        break;
      case 'major':
        userValue = userProfile.major;
        break;
      case 'role':
        userValue = userProfile.role;
        break;
      case 'random':
        // For random segments, use consistent hash of user ID
        const hash = this.hashUserId(userEvaluator.userId);
        userValue = hash % 100;
        break;
      case 'custom':
        // Extract custom attribute from user profile
        userValue = userProfile.customAttributes?.[segment.value as string];
        break;
      default:
        return false;
    }

    // Apply operator
    switch (segment.operator) {
      case 'equals':
        return userValue === segment.value;
      case 'in':
        return Array.isArray(segment.value) && segment.value.includes(userValue);
      case 'not_in':
        return Array.isArray(segment.value) && !segment.value.includes(userValue);
      case 'contains':
        return typeof userValue === 'string' && 
               typeof segment.value === 'string' && 
               userValue.includes(segment.value);
      case 'greater_than':
        return typeof userValue === 'number' && 
               typeof segment.value === 'number' && 
               userValue > segment.value;
      case 'less_than':
        return typeof userValue === 'number' && 
               typeof segment.value === 'number' && 
               userValue < segment.value;
      default:
        return false;
    }
  }

  private selectVariant(seed: string, variants: FeatureFlagVariant[]): FeatureFlagVariant {
    const hash = this.hashUserId(seed);
    const totalWeight = variants.reduce((sum, v) => sum + v.weight, 0);
    const threshold = hash % totalWeight;
    
    let currentWeight = 0;
    for (const variant of variants) {
      currentWeight += variant.weight;
      if (threshold < currentWeight) {
        return variant;
      }
    }
    
    return variants[0]; // Fallback to first variant
  }

  private hashUserId(userId: string): number {
    let hash = 0;
    for (let i = 0; i < userId.length; i++) {
      const char = userId.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }

  // Emergency Controls
  async activateKillSwitch(
    flagId: string, 
    userId: string, 
    userName: string, 
    reason: string
  ): Promise<void> {
    await this.updateFeatureFlag(flagId, {
      killSwitch: true,
      killSwitchReason: reason,
      killSwitchActivatedBy: userId,
      killSwitchActivatedAt: serverTimestamp() as Timestamp
    }, userId, userName, `EMERGENCY: ${reason}`);
  }

  async deactivateKillSwitch(
    flagId: string, 
    userId: string, 
    userName: string
  ): Promise<void> {
    await this.updateFeatureFlag(flagId, {
      killSwitch: false,
      killSwitchReason: undefined,
      killSwitchActivatedBy: undefined,
      killSwitchActivatedAt: undefined
    }, userId, userName, 'Kill switch deactivated');
  }

  // Platform Configuration
  async createPlatformConfig(
    config: Omit<PlatformConfig, 'id' | 'createdAt' | 'updatedAt' | 'auditLog' | 'isEmergencyActive'>
  ): Promise<string> {
    const configId = doc(collection(db, 'platformConfig')).id;
    const now = serverTimestamp();
    
    const newConfig: PlatformConfig = {
      ...config,
      id: configId,
      isEmergencyActive: false,
      createdAt: now as Timestamp,
      updatedAt: now as Timestamp,
      auditLog: [{
        timestamp: now as Timestamp,
        userId: config.createdBy,
        userName: 'Admin User',
        action: 'created',
        oldValue: null,
        newValue: config.value
      }]
    };

    await setDoc(doc(db, 'platformConfig', configId), newConfig);
    this.configCache.set(configId, newConfig);
    return configId;
  }

  async updatePlatformConfig(
    configId: string,
    newValue: any,
    userId: string,
    userName: string,
    reason?: string
  ): Promise<void> {
    const configRef = doc(db, 'platformConfig', configId);
    const currentConfig = await this.getPlatformConfig(configId);
    
    if (!currentConfig) {
      throw new Error('Platform config not found');
    }

    const auditEntry: ConfigAuditEntry = {
      timestamp: serverTimestamp() as Timestamp,
      userId,
      userName,
      action: 'updated',
      oldValue: currentConfig.value,
      newValue,
      reason
    };

    const updateData = {
      value: newValue,
      updatedBy: userId,
      updatedAt: serverTimestamp(),
      auditLog: [...currentConfig.auditLog, auditEntry]
    };

    await updateDoc(configRef, updateData);
    
    // Update cache
    const updatedConfig = { ...currentConfig, ...updateData };
    this.configCache.set(configId, updatedConfig);
  }

  async getPlatformConfig(configId: string): Promise<PlatformConfig | null> {
    // Check cache first
    const cached = this.configCache.get(configId);
    const cacheTime = this.cacheExpiry.get(configId);
    
    if (cached && cacheTime && Date.now() < cacheTime) {
      return cached;
    }

    // Fetch from Firestore
    const configDoc = await getDoc(doc(db, 'platformConfig', configId));
    if (!configDoc.exists()) {
      return null;
    }

    const config = { id: configDoc.id, ...configDoc.data() } as PlatformConfig;
    
    // Update cache
    this.configCache.set(configId, config);
    this.cacheExpiry.set(configId, Date.now() + this.CACHE_TTL);
    
    return config;
  }

  async getAllPlatformConfigs(): Promise<PlatformConfig[]> {
    const configsQuery = query(
      collection(db, 'platformConfig'),
      orderBy('category'),
      orderBy('key')
    );
    
    const snapshot = await getDocs(configsQuery);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PlatformConfig));
  }

  // Cache management
  clearCache(): void {
    this.flagCache.clear();
    this.configCache.clear();
    this.cacheExpiry.clear();
  }

  // Analytics
  async getFeatureFlagAnalytics(flagId: string, days: number = 7): Promise<{
    totalEvaluations: number;
    enabledEvaluations: number;
    uniqueUsers: number;
    variantDistribution: Record<string, number>;
    segmentBreakdown: Record<string, number>;
  }> {
    // This would integrate with your analytics system
    // For now, return mock data structure
    return {
      totalEvaluations: 0,
      enabledEvaluations: 0,
      uniqueUsers: 0,
      variantDistribution: {},
      segmentBreakdown: {}
    };
  }
}

// Export singleton instance
export const featureFlagService = FeatureFlagService.getInstance();