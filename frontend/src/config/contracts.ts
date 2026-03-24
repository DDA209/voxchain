export const CONTRACT_CONFIG = {
	31337: {
		// Hardhat
		address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
		fromBlock: 0n,
	},
	11155111: {
		// Sepolia
		address: '0xA7A7d5fE3AfB550959601c6FFf6541632dFf8C5B',
		fromBlock: 10511522n,
	},
	1: {
		// Mainnet
		address: '0x...',
		fromBlock: 24706539n, // march 3rd 2026 2:45 PM UTC-0
	},
} as const;
