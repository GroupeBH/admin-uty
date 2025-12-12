# Guide de Contribution - UTY Admin

Merci de votre intérêt pour contribuer à UTY Admin ! Ce document vous guide à travers le processus de contribution.

## 📋 Table des matières

- [Code de conduite](#code-de-conduite)
- [Comment contribuer](#comment-contribuer)
- [Standards de code](#standards-de-code)
- [Process de Pull Request](#process-de-pull-request)
- [Structure du projet](#structure-du-projet)

## 🤝 Code de conduite

En participant à ce projet, vous acceptez de respecter notre code de conduite :

- Être respectueux et professionnel
- Accepter les critiques constructives
- Se concentrer sur ce qui est meilleur pour la communauté
- Montrer de l'empathie envers les autres

## 🚀 Comment contribuer

### Signaler un bug

Si vous trouvez un bug :

1. Vérifiez qu'il n'a pas déjà été signalé dans les [Issues](https://github.com/votre-org/uty-admin/issues)
2. Ouvrez une nouvelle issue avec :
   - Un titre clair et descriptif
   - Les étapes pour reproduire le bug
   - Le comportement attendu vs le comportement actuel
   - Captures d'écran si pertinent
   - Votre environnement (OS, navigateur, version Node)

### Suggérer une fonctionnalité

Pour proposer une nouvelle fonctionnalité :

1. Ouvrez une issue avec le label "enhancement"
2. Décrivez clairement la fonctionnalité
3. Expliquez pourquoi elle serait utile
4. Si possible, proposez une implémentation

### Contribuer au code

1. **Fork le repository**

```bash
git clone https://github.com/votre-username/uty-admin.git
cd uty-admin
```

2. **Créer une branche**

```bash
git checkout -b feature/ma-nouvelle-fonctionnalite
# ou
git checkout -b fix/correction-bug
```

3. **Installer les dépendances**

```bash
npm install
```

4. **Faire vos modifications**

- Suivez les [standards de code](#standards-de-code)
- Ajoutez des tests si nécessaire
- Mettez à jour la documentation

5. **Tester vos modifications**

```bash
npm run dev
# Tester manuellement l'application
```

6. **Commit vos changements**

Utilisez des messages de commit clairs :

```bash
git commit -m "feat: ajout de la fonctionnalité X"
git commit -m "fix: correction du bug Y"
git commit -m "docs: mise à jour du README"
```

Format des commits :
- `feat:` Nouvelle fonctionnalité
- `fix:` Correction de bug
- `docs:` Documentation
- `style:` Formatage, points-virgules manquants, etc.
- `refactor:` Refactorisation du code
- `test:` Ajout de tests
- `chore:` Maintenance

7. **Push vers votre fork**

```bash
git push origin feature/ma-nouvelle-fonctionnalite
```

8. **Ouvrir une Pull Request**

## 📝 Standards de code

### TypeScript

- Utilisez TypeScript strict
- Définissez des types explicites
- Évitez `any` autant que possible
- Utilisez des interfaces pour les objets complexes

```typescript
// ✅ Bon
interface User {
  id: string;
  name: string;
}

function getUser(id: string): User {
  // ...
}

// ❌ Mauvais
function getUser(id: any): any {
  // ...
}
```

### React

- Utilisez des composants fonctionnels
- Utilisez des hooks plutôt que les classes
- Préférez la composition à l'héritage
- Nommez les composants en PascalCase

```typescript
// ✅ Bon
export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="user-card">
      {/* ... */}
    </div>
  );
};

// ❌ Mauvais
export default function usercard(props) {
  // ...
}
```

### Styling

- Utilisez Tailwind CSS pour le styling
- Évitez les styles inline
- Utilisez les classes utilitaires Tailwind
- Pour les composants réutilisables, utilisez des classes dans globals.css

```tsx
// ✅ Bon
<div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
  {/* ... */}
</div>

// ❌ Mauvais
<div style={{ display: 'flex', padding: '16px' }}>
  {/* ... */}
</div>
```

### Redux

- Utilisez RTK Query pour les appels API
- Créez des slices séparés pour chaque domaine
- Utilisez les hooks Redux typés

```typescript
// ✅ Bon
const user = useAppSelector((state) => state.auth.user);
const dispatch = useAppDispatch();

// ❌ Mauvais
const user = useSelector((state: any) => state.auth.user);
```

### Nomenclature

- **Fichiers** : PascalCase pour les composants, camelCase pour les utilitaires
  - `UserCard.tsx`
  - `api.ts`
  - `useAuth.ts`

- **Variables** : camelCase
  - `const userName = "John";`
  - `const isAuthenticated = true;`

- **Constantes** : SCREAMING_SNAKE_CASE
  - `const API_URL = "...";`
  - `const MAX_RETRIES = 3;`

- **Types/Interfaces** : PascalCase
  - `interface User { }`
  - `type UserRole = "ADMIN" | "USER";`

### Documentation

- Ajoutez des commentaires pour la logique complexe
- Documentez les fonctions publiques
- Mettez à jour le README si nécessaire

```typescript
/**
 * Calculate the total price of items in cart
 * @param items - Array of cart items
 * @returns Total price including tax
 */
function calculateTotal(items: CartItem[]): number {
  // ...
}
```

## 🔄 Process de Pull Request

### Avant de soumettre

- [ ] Le code compile sans erreur
- [ ] Les tests passent (si applicable)
- [ ] Le code suit les standards de style
- [ ] La documentation est à jour
- [ ] Les commits sont propres et descriptifs

### Template PR

Utilisez ce template pour vos PRs :

```markdown
## Description
Brief description of changes

## Type de changement
- [ ] Bug fix
- [ ] Nouvelle fonctionnalité
- [ ] Breaking change
- [ ] Documentation

## Comment tester
Steps to test the changes

## Screenshots (si applicable)
Add screenshots here

## Checklist
- [ ] Mon code suit le style du projet
- [ ] J'ai testé mes modifications
- [ ] J'ai mis à jour la documentation
- [ ] Mes commits sont propres
```

### Review process

1. Un mainteneur review votre PR
2. Des modifications peuvent être demandées
3. Une fois approuvée, votre PR sera merge
4. Votre contribution sera créditée dans les release notes

## 🏗️ Structure du projet

```
uty-admin/
├── app/
│   ├── components/
│   │   ├── common/          # Composants réutilisables
│   │   └── layout/          # Layout components
│   ├── dashboard/           # Pages du dashboard
│   ├── login/               # Page de login
│   ├── layout.tsx           # Root layout
│   └── styles/              # Styles globaux
├── lib/
│   ├── features/            # Redux slices
│   ├── services/            # RTK Query APIs
│   ├── types/               # TypeScript types
│   └── utils/               # Fonctions utilitaires
├── public/                  # Assets statiques
└── docs/                    # Documentation additionnelle
```

### Où ajouter du code

- **Nouveau composant UI** → `app/components/common/`
- **Nouvelle page** → `app/dashboard/[nom-page]/`
- **Nouvelle feature Redux** → `lib/features/[nom-feature]/`
- **Nouvel endpoint API** → `lib/services/api.ts`
- **Nouveau type** → `lib/types/index.ts`
- **Nouvelle fonction utilitaire** → `lib/utils/`

## 🧪 Tests

### Ajouter des tests

Nous encourageons l'ajout de tests pour les nouvelles fonctionnalités :

```typescript
// UserCard.test.tsx
import { render, screen } from '@testing-library/react';
import { UserCard } from './UserCard';

describe('UserCard', () => {
  it('displays user name', () => {
    const user = { id: '1', name: 'John Doe' };
    render(<UserCard user={user} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});
```

### Lancer les tests

```bash
npm test
```

## 📚 Ressources

- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation Redux Toolkit](https://redux-toolkit.js.org/)
- [Documentation Tailwind CSS](https://tailwindcss.com/docs)
- [Documentation Ant Design](https://ant.design/)
- [Guide TypeScript](https://www.typescriptlang.org/docs/)

## ❓ Questions

Si vous avez des questions :

1. Consultez la [documentation](./README.md)
2. Cherchez dans les [issues existantes](https://github.com/votre-org/uty-admin/issues)
3. Ouvrez une nouvelle issue avec le label "question"

## 🙏 Remerciements

Merci de contribuer à UTY Admin ! Chaque contribution, petite ou grande, est appréciée. 🎉

---

Happy coding! 💻

