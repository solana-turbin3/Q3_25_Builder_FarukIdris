# Solana Starter Project

This project contains a basic setup for working with the **Solana Token Program** using JavaScript/TypeScript and the `@solana/spl-token` + `@metaplex-foundation` libraries. It includes tools to:

- Initialize custom SPL tokens (`spl_init`)
- Attach on-chain metadata (`spl_metadata`)
- Mint tokens to wallet addresses (`spl_mint`)

---

## What’s Inside

### 1. `spl_init`
Initializes a new SPL token on the Solana Devnet. You can define:
- Number of decimals
- Mint authority
- Freeze authority

### 2. `spl_metadata`
Sets the token metadata (name, symbol, URI) using the **Metaplex Token Metadata Program**, enabling support in wallets and explorers.

### 3. `spl_mint`
Mints tokens to an associated token account (ATA) of a given wallet.


## Deployed Token

**[View Token on Solana Explorer](https://explorer.solana.com/address/AkjPPHu3GwJqaDH5GGXQ2EGxMyvuxr4jCHxMB5R1ZfeH?cluster=devnet)**  
- Token Mint Address: `AkjPPHu3GwJqaDH5GGXQ2EGxMyvuxr4jCHxMB5R1ZfeH`


## Prerequisites

- Node.js and Yarn
- Solana CLI
- Devnet wallel
