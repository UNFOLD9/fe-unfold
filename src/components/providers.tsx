'use client';

import { ReactNode } from 'react';
import { ReactLenis } from 'lenis/react';
import { AuthProvider } from '@/context/AuthContext';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      <ReactLenis root options={{ anchors: true }} />
      <AuthProvider>{children}</AuthProvider>
    </>
  );
}
