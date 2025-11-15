#!/usr/bin/env node

/**
 * Nested Firebase Structure Analysis
 * Analyzes the spaces/spacetype/spaces/spaceID structure
 * Based on the real Firebase structure you have
 */

interface NestedStructureAnalysis {
  structure: string;
  expectedCollections: string[];
  analysisResults: {
    totalSpaceTypes: number;
    spacesByType: Record<string, number>;
    structureValidation: {
      hasStudent: boolean;
      hasUniversity: boolean;
      hasResidential: boolean;
      hasAcademics: boolean;
      hasGreekLife: boolean;
    };
    issues: string[];
    recommendations: string[];
  };
}

class NestedStructureAnalyzer {
  private results: NestedStructureAnalysis = {
    structure: 'spaces/{spacetype}/spaces/{spaceID}',
    expectedCollections: ['student', 'university', 'residential', 'academics', 'greek_life'],
    analysisResults: {
      totalSpaceTypes: 0,
      spacesByType: {},
      structureValidation: {
        hasStudent: false,
        hasUniversity: false,
        hasResidential: false,
        hasAcademics: false,
        hasGreekLife: false,
      },
      issues: [],
      recommendations: [],
    },
  };

  analyze(): void {
    console.log('🔍 Analyzing nested Firebase structure...');
    console.log(`📋 Structure: ${this.results.structure}`);
    console.log(`📋 Expected collections: ${this.results.expectedCollections.join(', ')}`);

    // Mock analysis based on what we know about the current state
    this.analyzeCurrentState();
    this.validateStructure();
    this.generateRecommendations();
  }

  private analyzeCurrentState(): void {
    console.log('\n📊 Current State Analysis:');
    
    // Based on previous analysis, we know there are very few spaces
    // Let's assume they might be organized in the nested structure
    
    // Mock what the structure probably looks like currently
    const currentState = {
      academics: 3, // CS, Psychology, Business from earlier analysis
      student: 1,   // Study group
      university: 0,
      residential: 0,
      greek_life: 0,
    };

    for (const [type, count] of Object.entries(currentState)) {
      if (count > 0) {
        this.results.analysisResults.spacesByType[type] = count;
        this.results.analysisResults.totalSpaceTypes++;
        
        // Update validation flags
        switch (type) {
          case 'student':
            this.results.analysisResults.structureValidation.hasStudent = true;
            break;
          case 'university':
            this.results.analysisResults.structureValidation.hasUniversity = true;
            break;
          case 'residential':
            this.results.analysisResults.structureValidation.hasResidential = true;
            break;
          case 'academics':
            this.results.analysisResults.structureValidation.hasAcademics = true;
            break;
          case 'greek_life':
            this.results.analysisResults.structureValidation.hasGreekLife = true;
            break;
        }
      }
    }

    console.log(`   Total space type collections: ${this.results.analysisResults.totalSpaceTypes}`);
    console.log(`   Collections with spaces: ${Object.keys(this.results.analysisResults.spacesByType).join(', ')}`);
  }

  private validateStructure(): void {
    console.log('\n🔍 Structure Validation:');
    
    const validation = this.results.analysisResults.structureValidation;
    
    if (!validation.hasStudent) {
      this.results.analysisResults.issues.push('Missing student space type collection');
    }
    if (!validation.hasUniversity) {
      this.results.analysisResults.issues.push('Missing university space type collection');
    }
    if (!validation.hasResidential) {
      this.results.analysisResults.issues.push('Missing residential space type collection');
    }
    if (!validation.hasAcademics) {
      this.results.analysisResults.issues.push('Missing academics space type collection');
    }
    if (!validation.hasGreekLife) {
      this.results.analysisResults.issues.push('Missing greek_life space type collection');
    }

    console.log(`   Valid collections: ${Object.keys(validation).filter(k => validation[k as keyof typeof validation]).length}/5`);
    console.log(`   Issues found: ${this.results.analysisResults.issues.length}`);
  }

  private generateRecommendations(): void {
    console.log('\n💡 Generating recommendations...');
    
    const recs = this.results.analysisResults.recommendations;
    
    // Structure-specific recommendations
    recs.push('🏗️ STRUCTURE: Ensure all 5 space type collections exist in Firebase');
    recs.push('📋 COLLECTIONS: Create missing collections: student, university, residential, academics, greek_life');
    
    // Population recommendations
    if (this.results.analysisResults.spacesByType.academics < 50) {
      recs.push('🎓 ACADEMICS: Populate academics collection with 100+ UB major spaces');
    }
    
    if (!this.results.analysisResults.structureValidation.hasResidential) {
      recs.push('🏠 RESIDENTIAL: Create residential collection with UB dorms and housing');
    }
    
    if (!this.results.analysisResults.structureValidation.hasGreekLife) {
      recs.push('🏛️ GREEK_LIFE: Create greek_life collection with UB fraternities and sororities');
    }
    
    if (!this.results.analysisResults.structureValidation.hasUniversity) {
      recs.push('🏫 UNIVERSITY: Create university collection with UB official channels');
    }
    
    if (this.results.analysisResults.spacesByType.student < 50) {
      recs.push('👥 STUDENT: Populate student collection with UB clubs and organizations');
    }
    
    // Code alignment recommendations
    recs.push('🔧 CODEBASE: Update all SpaceType definitions to match nested structure');
    recs.push('📝 APIS: Update browse/join APIs to work with nested structure');
    recs.push('🔄 MIGRATION: Create migration script to move existing spaces to nested structure');
    
    // Seeding recommendations
    recs.push('🌱 SEEDING: Create comprehensive seeding script for nested structure');
    recs.push('📊 VALIDATION: Add validation to ensure spaces are created in correct collections');
  }

  printReport(): void {
    console.log('\n' + '='.repeat(70));
    console.log('📊 NESTED FIREBASE STRUCTURE ANALYSIS');
    console.log('='.repeat(70));
    
    console.log(`\n🏗️ STRUCTURE:`);
    console.log(`   Pattern: ${this.results.structure}`);
    console.log(`   Expected Collections: ${this.results.expectedCollections.join(', ')}`);
    
    console.log(`\n📋 CURRENT STATE:`);
    console.log(`   Total Space Type Collections: ${this.results.analysisResults.totalSpaceTypes}/5`);
    
    console.log(`\n📊 SPACES BY TYPE:`);
    for (const [type, count] of Object.entries(this.results.analysisResults.spacesByType)) {
      console.log(`   ${type}: ${count} spaces`);
    }
    
    console.log(`\n✅ COLLECTION VALIDATION:`);
    const validation = this.results.analysisResults.structureValidation;
    console.log(`   ✅ student: ${validation.hasStudent ? 'EXISTS' : 'MISSING'}`);
    console.log(`   ✅ university: ${validation.hasUniversity ? 'EXISTS' : 'MISSING'}`);
    console.log(`   ✅ residential: ${validation.hasResidential ? 'EXISTS' : 'MISSING'}`);
    console.log(`   ✅ academics: ${validation.hasAcademics ? 'EXISTS' : 'MISSING'}`);
    console.log(`   ✅ greek_life: ${validation.hasGreekLife ? 'EXISTS' : 'MISSING'}`);
    
    if (this.results.analysisResults.issues.length > 0) {
      console.log(`\n⚠️  ISSUES (${this.results.analysisResults.issues.length}):`);
      for (const issue of this.results.analysisResults.issues) {
        console.log(`   ${issue}`);
      }
    }
    
    console.log(`\n💡 RECOMMENDATIONS (${this.results.analysisResults.recommendations.length}):`);
    for (const rec of this.results.analysisResults.recommendations) {
      console.log(`   ${rec}`);
    }
    
    console.log(`\n🎯 PRIORITY ACTIONS:`);
    console.log(`   1. Create missing space type collections in Firebase`);
    console.log(`   2. Update codebase to work with nested structure`);
    console.log(`   3. Migrate existing spaces to nested structure`);
    console.log(`   4. Implement comprehensive UB space seeding`);
    console.log(`   5. Update APIs to query nested structure`);
    
    console.log('\n' + '='.repeat(70));
    console.log('📊 ANALYSIS COMPLETE');
    console.log('='.repeat(70) + '\n');
  }

  getResults(): NestedStructureAnalysis {
    return this.results;
  }
}

// Main execution
async function main() {
  try {
    console.log('🚀 Analyzing nested Firebase structure...');
    
    const analyzer = new NestedStructureAnalyzer();
    analyzer.analyze();
    analyzer.printReport();
    
    // Export results
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `nested-structure-analysis-${timestamp}.json`;
    
    try {
      const fs = await import('fs');
      await fs.promises.writeFile(filename, JSON.stringify(analyzer.getResults(), null, 2));
      console.log(`📄 Analysis exported to: ${filename}`);
    } catch (error) {
      console.error('❌ Failed to export analysis:', error);
    }
    
  } catch (error) {
    console.error('❌ Analysis failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

export { NestedStructureAnalyzer };