_Readme généré par IA_ ✨

# ⛓️ VoxChain — Backend (Smart Contract)

> Smart contract Solidity et outils de développement pour le système de vote décentralisé VoxChain.
> Pour une vue d'ensemble du projet, consultez le [README principal](../README.md).

[![Solidity](https://img.shields.io/badge/Solidity-0.8.28-363636?logo=solidity)](https://soliditylang.org/)
[![Hardhat](https://img.shields.io/badge/Hardhat-v3-yellow?logo=hardhat)](https://hardhat.org/)
[![OpenZeppelin](https://img.shields.io/badge/OpenZeppelin-5.6+-4E5EE4)](https://www.openzeppelin.com/)

---

## 📋 Table des matières

- [Smart Contract](#-smart-contract)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Tests](#-tests)
- [Déploiement](#-déploiement)
- [Vérification Etherscan](#-vérification-etherscan)

---

## 📜 Smart Contract

Le contrat `Voting.sol` hérite d'`Ownable` (OpenZeppelin) et implémente un système de vote complet en 6 étapes.

### Structures de données

| Structure    | Champs                                                       | Description                                                                     |
| ------------ | ------------------------------------------------------------ | ------------------------------------------------------------------------------- |
| **Voter**    | `isRegistered`, `hasVoted`, `hasProposed`, `votedProposalId` | Représente un électeur avec son statut d'inscription, de vote et de proposition |
| **Proposal** | `description`, `voteCount`                                   | Représente une proposition avec sa description et son compteur de votes         |

### Fonctions

| Fonction                        | Accès        | Description                                          |
| ------------------------------- | ------------ | ---------------------------------------------------- |
| `addVoter(address)`             | 👑 Owner     | Inscrit un électeur sur la liste blanche             |
| `addProposal(string)`           | 🗳️ Voter     | Enregistre une proposition (une seule par électeur)  |
| `setVote(uint256)`              | 🗳️ Voter     | Vote pour une proposition                            |
| `startProposalsRegistering()`   | 👑 Owner     | Ouvre la session d'enregistrement des propositions   |
| `endProposalsRegistering()`     | 👑 Owner     | Clôture la session d'enregistrement des propositions |
| `startVotingSession()`          | 👑 Owner     | Ouvre la session de vote                             |
| `endVotingSession()`            | 👑 Owner     | Clôture la session de vote                           |
| `tallyVotes()`                  | 👑 Owner     | Comptabilise les votes et détermine le gagnant       |
| `getVoter(address)`             | 🗳️ Voter     | Consulte les infos d'un électeur (view)              |
| `getOneProposal(uint256)`       | 🗳️ Voter     | Consulte une proposition (view)                      |
| `winningProposalID()`           | 🌍 Public    | Retourne l'ID de la proposition gagnante             |
| `workflowStatus()`              | 🌍 Public    | Retourne le statut courant du workflow               |

### Événements

| Événement                                         | Émis lors de                       |
| ------------------------------------------------- | ---------------------------------- |
| `VoterRegistered(address)`                        | L'inscription d'un électeur        |
| `WorkflowStatusChange(previousStatus, newStatus)` | Un changement d'étape du workflow  |
| `ProposalRegistered(uint256)`                     | L'enregistrement d'une proposition |
| `Voted(address, uint256)`                         | Un vote                            |

### Workflow (`WorkflowStatus` enum)

```
RegisteringVoters → ProposalsRegistrationStarted → ProposalsRegistrationEnded
→ VotingSessionStarted → VotingSessionEnded → VotesTallied
```

---

## 📁 Architecture

```
backend/
├── contracts/
│   └── Voting.sol                    # Contrat de vote principal
├── test/
│   └── Voting.ts                     # Tests unitaires (Mocha + Chai + Ethers.js)
├── ignition/
│   ├── modules/
│   │   └── Voting.ts                 # Module de déploiement Hardhat Ignition
│   └── deployments/                  # Historique des déploiements
│       ├── chain-11155111/           # Sepolia
│       └── chain-31337/             # Hardhat local
├── scripts/
│   └── send-op-tx.ts                 # Script utilitaire
├── hardhat.config.ts                 # Configuration Hardhat
├── package.json
└── tsconfig.json
```

---

## 🚀 Installation

```bash
npm install
```

---

## ⚙️ Configuration

Le fichier `hardhat.config.ts` utilise des **variables de configuration** (Hardhat v3). Configurez-les via le keystore Hardhat :

```bash
npx hardhat keystore set SEPOLIA_RPC_URL
npx hardhat keystore set SEPOLIA_PRIVATE_KEY
npx hardhat keystore set ETHERSCAN_PK
```

| Variable              | Description                                    |
| --------------------- | ---------------------------------------------- |
| `SEPOLIA_RPC_URL`     | URL du noeud RPC Sepolia (Alchemy, Infura…)    |
| `SEPOLIA_PRIVATE_KEY` | Clé privée du compte déployeur                 |
| `ETHERSCAN_PK`        | Clé API Etherscan pour la vérification         |

### Réseaux configurés

| Réseau            | Type             | Description                    |
| ----------------- | ---------------- | ------------------------------ |
| `hardhatMainnet`  | `edr-simulated`  | Simulateur local L1            |
| `hardhatOp`       | `edr-simulated`  | Simulateur local OP            |
| `sepolia`         | `http`           | Réseau de test Ethereum        |

---

## 🧪 Tests

Lancer tous les tests :

```bash
npx hardhat test
```

Lancer uniquement les tests Mocha (TypeScript) :

```bash
npx hardhat test mocha
```

Lancer uniquement les tests Solidity (Foundry-compatible) :

```bash
npx hardhat test solidity
```

---

## 🌐 Déploiement

### Déploiement local

```bash
npx hardhat ignition deploy ignition/modules/Voting.ts
```

### Déploiement sur Sepolia

```bash
npx hardhat ignition deploy --network sepolia ignition/modules/Voting.ts
```

### Contrat déployé

| Réseau  | Adresse                                      | Block de départ | Explorateur                                                                                  |
| ------- | -------------------------------------------- | --------------- | -------------------------------------------------------------------------------------------- |
| Sepolia | `0xA7A7d5fE3AfB550959601c6FFf6541632dFf8C5B` | 10511522        | [Etherscan](https://sepolia.etherscan.io/address/0xA7A7d5fE3AfB550959601c6FFf6541632dFf8C5B) |

---

## ✅ Vérification Etherscan

Après le déploiement, vérifiez le contrat sur Etherscan :

```bash
npx hardhat verify --network sepolia 0xA7A7d5fE3AfB550959601c6FFf6541632dFf8C5B
```

Cela permet à quiconque de lire et vérifier le code source directement sur Etherscan.
