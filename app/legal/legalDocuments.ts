import type { LegalSection } from '../components/legal/LegalDocumentPage';

export const LEGAL_UPDATED_AT = '25 juin 2026';

export const privacySections: LegalSection[] = [
  {
    id: 'responsable-du-traitement',
    title: 'Responsable du traitement',
    paragraphs: [
      'Uty est une plateforme de marketplace et de livraison exploitée par GBH SARL, établie à Kinshasa, République démocratique du Congo.',
      'Pour toute question relative à vos données personnelles, vous pouvez écrire à contact.gbh.sarl@gmail.com ou appeler le +243 831 919 710.',
    ],
  },
  {
    id: 'donnees-collectees',
    title: 'Données que nous traitons',
    paragraphs: [
      'Les données effectivement traitées dépendent des fonctions que vous utilisez dans l’application Uty.',
    ],
    bullets: [
      'Compte et identité : nom, prénom, nom d’utilisateur, numéro de téléphone, adresse e-mail, photo de profil et identifiants de connexion Google ou Apple.',
      'Vérification KYC : nom complet, type et numéro de pièce, images du recto et du verso, selfie, statut de vérification et remarques de contrôle.',
      'Marketplace : annonces, photos, descriptions, prix, catégories, préférences, favoris, boutiques, coordonnées commerciales et informations légales volontairement fournies par les vendeurs.',
      'Commandes et ventes : produits commandés, quantités, montants, devise, statut, évaluations, adresse et instructions de livraison.',
      'Localisation : position GPS, coordonnées, adresses, communes, quartiers, repères, points de retrait et trajets nécessaires aux fonctions de carte et de livraison.',
      'Communications : messages entre acheteurs, vendeurs, livreurs et support, commentaires, signalements et demandes d’assistance.',
      'Appareil et sécurité : jetons de notification, informations techniques, journaux d’erreur, données de session et éléments nécessaires à la prévention de la fraude.',
      'Fonctions optionnelles : enregistrements vocaux transmis pour créer un brouillon d’annonce, URL ou contenu produit importé, et images utilisées pour la modération ou la vérification.',
    ],
  },
  {
    id: 'utilisation-des-donnees',
    title: 'Pourquoi nous utilisons ces données',
    bullets: [
      'Créer, sécuriser et administrer votre compte.',
      'Publier des annonces, gérer une boutique et mettre en relation acheteurs et vendeurs.',
      'Créer, confirmer, suivre et documenter les commandes et les livraisons.',
      'Afficher les cartes, calculer des itinéraires et aider les livreurs à localiser les points de retrait et de remise.',
      'Vérifier l’identité des utilisateurs concernés, modérer les contenus et prévenir les abus, la fraude et les produits interdits.',
      'Envoyer les notifications liées au compte, aux commandes, aux messages et aux livraisons.',
      'Fournir le support, traiter les réclamations et améliorer la fiabilité du service.',
      'Respecter nos obligations légales et répondre aux demandes valides des autorités compétentes.',
    ],
  },
  {
    id: 'permissions-mobiles',
    title: 'Permissions de l’application',
    paragraphs: [
      'Uty demande une permission au moment où une fonction en a besoin. Vous pouvez refuser ou retirer une permission dans les réglages de votre téléphone, mais certaines fonctions peuvent alors devenir indisponibles.',
    ],
    bullets: [
      'Localisation : choix d’une adresse, géocodage, itinéraire et suivi d’une livraison.',
      'Caméra et photos : ajout d’images aux annonces, vérification d’identité et scan des QR de livraison.',
      'Notifications : réception des mises à jour de commande, de livraison, de message et de sécurité.',
    ],
  },
  {
    id: 'partage-et-prestataires',
    title: 'Destinataires et prestataires',
    paragraphs: [
      'Nous ne vendons pas vos données personnelles. Nous les partageons uniquement lorsque cela est nécessaire au service, à votre demande, ou lorsqu’une obligation légale l’impose.',
    ],
    bullets: [
      'Avec les autres participants à une transaction : les informations utiles sont visibles par l’acheteur, le vendeur ou le livreur concerné.',
      'Avec nos prestataires techniques : hébergement et stockage cloud, base de données, envoi de notifications, authentification, cartographie, géocodage, OTP et supervision technique.',
      'Avec Google/Firebase, Apple, Amazon Web Services et les services de cartographie lorsque leurs fonctions sont utilisées.',
      'Avec un prestataire d’intelligence artificielle lorsque vous lancez volontairement une transcription vocale ou une assistance à la création d’annonce.',
      'Avec les autorités, conseils ou partenaires habilités lorsqu’une demande légale, une enquête de fraude ou la protection des personnes l’exige.',
    ],
  },
  {
    id: 'transferts-internationaux',
    title: 'Hébergement et transferts',
    paragraphs: [
      'Certains prestataires peuvent héberger ou traiter des données en dehors de la République démocratique du Congo. Dans ce cas, nous cherchons à limiter les données transférées et à utiliser des prestataires offrant des garanties de sécurité et de confidentialité adaptées.',
    ],
  },
  {
    id: 'conservation',
    title: 'Durée de conservation',
    paragraphs: [
      'Nous conservons les données pendant la durée nécessaire au fonctionnement du compte et aux finalités décrites ci-dessus. Les durées peuvent être prolongées lorsqu’un litige, une obligation comptable, la prévention de la fraude ou une exigence légale le justifie.',
      'Lors de la suppression du compte, les informations directement identifiantes du profil, les jetons de connexion, la localisation et les données KYC sont supprimés ou dissociés du compte. Certains historiques de commande, de livraison, de modération ou de transaction peuvent être conservés sous une forme limitée ou pseudonymisée afin de protéger les autres utilisateurs et respecter nos obligations.',
    ],
  },
  {
    id: 'securite',
    title: 'Sécurité',
    paragraphs: [
      'Nous utilisons des mesures techniques et organisationnelles destinées à protéger les données contre l’accès non autorisé, la perte, l’altération ou la divulgation. Cela comprend notamment le contrôle des accès, le chiffrement des échanges lorsque le service est utilisé en HTTPS, la protection des secrets d’authentification et la journalisation de sécurité.',
      'Aucun système n’étant totalement exempt de risque, nous vous recommandons de protéger votre téléphone, votre code PIN et vos moyens de connexion.',
    ],
  },
  {
    id: 'vos-droits',
    title: 'Vos droits',
    paragraphs: [
      'Sous réserve des conditions prévues par la législation applicable, vous pouvez demander l’accès à vos données, leur correction, leur suppression, la limitation de certains traitements, vous opposer à certains usages ou retirer un consentement précédemment donné.',
      'Vous pouvez modifier plusieurs informations directement dans l’application. Pour une demande plus large, contactez-nous en indiquant le numéro de téléphone ou l’adresse e-mail liés au compte. Une vérification d’identité peut être demandée avant de répondre.',
    ],
  },
  {
    id: 'suppression-du-compte',
    title: 'Suppression du compte',
    paragraphs: [
      'Dans l’application : ouvrez Profil, puis Paramètres, Données et « Supprimer mon compte ». Après confirmation, le compte est désactivé et ses données directement identifiantes sont supprimées ou anonymisées.',
      'Hors de l’application : envoyez une demande à contact.gbh.sarl@gmail.com avec l’objet « Suppression de mon compte Uty » et le numéro de téléphone associé. Nous pourrons vous demander de confirmer que vous êtes bien titulaire du compte.',
    ],
  },
  {
    id: 'mineurs',
    title: 'Protection des mineurs',
    paragraphs: [
      'Uty n’est pas destiné aux enfants qui ne disposent pas de la capacité légale nécessaire pour conclure une transaction. Un mineur doit utiliser le service sous la responsabilité de son représentant légal. Si vous pensez qu’un enfant nous a transmis des données sans autorisation appropriée, contactez-nous.',
    ],
  },
  {
    id: 'modifications',
    title: 'Modification de la politique',
    paragraphs: [
      'Nous pouvons mettre à jour cette politique lorsque le service, nos prestataires ou les règles applicables évoluent. La date affichée en haut de la page indique la version en vigueur. Une information supplémentaire pourra être affichée dans l’application en cas de changement important.',
    ],
  },
];

export const termsSections: LegalSection[] = [
  {
    id: 'objet',
    title: 'Objet et acceptation',
    paragraphs: [
      'Les présentes conditions encadrent l’accès à Uty, une plateforme mobile et web permettant notamment de consulter et publier des annonces, gérer une boutique, échanger des messages, passer des commandes et organiser des livraisons.',
      'En créant un compte ou en utilisant Uty, vous acceptez ces conditions et la Politique de confidentialité. Si vous n’acceptez pas ces documents, vous ne devez pas utiliser le service.',
    ],
  },
  {
    id: 'operateur',
    title: 'Opérateur du service',
    paragraphs: [
      'Uty est exploité par GBH SARL, établie à Kinshasa, République démocratique du Congo. Le support est joignable à contact.gbh.sarl@gmail.com et au +243 831 919 710.',
    ],
  },
  {
    id: 'eligibilite',
    title: 'Éligibilité et compte',
    bullets: [
      'Vous devez disposer de la capacité légale nécessaire ou agir avec l’autorisation de votre représentant légal.',
      'Les informations fournies doivent être exactes, actuelles et ne pas usurper l’identité d’un tiers.',
      'Vous êtes responsable de la confidentialité de votre téléphone, de votre code PIN et de vos moyens d’authentification.',
      'Vous devez nous prévenir rapidement si vous suspectez un accès non autorisé à votre compte.',
    ],
  },
  {
    id: 'role-uty',
    title: 'Rôle de la plateforme',
    paragraphs: [
      'Uty facilite la mise en relation entre acheteurs, vendeurs et livreurs. Sauf indication explicite contraire sur une offre, GBH SARL n’est ni le vendeur ni le fabricant des produits publiés par les utilisateurs.',
      'Le contrat de vente est conclu entre l’acheteur et le vendeur concerné. Chaque vendeur reste responsable de la description, de la disponibilité, de la conformité, de la licéité, du prix et des garanties applicables à ses produits.',
    ],
  },
  {
    id: 'annonces',
    title: 'Annonces, boutiques et contenus',
    bullets: [
      'Une annonce doit décrire fidèlement le produit, son état, son prix, sa localisation et les conditions utiles à l’acheteur.',
      'Vous devez détenir les droits nécessaires sur les textes, marques, photos et autres contenus publiés.',
      'Les contenus trompeurs, frauduleux, dangereux, contrefaits, illicites ou portant atteinte aux droits d’autrui sont interdits.',
      'Uty peut contrôler, masquer, refuser ou supprimer un contenu et demander des justificatifs lorsque cela est nécessaire à la sécurité ou au respect des règles.',
    ],
  },
  {
    id: 'verification',
    title: 'Vérification des vendeurs et livreurs',
    paragraphs: [
      'Certaines fonctions peuvent nécessiter une vérification d’identité, de boutique, de véhicule ou de documents. Une validation par Uty confirme uniquement que les éléments demandés ont été examinés; elle ne constitue pas une garantie générale de solvabilité, de qualité ou de bonne exécution future.',
    ],
  },
  {
    id: 'commandes',
    title: 'Commandes, paiements et livraison',
    paragraphs: [
      'Les commandes sont soumises aux Conditions de vente affichées sur le service. Le prix, la devise, les frais et le mode de paiement applicables sont ceux présentés avant validation.',
      'Les utilisateurs doivent communiquer de bonne foi, fournir une adresse et un numéro joignable, vérifier les informations de commande et respecter les étapes de remise ou de scan prévues par l’application.',
    ],
  },
  {
    id: 'communications',
    title: 'Messagerie et comportement',
    bullets: [
      'La messagerie doit être utilisée pour la transaction, la livraison ou l’assistance.',
      'Le harcèlement, les menaces, la discrimination, les contenus sexuels non sollicités, le spam et les tentatives de fraude sont interdits.',
      'Il est interdit de contourner les mesures de sécurité, d’extraire massivement les données ou de perturber le fonctionnement du service.',
      'Les utilisateurs peuvent signaler un contenu ou un comportement au support.',
    ],
  },
  {
    id: 'licence-contenu',
    title: 'Licence sur les contenus publiés',
    paragraphs: [
      'Vous restez propriétaire de vos contenus. Vous accordez toutefois à Uty une autorisation non exclusive, mondiale et gratuite d’héberger, reproduire, adapter au format technique, afficher et distribuer ces contenus uniquement pour exploiter, promouvoir et sécuriser le service.',
      'Cette autorisation prend fin lorsque le contenu est supprimé, sous réserve des copies techniques temporaires, des sauvegardes et des éléments qui doivent être conservés pour une transaction, un litige ou une obligation légale.',
    ],
  },
  {
    id: 'suspension',
    title: 'Suspension et suppression',
    paragraphs: [
      'Uty peut limiter, suspendre ou fermer un compte en cas de fraude présumée, risque pour la sécurité, violation de ces conditions, obligations légales ou atteinte aux autres utilisateurs. Lorsque la situation le permet, l’utilisateur peut contacter le support pour demander des explications ou présenter des observations.',
      'Vous pouvez supprimer votre compte depuis les Paramètres de l’application. Certaines données liées aux commandes, livraisons, litiges et obligations légales peuvent rester conservées sous une forme limitée ou anonymisée.',
    ],
  },
  {
    id: 'disponibilite',
    title: 'Disponibilité du service',
    paragraphs: [
      'Nous cherchons à maintenir Uty accessible et fiable, sans garantir une disponibilité permanente ni l’absence totale d’erreurs. Des interruptions peuvent survenir pour maintenance, sécurité, réseau, mise à jour ou événement indépendant de notre volonté.',
      'Les cartes, itinéraires, estimations et contenus générés automatiquement sont des aides. Les utilisateurs doivent vérifier les informations importantes avant de prendre une décision ou de se déplacer.',
    ],
  },
  {
    id: 'responsabilite',
    title: 'Responsabilité',
    paragraphs: [
      'Chaque utilisateur reste responsable de ses actes, de ses contenus, de ses produits et de ses engagements envers les autres utilisateurs. Uty n’est pas responsable d’une information inexacte publiée par un utilisateur, d’un défaut caché, d’une indisponibilité d’un produit ou d’un accord conclu en dehors des fonctions prévues par la plateforme.',
      'Aucune clause des présentes conditions n’exclut une responsabilité qui ne peut pas être exclue par la loi applicable.',
    ],
  },
  {
    id: 'propriete-intellectuelle',
    title: 'Propriété intellectuelle',
    paragraphs: [
      'Le nom Uty, son identité visuelle, le logiciel, les interfaces et les éléments fournis par GBH SARL sont protégés. Ils ne peuvent pas être copiés, modifiés, revendus ou exploités sans autorisation, sauf usage normal du service.',
    ],
  },
  {
    id: 'droit-applicable',
    title: 'Droit applicable et litiges',
    paragraphs: [
      'Les présentes conditions sont régies par le droit de la République démocratique du Congo, notamment les règles applicables aux services numériques, aux contrats électroniques et aux transactions commerciales.',
      'En cas de difficulté, l’utilisateur doit d’abord contacter le support afin de rechercher une solution amiable. À défaut d’accord, le litige relève des juridictions compétentes conformément aux règles applicables, sans priver un consommateur des protections impératives dont il bénéficie.',
    ],
  },
  {
    id: 'modifications',
    title: 'Évolution des conditions',
    paragraphs: [
      'Nous pouvons modifier ces conditions pour tenir compte de l’évolution du service, de la sécurité ou du droit applicable. La version en vigueur est celle publiée sur cette page. Une notification pourra être affichée dans l’application lorsqu’un changement important nécessite votre attention.',
    ],
  },
];

export const salesSections: LegalSection[] = [
  {
    id: 'champ-application',
    title: 'Champ d’application',
    paragraphs: [
      'Les présentes Conditions de vente s’appliquent aux commandes de produits et aux services de livraison organisés au moyen de Uty. Elles complètent les Conditions d’utilisation.',
      'Lorsqu’un vendeur professionnel publie ses propres conditions particulières, celles-ci s’appliquent à la vente concernée à condition d’être accessibles avant la commande et de ne pas réduire les droits impératifs de l’acheteur.',
    ],
  },
  {
    id: 'parties',
    title: 'Parties à la vente',
    paragraphs: [
      'Le vendeur identifié sur l’annonce vend le produit à l’acheteur. Sauf mention explicite « vendu par Uty » ou « vendu par GBH SARL », Uty intervient comme plateforme de mise en relation et, selon le cas, comme facilitateur de livraison.',
      'Le vendeur doit communiquer une identité et des coordonnées exactes. Un vendeur professionnel reste responsable de ses obligations commerciales, fiscales, administratives et de garantie.',
    ],
  },
  {
    id: 'information-produit',
    title: 'Produits et informations précontractuelles',
    bullets: [
      'Le vendeur doit indiquer les caractéristiques essentielles, l’état réel, les défauts connus, le prix, la devise, la disponibilité et les conditions de remise.',
      'Les photographies doivent représenter le produit proposé. De légères différences d’affichage peuvent exister selon l’écran.',
      'L’acheteur doit lire l’annonce, poser ses questions et vérifier les éléments importants avant de commander.',
      'Uty peut retirer une offre incomplète, trompeuse, interdite ou présentant un risque pour les utilisateurs.',
    ],
  },
  {
    id: 'prix',
    title: 'Prix, devise et frais',
    paragraphs: [
      'Le prix du produit est celui affiché lors de la validation de la commande, dans la devise indiquée. Les frais de livraison, taxes ou autres frais applicables sont affichés séparément lorsqu’ils peuvent être calculés.',
      'Lorsqu’un coût exact dépend du trajet, du poids, de l’adresse ou d’un accord avec le vendeur ou le livreur, l’application peut afficher une estimation ou indiquer qu’une confirmation est nécessaire avant l’exécution.',
    ],
  },
  {
    id: 'commande',
    title: 'Formation de la commande',
    paragraphs: [
      'L’acheteur sélectionne les produits, vérifie le récapitulatif, renseigne l’adresse et confirme la commande. La réception technique de la commande par Uty ne garantit pas encore la disponibilité du produit.',
      'La vente devient ferme lorsque le vendeur confirme la commande ou commence son exécution. Le vendeur peut refuser ou annuler une commande en cas d’indisponibilité, erreur manifeste de prix, impossibilité de livraison, suspicion de fraude ou motif légitime.',
    ],
  },
  {
    id: 'paiement',
    title: 'Paiement',
    paragraphs: [
      'Le paiement à la livraison est le mode recommandé et activé par défaut lorsque l’application l’indique. L’acheteur paie au moment et selon les modalités convenues avec le vendeur ou le livreur.',
      'D’autres moyens de paiement ne s’appliquent que lorsqu’ils sont expressément activés et présentés dans l’application. L’acheteur ne doit pas envoyer d’argent vers un compte ou un numéro qui ne correspond pas aux instructions convenues dans le parcours de commande.',
    ],
  },
  {
    id: 'livraison',
    title: 'Livraison',
    bullets: [
      'L’acheteur doit fournir une adresse, un repère et un numéro joignable suffisamment précis.',
      'Le vendeur doit préparer un produit conforme à l’annonce et le remettre selon le parcours prévu.',
      'Les délais et itinéraires sont estimatifs lorsqu’ils dépendent du trafic, de la météo, de la disponibilité du livreur, du réseau ou d’autres contraintes locales.',
      'Des frais supplémentaires ne peuvent être ajoutés qu’après information et accord de l’acheteur.',
      'Le scan d’un QR ou la confirmation dans l’application peut être utilisé pour documenter la prise en charge et la remise.',
    ],
  },
  {
    id: 'reception',
    title: 'Réception et vérification',
    paragraphs: [
      'Lorsque la nature du produit et les conditions de remise le permettent, l’acheteur doit vérifier l’identité du produit, son état apparent, la quantité et les accessoires avant de confirmer la réception ou d’effectuer le paiement.',
      'Une anomalie doit être signalée rapidement au vendeur et au support Uty, avec les preuves utiles telles que photos, messages, référence de commande et description du problème.',
    ],
  },
  {
    id: 'annulation',
    title: 'Annulation',
    paragraphs: [
      'L’acheteur qui souhaite annuler doit contacter rapidement le vendeur ou le support. Une annulation est généralement possible avant la préparation ou l’expédition, sous réserve du statut de la commande et des frais déjà raisonnablement engagés.',
      'Le vendeur peut annuler pour indisponibilité ou impossibilité d’exécution, mais doit en informer l’acheteur sans délai inutile. Les droits d’annulation ou de rétractation prévus impérativement par la loi applicable restent réservés.',
    ],
  },
  {
    id: 'retours',
    title: 'Retours, non-conformité et garanties',
    paragraphs: [
      'Le vendeur est responsable de la conformité du produit à sa description et des garanties légales qui lui sont applicables. Les conditions de retour peuvent varier selon la qualité du vendeur, la nature du produit, son état, les règles annoncées avant la commande et le droit applicable.',
      'Un produit utilisé, endommagé après la remise, personnalisé, périssable ou dont le retour pose un risque d’hygiène peut faire l’objet de restrictions lorsque la loi le permet. Uty peut faciliter les échanges et l’examen des preuves sans se substituer automatiquement au vendeur.',
    ],
  },
  {
    id: 'remboursements',
    title: 'Remboursements',
    paragraphs: [
      'Lorsqu’un remboursement est dû, ses modalités dépendent du moyen de paiement utilisé et de l’accord ou de la décision applicable au litige. Pour un paiement à la livraison non encore effectué, l’annulation met normalement fin à l’obligation de paiement, sous réserve de frais de livraison déjà engagés et acceptés.',
      'Aucun remboursement ne doit être envoyé vers un compte différent sans vérification suffisante de l’identité du bénéficiaire.',
    ],
  },
  {
    id: 'produits-interdits',
    title: 'Produits interdits',
    paragraphs: [
      'Il est interdit de vendre au moyen de Uty tout produit illicite, volé, contrefait, dangereux, réglementé sans autorisation, ou portant atteinte à la sécurité, à la dignité ou aux droits d’autrui. Uty peut retirer l’annonce, suspendre le compte et coopérer avec les autorités compétentes.',
    ],
  },
  {
    id: 'reclamations',
    title: 'Réclamations et litiges',
    paragraphs: [
      'L’acheteur et le vendeur doivent d’abord conserver les échanges dans la messagerie Uty et rechercher une solution de bonne foi. Le support peut demander des photos, documents, scans de livraison, historiques ou autres preuves utiles.',
      'Si aucune solution amiable n’est trouvée, chaque partie conserve le droit de saisir l’autorité ou la juridiction compétente selon le droit de la République démocratique du Congo et les règles impératives applicables au consommateur.',
    ],
  },
  {
    id: 'force-majeure',
    title: 'Événements indépendants de notre volonté',
    paragraphs: [
      'Aucune partie n’est responsable d’un retard ou d’une inexécution causés par un événement qu’elle ne pouvait raisonnablement prévoir ou éviter, notamment panne majeure, coupure de réseau, catastrophe, troubles, décision d’autorité ou impossibilité générale de transport. La partie concernée doit informer les autres dès que possible.',
    ],
  },
  {
    id: 'contact',
    title: 'Contact',
    paragraphs: [
      'Pour toute question sur une commande ou une livraison, utilisez la messagerie de l’application ou contactez contact.gbh.sarl@gmail.com / +243 831 919 710 en indiquant la référence concernée.',
    ],
  },
];
