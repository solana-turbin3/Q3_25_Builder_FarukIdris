import { Commitment, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import wallet from "../../../turbin3-prerequisites/rust-prereq/Turbin3-wallet.json"
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("AkjPPHu3GwJqaDH5GGXQ2EGxMyvuxr4jCHxMB5R1ZfeH");

// Recipient address
const to = new PublicKey("5MWpSXNiS3coFVuzSFQca2Y8tDfUv9BqpUFM4UrJQQ41");

(async () => {
    try {
        // Get the token account of the fromWallet address, and if it does not exist, create it
        const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            keypair.publicKey
        );

        // Get the token account of the toWallet address, and if it does not exist, create it
         const toTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            to
        );

        // Transfer the new token to the "toTokenAccount" we just created
         const amount = 1_000_000; // adjust based on your token's decimals

        const txSignature = await transfer(
            connection,
            keypair,
            fromTokenAccount.address,
            toTokenAccount.address,
            keypair.publicKey,
            amount
        );

        
        console.log("Transfer successful!");
        console.log(`TX: https://explorer.solana.com/tx/${txSignature}?cluster=devnet`);

    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();