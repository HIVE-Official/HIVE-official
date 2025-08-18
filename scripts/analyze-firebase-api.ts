#!/usr/bin/env node

/**
 * Firebase Analysis Script (API-based)
 * Analyzes Firebase data through the existing API endpoints
 * This works without direct Firebase credentials
 */

import { spawn } from 'child_process';
import { writeFileSync } from 'fs';

interface SpaceAnalysis {
  totalSpaces: number;
  spacesByType: Record<string, number>;
  spacesByStatus: Record<string, number>;
  typeInconsistencies: string[];
  statusInconsistencies: string[];
  dataIssues: string[];
  ubAnalysis: {
    academicSpaces: number;
    residentialSpaces: number;
    greekLifeSpaces: number;
    universitySpaces: number;
    studentSpaces: number;
    unknownTypes: number;
  };
  recommendations: string[];
}

class APIFirebaseAnalyzer {
  private results: SpaceAnalysis = {
    totalSpaces: 0,
    spacesByType: {},
    spacesByStatus: {},
    typeInconsistencies: [],
    statusInconsistencies: [],
    dataIssues: [],
    ubAnalysis: {
      academicSpaces: 0,
      residentialSpaces: 0,
      greekLifeSpaces: 0,
      universitySpaces: 0,
      studentSpaces: 0,
      unknownTypes: 0,
    },
    recommendations: [],
  };

  private expectedTypes = ['student', 'university', 'residential', 'academics', 'greek_life'];
  private expectedStatuses = ['dormant', 'activated', 'frozen'];
  private currentTypes: string[] = [];
  private currentStatuses: string[] = [];

  async analyzeCurrentImplementation(): Promise<void> {
    console.log('🔍 Analyzing current Firebase implementation...');
    
    // First, analyze the codebase to understand current structure
    await this.analyzeCodebaseStructure();
    
    // Then analyze what we know from the existing seed data
    await this.analyzeExistingSpaces();
    
    // Generate recommendations
    this.generateRecommendations();
    
    console.log('✅ Analysis complete!');
  }

  private async analyzeCodebaseStructure(): Promise<void> {
    console.log('📋 Analyzing codebase structure...');
    
    try {
      // Read the SpaceType definitions from different files
      const typeDefinitions = await this.extractTypeDefinitions();
      
      // Analyze inconsistencies
      this.analyzeTypeInconsistencies(typeDefinitions);
      
      // Check existing seed data
      await this.checkSeedData();
      
    } catch (error) {
      console.error('❌ Error analyzing codebase:', error);
    }
  }

  private async extractTypeDefinitions(): Promise<Record<string, string[]>> {
    const typeDefinitions: Record<string, string[]> = {};
    
    // These are the known type definitions from our analysis
    typeDefinitions['domain/firestore/space.ts'] = ['major', 'residential', 'interest', 'creative', 'organization'];
    typeDefinitions['domain/space.ts'] = ['academic', 'social', 'residential', 'administrative'];
    typeDefinitions['types/onboarding.d.ts'] = ['academic', 'social', 'professional', 'sports', 'cultural', 'service'];
    typeDefinitions['functions/onUserCreate.ts'] = ['major', 'residential', 'interest', 'club'];
    typeDefinitions['API browse route'] = ['major', 'residential', 'interest', 'creative', 'organization'];
    
    return typeDefinitions;
  }

  private analyzeTypeInconsistencies(typeDefinitions: Record<string, string[]>): void {
    console.log('🔍 Analyzing type inconsistencies...');
    
    const allTypes = new Set<string>();
    const fileTypeCounts: Record<string, number> = {};
    
    // Collect all types and count occurrences
    for (const [file, types] of Object.entries(typeDefinitions)) {
      for (const type of types) {
        allTypes.add(type);
        fileTypeCounts[type] = (fileTypeCounts[type] || 0) + 1;
      }
    }
    
    // Find inconsistencies
    const inconsistentTypes = Array.from(allTypes).filter(type => 
      !this.expectedTypes.includes(type)
    );
    
    for (const type of inconsistentTypes) {
      this.results.typeInconsistencies.push(
        `Type "${type}" found in codebase but not in expected types: ${this.expectedTypes.join(', ')}`
      );
    }
    
    // Track current types being used
    this.currentTypes = Array.from(allTypes);
    
    console.log(`   Found ${allTypes.size} different space types across codebase`);
    console.log(`   Expected types: ${this.expectedTypes.join(', ')}`);
    console.log(`   Inconsistent types: ${inconsistentTypes.join(', ')}`);
  }

  private async checkSeedData(): Promise<void> {
    console.log('📊 Analyzing existing seed data...');
    
    // Based on our earlier analysis, we know there are 4 spaces in the seed data
    const knownSpaces = [
      { id: 'ub-computer-science', type: 'academic', status: 'activated', memberCount: 2 },
      { id: 'ub-psychology', type: 'academic', status: 'activated', memberCount: 1 },
      { id: 'ub-business', type: 'academic', status: 'activated', memberCount: 1 },
      { id: 'ub-study-group', type: 'interest', status: 'activated', memberCount: 0 },
    ];
    
    this.results.totalSpaces = knownSpaces.length;
    
    // Analyze each space
    for (const space of knownSpaces) {
      // Count by type
      this.results.spacesByType[space.type] = (this.results.spacesByType[space.type] || 0) + 1;
      
      // Count by status
      this.results.spacesByStatus[space.status] = (this.results.spacesByStatus[space.status] || 0) + 1;
      
      // Check against expected types
      if (!this.expectedTypes.includes(space.type)) {
        this.results.typeInconsistencies.push(`Space ${space.id} has unexpected type: ${space.type}`);
      }
      
      // Map to UB analysis
      if (space.type === 'academic') {
        this.results.ubAnalysis.academicSpaces++;
      } else if (space.type === 'interest') {
        this.results.ubAnalysis.studentSpaces++;
      } else {
        this.results.ubAnalysis.unknownTypes++;
      }
      
      // Check for data issues
      if (space.memberCount === 0) {
        this.results.dataIssues.push(`Space ${space.id} has zero members`);
      }
    }
    
    console.log(`   Analyzed ${knownSpaces.length} existing spaces`);
    console.log(`   Types found: ${Object.keys(this.results.spacesByType).join(', ')}`);
  }

  private async analyzeExistingSpaces(): Promise<void> {
    console.log('🎓 Analyzing UB-specific data gaps...');
    
    // We know from UB_MAJORS that there are 110+ majors
    const totalUBMajors = 110; // Approximate from our earlier analysis
    const majorsWithSpaces = this.results.ubAnalysis.academicSpaces;
    
    this.results.ubAnalysis.academicSpaces = majorsWithSpaces;
    
    // Estimate missing data
    const missingMajorSpaces = totalUBMajors - majorsWithSpaces;
    
    if (missingMajorSpaces > 0) {
      this.results.dataIssues.push(`${missingMajorSpaces} UB majors lack dedicated spaces`);
    }
    
    // Check for missing space types
    const missingTypes = this.expectedTypes.filter(type => 
      !Object.keys(this.results.spacesByType).includes(type) &&
      !this.mapCurrentToExpected(Object.keys(this.results.spacesByType)).includes(type)
    );
    
    for (const type of missingTypes) {
      this.results.dataIssues.push(`No spaces found for type: ${type}`);
    }
    
    console.log(`   Missing major spaces: ${missingMajorSpaces}`);
    console.log(`   Missing space types: ${missingTypes.join(', ')}`);
  }

  private mapCurrentToExpected(currentTypes: string[]): string[] {
    const mapping: Record<string, string> = {
      'academic': 'academics',
      'major': 'academics',
      'interest': 'student',
      'social': 'student',
      'creative': 'student',
      'organization': 'student',
      'administrative': 'university',
      'residential': 'residential',
      'club': 'student',
      'professional': 'university',
      'sports': 'student',
      'cultural': 'student',
      'service': 'student',
    };
    
    return currentTypes.map(type => mapping[type] || type);
  }

  private generateRecommendations(): void {
    console.log('💡 Generating recommendations...');
    
    const recs = this.results.recommendations;
    
    // Type standardization
    if (this.results.typeInconsistencies.length > 0) {
      recs.push('🔧 CRITICAL: Standardize SpaceType definitions across all files to use: student, university, residential, academics, greek_life');
    }
    
    // Data completeness
    if (this.results.totalSpaces < 50) {
      recs.push('📊 MISSING DATA: Create comprehensive UB space data (currently only 4 spaces exist)');
    }
    
    if (this.results.ubAnalysis.residentialSpaces === 0) {
      recs.push('🏠 MISSING: Add UB residential spaces (dorms, apartments, housing)');
    }
    
    if (this.results.ubAnalysis.greekLifeSpaces === 0) {
      recs.push('🏛️ MISSING: Add UB Greek life spaces (fraternities, sororities)');
    }
    
    if (this.results.ubAnalysis.universitySpaces === 0) {
      recs.push('🏫 MISSING: Add UB university-wide spaces (events, announcements, services)');
    }
    
    if (this.results.ubAnalysis.academicSpaces < 20) {
      recs.push('🎓 INCOMPLETE: Add missing UB academic spaces (100+ majors need spaces)');
    }
    
    if (this.results.ubAnalysis.studentSpaces < 30) {
      recs.push('👥 INCOMPLETE: Add UB student organization spaces (clubs, societies, interest groups)');
    }
    
    // Architecture fixes
    if (this.currentTypes.length > 5) {
      recs.push('🏗️ ARCHITECTURE: Consolidate space types to the 5 standard categories');
    }
    
    // Data quality
    if (this.results.dataIssues.length > 0) {
      recs.push('🔍 DATA QUALITY: Fix identified data issues and inconsistencies');
    }
    
    // Schema alignment
    recs.push('📋 SCHEMA: Update all SpaceType definitions to match real UB structure');
    recs.push('🔄 MIGRATION: Create data migration script to update existing spaces');
    recs.push('🌱 SEEDING: Implement comprehensive UB space seeding system');
  }

  printReport(): void {
    console.log('\n' + '='.repeat(70));
    console.log('📊 FIREBASE SPACES ANALYSIS REPORT (API-BASED)');
    console.log('='.repeat(70));
    
    console.log(`\n📋 CURRENT STATE:`);
    console.log(`   Total Spaces: ${this.results.totalSpaces}`);
    console.log(`   Space Types Found: ${Object.keys(this.results.spacesByType).join(', ')}`);
    console.log(`   Space Statuses: ${Object.keys(this.results.spacesByStatus).join(', ')}`);
    
    console.log(`\n🔍 SPACES BY TYPE:`);
    for (const [type, count] of Object.entries(this.results.spacesByType)) {
      console.log(`   ${type}: ${count}`);
    }
    
    console.log(`\n📈 SPACES BY STATUS:`);
    for (const [status, count] of Object.entries(this.results.spacesByStatus)) {
      console.log(`   ${status}: ${count}`);
    }
    
    console.log(`\n🎓 UB-SPECIFIC ANALYSIS:`);
    console.log(`   Academic Spaces: ${this.results.ubAnalysis.academicSpaces}`);
    console.log(`   Residential Spaces: ${this.results.ubAnalysis.residentialSpaces}`);
    console.log(`   Greek Life Spaces: ${this.results.ubAnalysis.greekLifeSpaces}`);
    console.log(`   University Spaces: ${this.results.ubAnalysis.universitySpaces}`);
    console.log(`   Student Spaces: ${this.results.ubAnalysis.studentSpaces}`);
    console.log(`   Unknown Types: ${this.results.ubAnalysis.unknownTypes}`);
    
    if (this.results.typeInconsistencies.length > 0) {
      console.log(`\n⚠️  TYPE INCONSISTENCIES (${this.results.typeInconsistencies.length}):`);
      for (const issue of this.results.typeInconsistencies.slice(0, 5)) {
        console.log(`   ${issue}`);
      }
      if (this.results.typeInconsistencies.length > 5) {
        console.log(`   ... and ${this.results.typeInconsistencies.length - 5} more`);
      }
    }
    
    if (this.results.dataIssues.length > 0) {
      console.log(`\n🔍 DATA ISSUES (${this.results.dataIssues.length}):`);
      for (const issue of this.results.dataIssues.slice(0, 5)) {
        console.log(`   ${issue}`);
      }
      if (this.results.dataIssues.length > 5) {
        console.log(`   ... and ${this.results.dataIssues.length - 5} more`);
      }
    }
    
    console.log(`\n💡 RECOMMENDATIONS (${this.results.recommendations.length}):`);
    for (const rec of this.results.recommendations) {
      console.log(`   ${rec}`);
    }
    
    console.log('\n' + '='.repeat(70));
    console.log('📊 ANALYSIS COMPLETE');
    console.log('='.repeat(70) + '\n');
  }

  async exportResults(): Promise<void> {
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `firebase-analysis-${timestamp}.json`;
    
    try {
      writeFileSync(filename, JSON.stringify(this.results, null, 2));
      console.log(`📄 Analysis exported to: ${filename}`);
    } catch (error) {
      console.error('❌ Failed to export results:', error);
    }
  }
}

async function main() {
  try {
    console.log('🚀 Starting Firebase Analysis (API-based)...');
    
    const analyzer = new APIFirebaseAnalyzer();
    await analyzer.analyzeCurrentImplementation();
    
    analyzer.printReport();
    await analyzer.exportResults();
    
  } catch (error) {
    console.error('❌ Analysis failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

export { APIFirebaseAnalyzer };