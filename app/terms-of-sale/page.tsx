import type { Metadata } from 'next';
import LegalDocumentPage from '../components/legal/LegalDocumentPage';
import { LEGAL_UPDATED_AT, salesSections } from '../legal/legalDocuments';

export const metadata: Metadata = {
  title: 'Conditions de vente | Uty',
  description:
    'Conditions applicables aux commandes, paiements, livraisons, annulations, retours et réclamations sur Uty.',
};

export default function SalesTermsPage() {
  return (
    <LegalDocumentPage
      eyebrow="Achats et ventes"
      title="Conditions de vente"
      summary="Le cadre applicable aux commandes passées sur Uty : rôle du vendeur, prix, paiement, livraison, réception, annulation et traitement des réclamations."
      updatedAt={LEGAL_UPDATED_AT}
      sections={salesSections}
    />
  );
}
