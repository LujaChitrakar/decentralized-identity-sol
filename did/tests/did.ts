import * as anchor from "@coral-xyz/anchor";
import { BN, Program } from "@coral-xyz/anchor";
import { Did } from "../target/types/did";

describe("did", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Did as Program<Did>;
  console.log("Here", program);
  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods
      .createIdentity("Ram", "Laxman", new BN(5))
      .rpc();
    console.log("Your transaction signature is:", tx);
  });
});
