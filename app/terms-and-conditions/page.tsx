import type { Metadata } from 'next';
import LegalDocumentPage from '../components/legal/LegalDocumentPage';
import { LEGAL_UPDATED_AT, termsSections } from '../legal/legalDocuments';

export const metadata: Metadata = {
  title: "Conditions d'utilisation | Uty",
  description:
    "Conditions d'utilisation de la plateforme Uty pour les acheteurs, vendeurs et livreurs.",
};

export default function TermsPage() {
  return (
    <LegalDocumentPage
      eyebrow="Règles du service"
      title="Conditions d’utilisation"
      summary="Les règles essentielles pour utiliser Uty, publier, acheter, vendre, communiquer et organiser une livraison dans de bonnes conditions."
      updatedAt={LEGAL_UPDATED_AT}
      sections={termsSections}
    />
  );
}
