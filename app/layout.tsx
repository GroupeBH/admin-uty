import type { ReactNode } from 'react';
import { StoreProvider } from './StoreProvider';
import { AntdRegistry } from './AntdRegistry';

import './styles/globals.css';

interface Props {
  readonly children: ReactNode;
}

export const metadata = {
  title: 'Uty - Marketplace, livraison et support',
  description:
    'Plateforme publique pour presenter Uty, guider les utilisateurs et telecharger l application Android officielle.',
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
