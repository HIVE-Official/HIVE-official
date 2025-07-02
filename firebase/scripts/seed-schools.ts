import * as admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin with production credentials
const serviceAccount = {
  "type": "service_account",
  "project_id": "hive-9265c",
  "private_key_id": "ec0bb5d726967f7e6b76812ea7d27c0fec6e7b40",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCLaAxk9GpKrkJQ\n2kKVujvQSrZen4NYcOfYi/rJaAwkY62QRx+y/Q4Tt2FhBNs+0pmBZjUQeOJ21d8K\neC3neMr/EobaVp+r5xygWQFCT5923gv5TMXbmVriaByGBfAmD0n/9f96p8K+nPZS\nS2qbg4K8P0QpZAKjQyBKLagvfZKby2dDWP3p3kZdHnSx9Ijx40FY+YeAJiyJY1KJ\nAopo3cOB1NikCvmHN83bstc1OYGMoZYFbuXz9Na9dCl0LtFOVVWtpHlQdVyb83/Y\nRSo6lLJujEsKPchE83UdoEq7BZkb8B9i+buziFrZimsbZedyhW8MWaSC4IduRY3e\nPzpZ3iWXAgMBAAECggEAJCbd+/pEbEyHhxcq6FBM/aW6aIx+T9urzET0yvFQIMm2\ns3E2X8DvOx61wqazQrXzuBJs1XI77GxnNHxZDyuMnRxNW2bWbop3KoAaavtiE73e\npg6KSvoYjxlHuFvm3L/fRWEimUjTIIJtAIdtRJoUt8PCZed5JaSdRY9Ui8hJUlxJ\n1aaXB6N98kEy3w8kJcXzpvelx5BvYhdy1ECxyeHcJGUSID/pJHmlc8ST6vMiAlrX\nLg/D9AFfh7YZVe5J3d5MFGzIyT3El57eYocAS8oridLuDDag5+vjr61Vvu3c6Vok\nhu/XewK1lfdRGBXWpILukqwYoZ8U93QthDseU3EGnQKBgQC+WSu0H+Vgx0MYs37N\npkRjsmgHSKf/qEraRdSk1hMvC1IzvpPyw62ZT+0Oe42CegzHmzPPSTjc/2W0KJbO\n67YZXYyF2TLE+mo5kmYl9cy7jJjCqzX20TpSvbZfsvXFYuUmqDoiY8pWKRm44isd\nOh+wHMjoME70v1uHsILZeO2/OwKBgQC7fPUle/BkgDtl3w3B6MT19peyCpZf37//\n4osgnlPDnPwtmBRGuOTFgRXHpdsg52ImSQxbH5JTi61NZqb6LmG4SLMj1vX8QJPX\nSq2LqAfNnFD/1vkZmibISl+khLwtmXC1KBGaIIpC1AUhujxxgpiBmTUt5n9O2OwS\nuEYmSnyFVQKBgQCermOak4R6+2JZ8zjgY51bp1zFxbIXlMph0BkHGVeAvmVWsadQ\nmAPebRzoF+POQ8TnmeDFCvuWcGrul2+xLBrwZmZBJuIGB+QJ/pudRZ3ZM8odbvFb\nwuxmEbU5bk0osdrqMQ/Vn28MCNNip1jd0picDkMGHU+VBPle0q0icodwBQKBgQCW\nX/7vdZy1vvPlHSYXpO50qLe6oStC8l84iSc1nkdo2XyZxSReJOW4U3R4kNpUZcEf\nG+/BFm1yfNEfB3pdpt3RxN2JnVvmWpU5VDgljzvS+dEtoephUnZQpvZXKe8UU8FG\nS0Dy8a5zM0J6brkUAb74Ez3H9tudDfcqfIonJA8DkQKBgDNhnqp9iim9HTFmILFQ\nGWiH6GMIQN3vGK1L4NDuF48ghCcIUtUjFM3pBYQtGATLblyShHhKe0yFRCLe0UYT\nvkjJbdfnOouelva+pk+ZB240119MXs40neubiwXnBogMZQuq5h5fUZZYIxLfzeBB\naGA9slCD84H2GnNi6JoSQpbZ\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-fbsvc@hive-9265c.iam.gserviceaccount.com",
  "client_id": "113838461018237722228",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40hive-9265c.iam.gserviceaccount.com",
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