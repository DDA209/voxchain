_Readme généré par IA_ ✨

# 🖥️ VoxChain — Frontend

> Interface utilisateur de la Dapp de vote décentralisée VoxChain.
> Pour une vue d'ensemble du projet, consultez le [README principal](../../README.md).

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![Wagmi](https://img.shields.io/badge/Wagmi-v3-black)](https://wagmi.sh/)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)

---

## 📋 Table des matières

- [Stack Technique](#-stack-technique)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Lancement](#-lancement)
- [Fonctionnalités](#-fonctionnalités)
- [Internationalisation](#-internationalisation)
- [Build Production](#-build-production)

---

## 🛠️ Stack Technique

| Technologie  | Version | Rôle                             |
| ------------ | ------- | -------------------------------- |
| Next.js      | 16      | Framework React (App Router)     |
| React        | 19      | Bibliothèque UI                  |
| TypeScript   | 5+      | Typage statique                  |
| Tailwind CSS | 4       | Styling utilitaire               |
| Wagmi        | 3       | Hooks React pour Ethereum        |
| Viem         | 2       | Client Ethereum bas niveau       |
| Reown AppKit | 1.8+    | Connexion wallet (WalletConnect) |
| i18next      | 25+     | Internationalisation (FR / EN)   |
| shadcn/ui    | -       | Composants UI réutilisables      |
| Sonner       | -       | Notifications toast              |

---

## 📁 Architecture

```
src/
├── abi/                          # ABI du smart contract
│   └── votingAbi.json
├── app/                          # Pages (Next.js App Router)
│   ├── layout.tsx                # Layout principal
│   ├── page.tsx                  # Page d'accueil / connexion
│   ├── not-found.tsx             # Page 404
│   ├── globals.css               # Styles globaux
│   ├── admin/page.tsx            # Interface administrateur
│   └── voting/                   # Pages du processus de vote
│       ├── page.tsx              # Orchestration (affiche l'étape courante)
│       ├── ProposalsStep.tsx     # Soumission des propositions
│       ├── VotingStep.tsx        # Session de vote
│       └── ResultsStep.tsx      # Affichage des résultats
├── components/
│   ├── shared/                   # Composants partagés
│   │   ├── Header.tsx            # Barre de navigation
│   │   ├── Footer.tsx            # Pied de page
│   │   ├── Layout.tsx            # Layout connecté
│   │   ├── NotConnected.tsx      # Écran de connexion wallet
│   │   ├── AppTitle.tsx          # Logo / titre de l'app
│   │   ├── WorkflowStatus.tsx    # Indicateur d'étape du workflow
│   │   ├── Events.tsx            # Affichage des événements blockchain
│   │   └── logs/table.tsx        # Table de logs
│   └── ui/                       # Composants UI (shadcn)
│       ├── ConnectButton.tsx
│       ├── LanguageSwitcher.tsx
│       ├── ThemeToggle.tsx
│       └── ...                   # button, card, input, alert, etc.
├── config/
│   ├── contracts.ts              # Adresses du contrat par réseau (Hardhat, Sepolia, Mainnet)
│   └── index.tsx                 # Configuration Wagmi / Reown AppKit
├── context/
│   └── VotingContext.tsx          # Context React : état global du vote
├── lib/
│   ├── client.ts                 # Client Viem (public client)
│   ├── i18n.ts                   # Configuration i18next
│   └── utils.ts                  # Utilitaires (cn, etc.)
└── locales/                      # Fichiers de traduction
    ├── fr/translations.json
    └── en/translations.json
```

---

## 🚀 Installation

```bash
npm install
```

---

## ⚙️ Configuration

Créez un fichier `.env.local` à la racine de ce dossier :

```env
NEXT_PUBLIC_CONTRACT_ADDRESS=0xA7A7d5fE3AfB550959601c6FFf6541632dFf8C5B
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=<votre-project-id-reown>
```

| Variable                             | Description                                                                   |
| ------------------------------------ | ----------------------------------------------------------------------------- |
| `NEXT_PUBLIC_CONTRACT_ADDRESS`       | Adresse du smart contract Voting déployé                                      |
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | Project ID [Reown Cloud](https://cloud.reown.com/) pour WalletConnect       |

Le fichier `config/contracts.ts` contient les adresses par réseau si vous souhaitez supporter plusieurs chaînes.

---

## 💻 Lancement

```bash
npm run dev
```

L'application est accessible sur [http://localhost:3000](http://localhost:3000).

---

## ✨ Fonctionnalités

### Écran de connexion

- Affichage d'un écran d'accueil avec connexion wallet via **Reown AppKit** (WalletConnect, MetaMask, etc.)
- Détection automatique du rôle : **Admin**, **Électeur** ou **Visiteur**

### Interface Administrateur

- Ajout d'électeurs à la liste blanche (`addVoter`)
- Contrôle du workflow : passage d'étape en étape
- Comptabilisation des votes (`tallyVotes`)

### Interface Électeur

- Soumission de proposition (`addProposal`)
- Vote pour une proposition (`setVote`)
- Consultation des résultats

### Composants transversaux

- **WorkflowStatus** : indicateur visuel de l'étape courante du vote
- **Events** : affichage en temps réel des événements émis par le contrat
- **ThemeToggle** : bascule mode clair / mode sombre
- **LanguageSwitcher** : changement de langue FR ↔ EN

---

## 🌍 Internationalisation

L'application supporte le **français** et l'**anglais** via `i18next`.

Les fichiers de traduction se trouvent dans `src/locales/` :

```
locales/
├── fr/translations.json
└── en/translations.json
```

La langue est détectée automatiquement via `i18next-browser-languagedetector`.

---

## 📦 Build Production

```bash
npm run build
```

Le build est généré dans le dossier `.next/`.
