import type { Metadata } from 'next';
import LegalDocumentPage from '../components/legal/LegalDocumentPage';
import { LEGAL_UPDATED_AT, privacySections } from '../legal/legalDocuments';

export const metadata: Metadata = {
  title: 'Politique de confidentialité | Uty',
  description:
    'Politique de confidentialité de Uty : données collectées, usages, prestataires, sécurité et suppression du compte.',
};

export default function PrivacyPolicyPage() {
  return (
    <LegalDocumentPage
      eyebrow="Vos données"
      title="Politique de confidentialité"
      summary="Ce document explique quelles données Uty traite, pourquoi elles sont utilisées, avec qui elles peuvent être partagées et comment exercer vos droits."
      updatedAt={LEGAL_UPDATED_AT}
      sections={privacySections}
    />
  );
}
