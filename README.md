_Readme généré par IA_ ✨

# 🗳️ VoxChain — Système de Vote Décentralisé

https://voxchain-eight.vercel.app/

**Une Dapp de vote transparent, sécurisé et décentralisé sur Ethereum**

[![Solidity](https://img.shields.io/badge/Solidity-0.8.28-363636?logo=solidity)](https://soliditylang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![Hardhat](https://img.shields.io/badge/Hardhat-v3-yellow?logo=hardhat)](https://hardhat.org/)
[![Wagmi](https://img.shields.io/badge/Wagmi-v3-black)](https://wagmi.sh/)
[![Chain](https://img.shields.io/badge/Sepolia-Testnet-6B5AED)](https://sepolia.etherscan.io/)

---

## 📋 Table des matières

- [Présentation](#-présentation)
- [Spécifications](#-spécifications)
- [Workflow de Vote](#-workflow-de-vote)
- [Architecture du Projet](#-architecture-du-projet)
- [Stack Technique](#-stack-technique)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Lancement](#-lancement)
- [Déploiement](#-déploiement)

---

## 🎯 Présentation

**VoxChain** est une application décentralisée (Dapp) permettant d'organiser un processus de vote complet, transparent et infalsifiable sur la blockchain Ethereum.

Le projet est composé de deux parties :

| Module             | Technologie                     | Description                                  |
| ------------------ | ------------------------------- | -------------------------------------------- |
| `backend/`         | Hardhat v3 + Solidity 0.8.28    | Smart contract de vote + tests + déploiement |
| `frontend/voting/` | Next.js 16 + React 19 + Wagmi 3 | Interface utilisateur de la Dapp             |

### Contrat déployé

Le smart contract est déployé et vérifié sur le réseau **Sepolia** :

```
0xA7A7d5fE3AfB550959601c6FFf6541632dFf8C5B
```

🔗 [Voir sur Etherscan Sepolia](https://sepolia.etherscan.io/address/0xA7A7d5fE3AfB550959601c6FFf6541632dFf8C5B)

---

## 📝 Spécifications

La Dapp permet :

- ✅ L'enregistrement d'une **liste blanche d'électeurs** par l'administrateur
- ✅ À l'administrateur de **commencer la session d'enregistrement des propositions**
- ✅ Aux électeurs inscrits d'**enregistrer leurs propositions** (une par électeur)
- ✅ À l'administrateur de **mettre fin à la session d'enregistrement** des propositions
- ✅ À l'administrateur de **commencer la session de vote**
- ✅ Aux électeurs inscrits de **voter pour leur proposition préférée** (un vote par électeur)
- ✅ À l'administrateur de **mettre fin à la session de vote**
- ✅ À l'administrateur de **comptabiliser les votes**
- ✅ À **tout le monde** de consulter le résultat

---

## 🔄 Workflow de Vote

Le processus de vote suit un enchaînement strict de **6 étapes**, contrôlées exclusivement par l'administrateur (propriétaire du contrat) :

```
┌─────────────────────────┐
│  1. RegisteringVoters   │  L'admin inscrit les électeurs sur la liste blanche
│     👑 Admin            │
└───────────┬─────────────┘
            │ startProposalsRegistering()
            ▼
┌──────────────────────────────────┐
│  2. ProposalsRegistrationStarted │  Les électeurs soumettent leurs propositions
│     🗳️ Électeurs                │  (une seule proposition par électeur)
└───────────┬──────────────────────┘
            │ endProposalsRegistering()
            ▼
┌────────────────────────────────┐
│  3. ProposalsRegistrationEnded │  La session de propositions est close
│     ⏸️ Pause                   │
└───────────┬────────────────────┘
            │ startVotingSession()
            ▼
┌───────────────────────────┐
│  4. VotingSessionStarted  │  Les électeurs votent pour leur proposition préférée
│     🗳️ Électeurs         │  (un seul vote par électeur)
└───────────┬───────────────┘
            │ endVotingSession()
            ▼
┌─────────────────────────┐
│  5. VotingSessionEnded  │  La session de vote est close
│     ⏸️ Pause            │
└───────────┬─────────────┘
            │ tallyVotes()
            ▼
┌─────────────────────────┐
│  6. VotesTallied        │  Les résultats sont disponibles pour tous
│     🌍 Public           │  via winningProposalID
└─────────────────────────┘
```

---

## 📁 Architecture du Projet

```
Projet3/
│
├── backend/                          # Smart Contract (Hardhat v3)
│   ├── contracts/
│   │   └── Voting.sol                # Contrat de vote principal
│   ├── test/                         # Tests unitaires (Mocha + Chai)
│   ├── ignition/                     # Scripts de déploiement (Hardhat Ignition)
│   ├── scripts/                      # Scripts utilitaires
│   └── hardhat.config.ts             # Configuration Hardhat
│
└── frontend/voting/                  # Application Next.js
    ├── public/                       # Assets statiques
    └── src/
        ├── abi/                      # ABI du contrat (votingAbi.json)
        ├── app/                      # Pages (App Router)
        │   ├── page.tsx              # Page d'accueil
        │   ├── admin/page.tsx        # Interface administrateur
        │   └── voting/               # Pages de vote
        │       ├── page.tsx          # Orchestration du vote
        │       ├── ProposalsStep.tsx  # Étape des propositions
        │       ├── VotingStep.tsx     # Étape du vote
        │       └── ResultsStep.tsx   # Étape des résultats
        ├── components/
        │   ├── shared/               # Composants partagés (Header, Footer, etc.)
        │   └── ui/                   # Composants UI (shadcn)
        ├── config/                   # Configuration (contrats, Wagmi, AppKit)
        ├── context/                  # VotingContext (état global du vote)
        ├── lib/                      # Utilitaires (client Viem, i18n)
        └── locales/                  # Traductions (FR / EN)
```

---

## 🛠️ Stack Technique

### Backend

| Technologie  | Version | Rôle                                            |
| ------------ | ------- | ----------------------------------------------- |
| Solidity     | 0.8.28  | Langage du smart contract                       |
| Hardhat      | v3      | Framework de développement, test et déploiement |
| OpenZeppelin | 5.6+    | Bibliothèque de contrats sécurisés (`Ownable`)  |
| Mocha + Chai | -       | Framework de tests unitaires                    |
| Ethers.js    | v6      | Interactions avec la blockchain (tests)         |

### Frontend

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

## 🚀 Installation

### Prérequis

- [Node.js](https://nodejs.org/) (v18+)
- [npm](https://www.npmjs.com/)
- Un wallet Ethereum (ex: [MetaMask](https://metamask.io/))
- Des ETH de test Sepolia ([faucet](https://sepoliafaucet.com/))

### 1. Cloner le dépôt

```bash
git clone <url-du-repo>
cd Projet3
```

### 2. Backend

```bash
cd backend
npm install
```

### 3. Frontend

```bash
cd frontend/voting
npm install
```

---

## ⚙️ Configuration

### Backend

Créez un fichier de variables de configuration pour Hardhat avec les clés suivantes :

| Variable              | Description                                    |
| --------------------- | ---------------------------------------------- |
| `SEPOLIA_RPC_URL`     | URL du noeud RPC Sepolia (ex: Alchemy, Infura) |
| `SEPOLIA_PRIVATE_KEY` | Clé privée du compte déployeur                 |
| `ETHERSCAN_PK`        | Clé API Etherscan pour la vérification         |

### Frontend

Créez un fichier `.env.local` dans `frontend/voting/` :

```env
NEXT_PUBLIC_CONTRACT_ADDRESS=0xA7A7d5fE3AfB550959601c6FFf6541632dFf8C5B
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=<votre-project-id-reown>
```

> 💡 Obtenez un Project ID gratuit sur [Reown Cloud](https://cloud.reown.com/).

---

## 💻 Lancement

### Tests du smart contract

```bash
cd backend
npx hardhat test
```

### Serveur de développement frontend

```bash
cd frontend/voting
npm run dev
```

L'application est accessible sur [http://localhost:3000](http://localhost:3000).

---

## 🌐 Déploiement

### Smart Contract

| Réseau  | Adresse                                      | Explorateur                                                                                  |
| ------- | -------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Sepolia | `0xA7A7d5fE3AfB550959601c6FFf6541632dFf8C5B` | [Etherscan](https://sepolia.etherscan.io/address/0xA7A7d5fE3AfB550959601c6FFf6541632dFf8C5B) |

Pour déployer sur un réseau :

```bash
cd backend
npx hardhat ignition deploy ./ignition/modules/<module>.ts --network sepolia
```

### Frontend (Production)

```bash
cd frontend/voting
npm run build
```

---

## 📝 Licence

Ce projet est sous licence [MIT](LICENSE).

---

<div align="center">

**Fait avec ❤️ sur Ethereum**

</div>

