import wallet from "../../../turbin3-prerequisites/rust-prereq/Turbin3-wallet.json";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"
import { readFile } from "fs/promises";

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
    try {
        // Follow this JSON structure
        // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure

        const image = "https://devnet.irys.xyz/CBTAvp9u5y4g3zPvU3hJnGqGGudbMBFVLZ2nNXgr3Dgh";
        const metadata = {
            name: "DunHive",
            symbol: "DHV",
            description: "An exclusive NFT granting access to the Dunhive private DAO, membership, and dev resources.",
            image,
            attributes: [
                {trait_type: 'Power', value: 'Fire'}
            ],
            properties: {
                files: [
                    {
                        type: "image/jpg",
                        uri: image
                    },
                ]
            },
            creators: [
              {
                "address": "J2Rnp3AkbHWzXnGC9rnYnnKesA4ft63xXZKSmnURypoH",
                "share": 100
              }
            ]
        };
        const myUri = await umi.uploader.uploadJson(metadata);
        console.log("Your metadata URI: ", myUri);
    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();