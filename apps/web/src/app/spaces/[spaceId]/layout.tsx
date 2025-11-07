import type { Metadata } from 'next';
import { SpaceSubnav } from './SpaceSubnav.client';

export const metadata: Metadata = {
  title: 'Space · HIVE',
};

export default function SpaceLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { spaceId: string };
}) {
  const { spaceId } = params;
  return (
    <div className="min-h-screen bg-black">
      <SpaceSubnav spaceId={spaceId} />
      {children}
    </div>
  );
}

