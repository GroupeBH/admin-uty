import type { ReactNode } from 'react';
import { StoreProvider } from './StoreProvider';
import { AntdRegistry } from './AntdRegistry';

import './styles/globals.css';

interface Props {
  readonly children: ReactNode;
}

export const metadata = {
  title: 'UTY Admin - Interface d\'administration',
  description: 'Interface d\'administration complète pour la plateforme UTY',
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="fr">
      <body suppressHydrationWarning>
        <StoreProvider>
          <AntdRegistry>{children}</AntdRegistry>
        </StoreProvider>
      </body>
    </html>
  );
}
