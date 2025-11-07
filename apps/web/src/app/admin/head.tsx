import { cookies } from 'next/headers';
import { verifySession } from '@/lib/session';

export default async function AdminHead() {
  const cookieStore = cookies();
  const token = cookieStore.get('hive_session')?.value;
  let csrf: string | null = null;

  if (token) {
    const session = await verifySession(token);
    if (session?.isAdmin && session.csrf) {
      csrf = session.csrf;
    }
  }

  return (
    <>
      {csrf ? <meta name="csrf-token" content={csrf} /> : null}
    </>
  );
}

