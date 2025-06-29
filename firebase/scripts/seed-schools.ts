import * as admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin with production credentials
const serviceAccount = {
  "type": "service_account",
  "project_id": "hive-9265c",
  "private_key_id": "28a032e9a3b2d3175ed48fa6466d17aa346fa836",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC4UGxOthaf690H\nfo1Q8JKMQZNrj1MKCVf8n19xLQE5u1gvuBuA3HQj4r4bC7J6tGUPtooUU0pttBST\nRSi6IcQuZdNE8NLLAYeKBfICeLE3Ht+RQss6WCqs/MboK1gFyNMtKBhcu2bissqE\n55L2BR5hxiMRvsZHu7K92Xhc8Sb1wK6OgccqvOwnGEgWPdbsVcFthXcpfRXT+j/t\nXeY1FyZQspEc13RfAOLpambXam0IneaWDR0wlyEF5nsmLaNZaSdWEklOnM6AG9Q8\n0kpEtwALAMePXL0Cmb054vb8NwvX4iarzwGxrOK7f/pSYynz2WnXgpiSbmgC3q0n\nI1APP6x5AgMBAAECggEAPSl232G+PUBEHu4IT/Ec+Ez0cg9kA2MZXvu17LT+AJ3i\nBCfIfKjrI1NlOU1W4zAEj0PIKzl+a8wDveEHxEhbNPhWNLzjfjkaNJuHdPl++ScW\nEjqDfO9v7eqNyNJFSdob9ZKmDvOjDxw8ZwD/fAMz00cwMP3JB1nKVQSa0+C0SH0f\n9MKGGs0DvmharQrfX6eaCkbSFNCXjCb5S+EPutSIDZ5R2RX/aBY+PPaD8tSFzzTc\n9/l9axB0/jilyiI58NpHB1qcW8TUbS5CuelRnzo5lBVEqdG3O83EQb3vnl49k/f6\niDpUz5GtrPOFDe67uUWNql1Qfq+qnbJ52KTp9rHBHwKBgQD6LIQn8U6O+rZ7ap3M\nouEl+5Qf6IVcEaFnALJZ/IaFzwcJAsY6W3ZkOLjV+sD8iMGItZjLMO/cIk0656sE\npyQHBN6N2jNPQiaG8TQz/VRUImoN9T6V+e76/UDOiNnNVAD68V63Q4Be0uaY9uKn\nIu4nd57Qc/XZ3QEtdt5ZpN2kawKBgQC8m0PYpEkDN3s7E4OAUbIg5M3yGZcPWL00\no0JPPXn5Yp5QDBWonhe8pZuYcE/N0Kh7XcAYMbgK8qKRZLPb7Lr+zuPpzmoeXlzk\nVsU9ELbzneCHemOjilpw+PB4JtPrPEXnt1gnJAOGLdAloSsE1PcRGaTOVxn/VQnO\nWxmJTfbLqwKBgQDuLRec13YNVdAJ69VUD/X+rWe2gS8GGprpb5ZdabfBCPsPrx5+\nTLmIbSA8SEEXrDNlLk7LlEmn8NhKLml5Qo9gR1iDAKw81yPK8TTcEmEIwMLriwMM\n0iiduCLM/yks/L76KnYcUB2VKYD1PIdIzE6kMJR4rQ3xXyFR4YuLGRUTBQKBgFGK\nlyScsmxPmlmKMDpUF70c7uUSpzqdVP/i7ZIwtAFb37If52VFJGIM/15CgF4tLgpY\nF+rd5AHnsN1HOnOEv7vWWrcE5OBIT8TwtsmV5mMhCKfKBDX6ZOue1Og9cTWsk1SA\n8f3KFjP2rpz2NxEZuc+M1LHY+oZnj5vFyx6PtHmNAoGAHPYxH8uz3KyDvb+NUGop\n0BAVwWDkQf35sI7AM9vWeRYdBlXTM6Isfom1TurDjtlwgsH2r2T8R2m5hNiTzrDX\noXMeKEbFRPxXB1xj+n6d+8PzE8lzfET+RsgwIu0Kvq2DcvgGCybfby7Mz8xLeqVL\nZeUApdcW7R6HzoMWgm+Xliw=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-883ue@hive-9265c.iam.gserviceaccount.com",
  "client_id": "117225327050770874702",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-883ue%40hive-9265c.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
});

const db = getFirestore();

interface School {
  id: string;
  name: string;
  domain: string;
  status: 'active' | 'waitlist';
  waitlistCount: number;
  location: {
    city: string;
    state: string;
    country: string;
  };
  colors: {
    primary: string;
    secondary: string;
  };
}

const schools: School[] = [
  {
    id: 'ub',
    name: 'University at Buffalo',
    domain: 'buffalo.edu',
    status: 'active',
    waitlistCount: 0,
    location: {
      city: 'Buffalo',
      state: 'NY',
      country: 'USA'
    },
    colors: {
      primary: '#005BBB',
      secondary: '#FFD700'
    }
  },
  {
    id: 'cornell',
    name: 'Cornell University',
    domain: 'cornell.edu',
    status: 'waitlist',
    waitlistCount: 127,
    location: {
      city: 'Ithaca',
      state: 'NY',
      country: 'USA'
    },
    colors: {
      primary: '#B31B1B',
      secondary: '#FFFFFF'
    }
  },
  {
    id: 'columbia',
    name: 'Columbia University',
    domain: 'columbia.edu',
    status: 'waitlist',
    waitlistCount: 89,
    location: {
      city: 'New York',
      state: 'NY',
      country: 'USA'
    },
    colors: {
      primary: '#B9D9EB',
      secondary: '#FFFFFF'
    }
  },
  {
    id: 'nyu',
    name: 'New York University',
    domain: 'nyu.edu',
    status: 'waitlist',
    waitlistCount: 156,
    location: {
      city: 'New York',
      state: 'NY',
      country: 'USA'
    },
    colors: {
      primary: '#57068C',
      secondary: '#FFFFFF'
    }
  },
  {
    id: 'rit',
    name: 'Rochester Institute of Technology',
    domain: 'rit.edu',
    status: 'waitlist',
    waitlistCount: 73,
    location: {
      city: 'Rochester',
      state: 'NY',
      country: 'USA'
    },
    colors: {
      primary: '#F76902',
      secondary: '#513127'
    }
  }
];

async function seedSchools() {
  console.log('🏫 Seeding schools...');
  const batch = db.batch();

  for (const school of schools) {
    const schoolRef = db.collection('schools').doc(school.id);
    batch.set(schoolRef, {
      ...school,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
  }

  try {
    await batch.commit();
    console.log('✅ Successfully seeded schools');
  } catch (error) {
    console.error('❌ Error seeding schools:', error);
    process.exit(1);
  }
}

// Run the seeding
seedSchools().then(() => process.exit(0)); 