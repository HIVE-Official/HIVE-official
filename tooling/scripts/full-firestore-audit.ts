#!/usr/bin/env node

// Import the properly configured Firebase admin from web app
import { dbAdmin } from '../apps/web/src/lib/firebase-admin';

async function auditFirestoreCollections() {
  console.log('🔍 HIVE Firestore Complete Database Audit');
  console.log('==========================================');
  
  const auditResults = {
    collections: {} as Record<string, any>,
    totalDocuments: 0,
    summary: {
      rootCollections: 0,
      nestedCollections: 0,
      totalCollections: 0,
      dataQualityIssues: [] as string[],
      recommendations: [] as string[]
    }
  };

  try {
    // Get all root collections
    console.log('\n📋 DISCOVERING ROOT COLLECTIONS...');
    const collections = await dbAdmin.listCollections();
    auditResults.summary.rootCollections = collections.length;
    
    console.log(`Found ${collections.length} root collections:`);
    collections.forEach(col => console.log(`  - ${col.id}`));

    // Audit each root collection
    for (const collection of collections) {
      console.log(`\n🔍 AUDITING COLLECTION: ${collection.id}`);
      console.log('='.repeat(50));
      
      const collectionAudit = {
        name: collection.id,
        documentCount: 0,
        sampleDocuments: [] as any[],
        subcollections: {} as Record<string, any>,
        schema: {
          fields: new Set<string>(),
          types: {} as Record<string, Set<string>>
        },
        dataIssues: [] as string[]
      };

      try {
        // Get all documents in this collection
        const snapshot = await collection.get();
        collectionAudit.documentCount = snapshot.size;
        auditResults.totalDocuments += snapshot.size;
        
        console.log(`   Documents: ${snapshot.size}`);

        // Sample first 10 documents for schema analysis
        const sampleDocs = snapshot.docs.slice(0, 10);
        
        for (const doc of sampleDocs) {
          const data = doc.data();
          const docAnalysis = {
            id: doc.id,
            fields: Object.keys(data),
            hasTimestamps: !!(data.createdAt || data.updatedAt),
            dataSize: JSON.stringify(data).length
          };
          
          collectionAudit.sampleDocuments.push(docAnalysis);
          
          // Track schema
          Object.keys(data).forEach(field => {
            collectionAudit.schema.fields.add(field);
            const type = typeof data[field];
            if (!collectionAudit.schema.types[field]) {
              collectionAudit.schema.types[field] = new Set();
            }
            collectionAudit.schema.types[field].add(type);
          });

          // Check for subcollections
          try {
            const subcollections = await doc.ref.listCollections();
            if (subcollections.length > 0) {
              console.log(`     Subcollections in ${doc.id}:`);
              for (const subcol of subcollections) {
                console.log(`       - ${subcol.id}`);
                
                // Quick count of subcollection documents
                const subSnapshot = await subcol.get();
                collectionAudit.subcollections[subcol.id] = {
                  documentCount: subSnapshot.size,
                  parentDoc: doc.id
                };
                auditResults.summary.nestedCollections++;
                auditResults.totalDocuments += subSnapshot.size;
                
                console.log(`         (${subSnapshot.size} documents)`);
              }
            }
          } catch (subError) {
            console.warn(`     Could not list subcollections: ${subError}`);
          }
        }

        // Convert Sets to Arrays for JSON serialization
        (collectionAudit.schema as any).fields = Array.from(collectionAudit.schema.fields);
        Object.keys(collectionAudit.schema.types).forEach(field => {
          (collectionAudit.schema.types as any)[field] = Array.from(collectionAudit.schema.types[field]);
        });

        // Data quality checks
        if (collection.id === 'users' && collectionAudit.documentCount === 0) {
          collectionAudit.dataIssues.push('No users found - possible authentication issue');
        }
        
        if (collection.id === 'spaces' && collectionAudit.documentCount < 5) {
          collectionAudit.dataIssues.push('Very few root space documents - check nested structure');
        }

        auditResults.collections[collection.id] = collectionAudit;
        
      } catch (error) {
        console.error(`❌ Error auditing ${collection.id}:`, error);
        collectionAudit.dataIssues.push(`Audit failed: ${error}`);
        auditResults.collections[collection.id] = collectionAudit;
      }
    }

    auditResults.summary.totalCollections = auditResults.summary.rootCollections + auditResults.summary.nestedCollections;

    // Generate summary and recommendations
    console.log('\n📊 AUDIT SUMMARY');
    console.log('================');
    console.log(`Root Collections: ${auditResults.summary.rootCollections}`);
    console.log(`Nested Collections: ${auditResults.summary.nestedCollections}`);
    console.log(`Total Collections: ${auditResults.summary.totalCollections}`);
    console.log(`Total Documents: ${auditResults.totalDocuments}`);

    // Collection-specific insights
    console.log('\n📋 COLLECTION INSIGHTS');
    console.log('======================');
    
    Object.values(auditResults.collections).forEach((col: any) => {
      console.log(`\n${col.name}:`);
      console.log(`  Documents: ${col.documentCount}`);
      console.log(`  Schema fields: ${col.schema.fields.join(', ')}`);
      console.log(`  Subcollections: ${Object.keys(col.subcollections).join(', ') || 'None'}`);
      if (col.dataIssues.length > 0) {
        console.log(`  Issues: ${col.dataIssues.join('; ')}`);
      }
    });

    // Generate recommendations
    const recommendations = [];
    
    if (auditResults.collections.users?.documentCount === 0) {
      recommendations.push('🚨 No users found - check authentication setup');
    }
    
    if (auditResults.collections.spaces?.documentCount > 10) {
      recommendations.push('⚠️  Many root space documents - verify nested structure is working');
    }
    
    if (auditResults.totalDocuments > 1000) {
      recommendations.push('📈 Large database - consider implementing pagination and indexing strategies');
    }
    
    if (auditResults.summary.nestedCollections > auditResults.summary.rootCollections) {
      recommendations.push('✅ Good use of nested collections for hierarchical data');
    }

    recommendations.push('🔒 Review Firestore security rules for all collections');
    recommendations.push('📊 Set up monitoring for document count growth');
    recommendations.push('🗂️  Consider data archival strategy for old documents');

    auditResults.summary.recommendations = recommendations;

    console.log('\n💡 RECOMMENDATIONS');
    console.log('==================');
    recommendations.forEach(rec => console.log(rec));

    // Save detailed audit results
    const timestamp = new Date().toISOString().split('T')[0];
    const auditFile = `firestore-complete-audit-${timestamp}.json`;
    
    console.log(`\n💾 Saving detailed audit to: ${auditFile}`);
    
    // Clean up audit results for JSON
    const cleanResults = {
      ...auditResults,
      timestamp: new Date().toISOString(),
      auditType: 'complete-firestore-audit'
    };

    require('fs').writeFileSync(auditFile, JSON.stringify(cleanResults, null, 2));
    
    return auditResults;

  } catch (error) {
    console.error('❌ Audit failed:', error);
    throw error;
  }
}

// Run the complete audit
auditFirestoreCollections()
  .then(results => {
    console.log('\n✅ COMPLETE FIRESTORE AUDIT FINISHED');
    console.log('====================================');
    console.log(`📊 Audited ${results.summary.totalCollections} collections`);
    console.log(`📄 Found ${results.totalDocuments} total documents`);
    console.log(`🔍 Generated ${results.summary.recommendations.length} recommendations`);
    
    if (results.summary.dataQualityIssues.length > 0) {
      console.log(`⚠️  Found ${results.summary.dataQualityIssues.length} data quality issues`);
    }
  })
  .catch(error => {
    console.error('❌ Complete audit failed:', error);
    process.exit(1);
  });