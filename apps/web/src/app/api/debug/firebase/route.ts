import { NextResponse } from 'next/server';
import { getFirebaseAdminConfig, getFirebaseConfig } from '@hive/core';

export async function GET() {
  try {
    const clientConfig = getFirebaseConfig();
    const adminConfig = getFirebaseAdminConfig();
    
    return NextResponse.json({
      client: {
        configured: !!clientConfig,
        projectId: clientConfig?.projectId,
        authDomain: clientConfig?.authDomain,
        apiKey: clientConfig?.apiKey ? clientConfig.apiKey.substring(0, 10) + '...' : null
      },
      admin: {
        configured: !!adminConfig,
        projectId: adminConfig?.projectId,
        clientEmail: adminConfig?.clientEmail,
        hasPrivateKey: !!adminConfig?.privateKey
      },
      env: {
        NODE_ENV: process.env.NODE_ENV,
        NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID
      }
    });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}