import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
} from "@solana/web3.js";
import {
  AnchorProvider,
  Idl,
  Program,
  Wallet,
} from "@coral-xyz/anchor";
import { IDL, PROGRAM_ID } from "./programs/Turbin3_prereq";
import wallet from "./dev-wallet.json";
import * as fs from "fs";



// Constants
const MINT_COLLECTION = new PublicKey("5ebsp5RChCGK7ssRZMVMufgVZhd2kFbNaotcZ5UvytN2");
const MPL_CORE_PROGRAM_ID = new PublicKey("CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d");

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const connection = new Connection("https://api.devnet.solana.com");

const provider = new AnchorProvider(
  connection,
  new Wallet(keypair),
  { commitment: "confirmed" }
);

// Try with program ID as string in IDL, or use the programId option
const program = new Program(
  { ...IDL, address: PROGRAM_ID } as any, 
  provider
);

// Derive the PDA: prereqs + wallet publicKey
const [account_key] = PublicKey.findProgramAddressSync(
  [Buffer.from("prereqs"), keypair.publicKey.toBuffer()],
  new PublicKey(PROGRAM_ID)
);

// Create PDA for authority - derives from the collection account
// According to IDL: seeds = ["collection", collection_account]
const [authority_key] = PublicKey.findProgramAddressSync(
  [Buffer.from("collection"), MINT_COLLECTION.toBuffer()],
  new PublicKey(PROGRAM_ID)
);

// mint for the NFT
const mintTs = Keypair.generate();
fs.writeFileSync("mint-wallet.json", JSON.stringify(Array.from(mintTs.secretKey)));
console.log(mintTs.publicKey.toBase58());

const mint = Keypair.fromSecretKey(new Uint8Array(require("./mint-wallet.json")));
console.log("Mint Address:", mint.publicKey.toBase58());
// Run initialize first
/*
(async () => {
  try {
    const tx1 = await program.methods
      .initialize("farooq13")
      .accountsPartial({
        user: keypair.publicKey,
        account: account_key,
        system_program: SystemProgram.programId,
      })
      .signers([keypair])
      .rpc();

    console.log("initialize() Success");
    console.log(`TX: https://explorer.solana.com/tx/${tx1}?cluster=devnet`);
  } catch (e) {
    console.error("initialize() Error:", e);
  }
})();
*/



// Comment out the submit_ts for now - run initialize first, then uncomment this

(async () => {
  try {
    const tx2 = await program.methods
      .submitTs() 
      .accountsPartial({
        user: keypair.publicKey,
        account: account_key,
        mint: mintTs.publicKey,
        collection: MINT_COLLECTION,
        authority: authority_key,
        mpl_core_program: MPL_CORE_PROGRAM_ID,
        system_program: SystemProgram.programId,
      })
      .signers([keypair, mintTs])
      .rpc();
    
    console.log("submitTs() Success");
    console.log(`TX: https://explorer.solana.com/tx/${tx2}?cluster=devnet`);
  } catch (e) {
    console.error("submitTs() Error:", e);
  }
})();
