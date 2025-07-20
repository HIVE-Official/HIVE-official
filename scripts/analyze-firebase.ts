#!/usr/bin/env node

/**
 * Firebase Analysis Script
 * Analyzes the current Firebase/Firestore database structure for UB spaces
 * and generates a comprehensive report on data consistency and completeness.
 */

import { dbAdmin } from '../packages/core/src/firebase-admin';
import { UB_MAJORS } from '../packages/core/src/constants/majors';

interface FirebaseAnalysisResult {
  spacesByType: Record<string, number>;
  spacesByStatus: Record<string, number>;
  totalSpaces: number;
  membershipAnalysis: {
    totalMembers: number;
    averageMembersPerSpace: number;
    spacesWithNoMembers: number;
    mostPopularSpace: { name: string; memberCount: number } | null;
  };
  dataConsistencyIssues: {
    missingFields: string[];
    inconsistentTypes: string[];
    malformedTags: string[];
    invalidStatuses: string[];
  };
  ubSpecificAnalysis: {
    majorsWithSpaces: number;
    majorsWithoutSpaces: number;
    missingMajorSpaces: string[];
    residentialSpaces: number;
    greekLifeSpaces: number;
    universitySpaces: number;
    studentSpaces: number;
  };
  recommendations: string[];
}

class FirebaseAnalyzer {
  private results: FirebaseAnalysisResult = {
    spacesByType: {},
    spacesByStatus: {},
    totalSpaces: 0,
    membershipAnalysis: {
      totalMembers: 0,
      averageMembersPerSpace: 0,
      spacesWithNoMembers: 0,
      mostPopularSpace: null,
    },
    dataConsistencyIssues: {
      missingFields: [],
      inconsistentTypes: [],
      malformedTags: [],
      invalidStatuses: [],
    },
    ubSpecificAnalysis: {
      majorsWithSpaces: 0,
      majorsWithoutSpaces: 0,
      missingMajorSpaces: [],
      residentialSpaces: 0,
      greekLifeSpaces: 0,
      universitySpaces: 0,
      studentSpaces: 0,
    },
    recommendations: [],
  };

  private validSpaceTypes = ['student', 'university', 'residential', 'academics', 'greek_life'];
  private validStatuses = ['dormant', 'activated', 'frozen'];

  async analyzeSpaces(): Promise<void> {
    console.log('📊 Starting Firebase spaces analysis...');
    
    try {
      // Get all space types first (nested structure: spaces/spacetype/spaces/spaceID)
      const spaceTypesSnapshot = await dbAdmin.collection('spaces').get();
      console.log(`📋 Found ${spaceTypesSnapshot.size} space type collections`);
      
      const spaces: any[] = [];
      const memberCounts: number[] = [];
      let totalSpaces = 0;
      
      // Iterate through each space type collection
      for (const spaceTypeDoc of spaceTypesSnapshot.docs) {
        const spaceType = spaceTypeDoc.id;
        console.log(`🔍 Analyzing space type: ${spaceType}`);
        
        // Get all spaces within this type
        const spacesInTypeSnapshot = await dbAdmin
          .collection('spaces')
          .doc(spaceType)
          .collection('spaces')
          .get();
        
        console.log(`   Found ${spacesInTypeSnapshot.size} spaces in ${spaceType}`);
        totalSpaces += spacesInTypeSnapshot.size;
        
        // Analyze each space in this type
        for (const spaceDoc of spacesInTypeSnapshot.docs) {
          const space = { 
            id: spaceDoc.id, 
            spaceType: spaceType,
            ...spaceDoc.data() 
          };
          spaces.push(space);
          
          // Analyze space type (using the collection name as type)
          this.analyzeSpaceTypeNested(space, spaceType);
          
          // Analyze space status
          this.analyzeSpaceStatus(space);
          
          // Analyze data consistency
          this.analyzeDataConsistency(space);
          
          // Analyze UB-specific data
          this.analyzeUBSpecificDataNested(space, spaceType);
          
          // Track member counts
          const memberCount = (space as any).memberCount || 0;
          memberCounts.push(memberCount);
          
          if (memberCount === 0) {
            this.results.membershipAnalysis.spacesWithNoMembers++;
          }
          
          // Track most popular space
          if (!this.results.membershipAnalysis.mostPopularSpace || 
              memberCount > this.results.membershipAnalysis.mostPopularSpace.memberCount) {
            this.results.membershipAnalysis.mostPopularSpace = {
              name: (space as any).name || space.id,
              memberCount,
            };
          }
        }
      }
      
      this.results.totalSpaces = totalSpaces;
      
      // Calculate membership analytics
      this.results.membershipAnalysis.totalMembers = memberCounts.reduce((a, b) => a + b, 0);
      this.results.membershipAnalysis.averageMembersPerSpace = 
        this.results.totalSpaces > 0 ? this.results.membershipAnalysis.totalMembers / this.results.totalSpaces : 0;
      
      // Analyze missing UB major spaces
      this.analyzeMissingMajorSpaces();
      
      // Generate recommendations
      this.generateRecommendations();
      
      console.log('✅ Analysis complete!');
      
    } catch (error) {
      console.error('❌ Error analyzing Firebase data:', error);
      throw error;
    }
  }

  private analyzeSpaceType(space: any): void {
    const type = (space as any).type;
    if (!type) {
      this.results.dataConsistencyIssues.missingFields.push(`${space.id}: missing type field`);
      return;
    }
    
    if (!this.validSpaceTypes.includes(type)) {
      this.results.dataConsistencyIssues.inconsistentTypes.push(
        `${space.id}: invalid type "${type}", expected one of: ${this.validSpaceTypes.join(', ')}`
      );
    }
    
    this.results.spacesByType[type] = (this.results.spacesByType[type] || 0) + 1;
  }

  private analyzeSpaceTypeNested(space: any, spaceType: string): void {
    // In nested structure, the space type is the collection name
    if (!this.validSpaceTypes.includes(spaceType)) {
      this.results.dataConsistencyIssues.inconsistentTypes.push(
        `${space.id}: invalid collection type "${spaceType}", expected one of: ${this.validSpaceTypes.join(', ')}`
      );
    }
    
    this.results.spacesByType[spaceType] = (this.results.spacesByType[spaceType] || 0) + 1;
  }

  private analyzeSpaceStatus(space: any): void {
    const status = (space as any).status;
    if (!status) {
      this.results.dataConsistencyIssues.missingFields.push(`${space.id}: missing status field`);
      return;
    }
    
    if (!this.validStatuses.includes(status)) {
      this.results.dataConsistencyIssues.invalidStatuses.push(
        `${space.id}: invalid status "${status}", expected one of: ${this.validStatuses.join(', ')}`
      );
    }
    
    this.results.spacesByStatus[status] = (this.results.spacesByStatus[status] || 0) + 1;
  }

  private analyzeDataConsistency(space: any): void {
    const requiredFields = ['name', 'description', 'schoolId', 'type', 'status', 'memberCount'];
    
    for (const field of requiredFields) {
      if ((space as any)[field] === undefined || (space as any)[field] === null) {
        this.results.dataConsistencyIssues.missingFields.push(`${space.id}: missing ${field}`);
      }
    }
    
    // Check tags structure
    if ((space as any).tags) {
      if (!Array.isArray((space as any).tags)) {
        this.results.dataConsistencyIssues.malformedTags.push(`${space.id}: tags should be an array`);
      } else {
        for (const tag of (space as any).tags) {
          if (!tag.type || !tag.sub_type) {
            this.results.dataConsistencyIssues.malformedTags.push(
              `${space.id}: tag missing type or sub_type: ${JSON.stringify(tag)}`
            );
          }
        }
      }
    }
    
    // Check schoolId for UB
    if ((space as any).schoolId !== 'ub') {
      this.results.dataConsistencyIssues.inconsistentTypes.push(
        `${space.id}: unexpected schoolId "${(space as any).schoolId}", expected "ub"`
      );
    }
  }

  private analyzeUBSpecificData(space: any): void {
    const type = (space as any).type;
    
    switch (type) {
      case 'academics':
        this.results.ubSpecificAnalysis.majorsWithSpaces++;
        break;
      case 'residential':
        this.results.ubSpecificAnalysis.residentialSpaces++;
        break;
      case 'greek_life':
        this.results.ubSpecificAnalysis.greekLifeSpaces++;
        break;
      case 'university':
        this.results.ubSpecificAnalysis.universitySpaces++;
        break;
      case 'student':
        this.results.ubSpecificAnalysis.studentSpaces++;
        break;
    }
  }

  private analyzeUBSpecificDataNested(space: any, spaceType: string): void {
    // In nested structure, use the collection name as type
    switch (spaceType) {
      case 'academics':
        this.results.ubSpecificAnalysis.majorsWithSpaces++;
        break;
      case 'residential':
        this.results.ubSpecificAnalysis.residentialSpaces++;
        break;
      case 'greek_life':
        this.results.ubSpecificAnalysis.greekLifeSpaces++;
        break;
      case 'university':
        this.results.ubSpecificAnalysis.universitySpaces++;
        break;
      case 'student':
        this.results.ubSpecificAnalysis.studentSpaces++;
        break;
    }
  }

  private analyzeMissingMajorSpaces(): void {
    const existingMajors = new Set<string>();
    
    // Find existing major spaces by checking tags
    for (const [type, count] of Object.entries(this.results.spacesByType)) {
      if (type === 'academics' || type === 'academic' || type === 'major') {
        // This is an approximation - we'd need to check actual tags
        // For now, we'll assume some majors exist
      }
    }
    
    // Check against UB_MAJORS constant
    const allUBMajors = UB_MAJORS.map(major => major.name);
    
    for (const major of allUBMajors) {
      if (!existingMajors.has(major)) {
        this.results.ubSpecificAnalysis.missingMajorSpaces.push(major);
      }
    }
    
    this.results.ubSpecificAnalysis.majorsWithoutSpaces = this.results.ubSpecificAnalysis.missingMajorSpaces.length;
  }

  private generateRecommendations(): void {
    const recs = this.results.recommendations;
    
    // Data consistency recommendations
    if (this.results.dataConsistencyIssues.missingFields.length > 0) {
      recs.push('🔧 Fix missing required fields in space documents');
    }
    
    if (this.results.dataConsistencyIssues.inconsistentTypes.length > 0) {
      recs.push('📝 Standardize SpaceType values across all spaces');
    }
    
    if (this.results.dataConsistencyIssues.malformedTags.length > 0) {
      recs.push('🏷️ Fix malformed tags structure in space documents');
    }
    
    // UB-specific recommendations
    if (this.results.ubSpecificAnalysis.majorsWithoutSpaces > 50) {
      recs.push('🎓 Create spaces for missing UB majors (bulk creation needed)');
    }
    
    if (this.results.ubSpecificAnalysis.residentialSpaces < 10) {
      recs.push('🏠 Add UB residential spaces (dorms, apartments)');
    }
    
    if (this.results.ubSpecificAnalysis.greekLifeSpaces < 5) {
      recs.push('🏛️ Add UB Greek life spaces (fraternities, sororities)');
    }
    
    if (this.results.ubSpecificAnalysis.universitySpaces < 5) {
      recs.push('🏫 Add UB university-wide spaces (events, announcements)');
    }
    
    if (this.results.ubSpecificAnalysis.studentSpaces < 20) {
      recs.push('👥 Add UB student organization spaces (clubs, societies)');
    }
    
    // Membership recommendations
    if (this.results.membershipAnalysis.spacesWithNoMembers > this.results.totalSpaces * 0.3) {
      recs.push('👤 Investigate spaces with zero members - may need promotion or removal');
    }
    
    if (this.results.membershipAnalysis.averageMembersPerSpace < 5) {
      recs.push('📈 Focus on space activation and member recruitment');
    }
    
    // Architecture recommendations
    if (Object.keys(this.results.spacesByType).length < 5) {
      recs.push('🏗️ Implement all 5 space types: student, university, residential, academics, greek_life');
    }
  }

  getResults(): FirebaseAnalysisResult {
    return this.results;
  }

  printReport(): void {
    console.log('\n' + '='.repeat(60));
    console.log('📊 FIREBASE SPACES ANALYSIS REPORT');
    console.log('='.repeat(60));
    
    console.log(`\n📋 OVERVIEW:`);
    console.log(`   Total Spaces: ${this.results.totalSpaces}`);
    console.log(`   Total Members: ${this.results.membershipAnalysis.totalMembers}`);
    console.log(`   Average Members per Space: ${this.results.membershipAnalysis.averageMembersPerSpace.toFixed(1)}`);
    
    console.log(`\n📊 SPACES BY TYPE:`);
    for (const [type, count] of Object.entries(this.results.spacesByType)) {
      console.log(`   ${type}: ${count}`);
    }
    
    console.log(`\n📈 SPACES BY STATUS:`);
    for (const [status, count] of Object.entries(this.results.spacesByStatus)) {
      console.log(`   ${status}: ${count}`);
    }
    
    console.log(`\n🎓 UB-SPECIFIC ANALYSIS:`);
    console.log(`   Academic Spaces: ${this.results.ubSpecificAnalysis.majorsWithSpaces}`);
    console.log(`   Residential Spaces: ${this.results.ubSpecificAnalysis.residentialSpaces}`);
    console.log(`   Greek Life Spaces: ${this.results.ubSpecificAnalysis.greekLifeSpaces}`);
    console.log(`   University Spaces: ${this.results.ubSpecificAnalysis.universitySpaces}`);
    console.log(`   Student Spaces: ${this.results.ubSpecificAnalysis.studentSpaces}`);
    console.log(`   Missing Major Spaces: ${this.results.ubSpecificAnalysis.majorsWithoutSpaces}`);
    
    if (this.results.dataConsistencyIssues.missingFields.length > 0) {
      console.log(`\n⚠️  DATA CONSISTENCY ISSUES:`);
      console.log(`   Missing Fields: ${this.results.dataConsistencyIssues.missingFields.length}`);
      console.log(`   Inconsistent Types: ${this.results.dataConsistencyIssues.inconsistentTypes.length}`);
      console.log(`   Malformed Tags: ${this.results.dataConsistencyIssues.malformedTags.length}`);
      console.log(`   Invalid Statuses: ${this.results.dataConsistencyIssues.invalidStatuses.length}`);
    }
    
    if (this.results.recommendations.length > 0) {
      console.log(`\n💡 RECOMMENDATIONS:`);
      for (const rec of this.results.recommendations) {
        console.log(`   ${rec}`);
      }
    }
    
    console.log('\n' + '='.repeat(60));
    console.log('📊 END OF REPORT');
    console.log('='.repeat(60) + '\n');
  }

  async exportToFile(): Promise<void> {
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const filename = `firebase-analysis-${timestamp}.json`;
    
    try {
      const fs = await import('fs');
      await fs.promises.writeFile(filename, JSON.stringify(this.results, null, 2));
      console.log(`📄 Analysis exported to: ${filename}`);
    } catch (error) {
      console.error('❌ Failed to export analysis:', error);
    }
  }
}

// Main execution
async function main() {
  try {
    console.log('🚀 Starting Firebase analysis...');
    
    const analyzer = new FirebaseAnalyzer();
    await analyzer.analyzeSpaces();
    
    analyzer.printReport();
    await analyzer.exportToFile();
    
    console.log('✅ Analysis complete! Check the generated JSON file for detailed results.');
    
  } catch (error) {
    console.error('❌ Analysis failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

export { FirebaseAnalyzer };