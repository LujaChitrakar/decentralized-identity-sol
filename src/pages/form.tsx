import { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { getProgram, PROGRAM_ID, IDENTITY_SEED } from '../utils/solana'
import * as anchor from '@coral-xyz/anchor'
import { PublicKey } from '@solana/web3.js'


interface Identity {
  owner: PublicKey;
  firstName: string;
  lastName: string;
  age: anchor.BN;
  bump: number;
}

const Form: NextPage = () => {
  const wallet = useWallet()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [identityData,setIdentityData] = useState([])
  const [age, setAge] = useState('')
// useEffect(()=>{
// async function getIdentity() {
//     const program = await getProgram(wallet as any)
//     const [identityPDA] = await PublicKey.findProgramAddressSync(
//         [Buffer.from('identity'), wallet.publicKey.toBuffer()],
//         PROGRAM_ID
//       )

//       try {
//        const res = await program.methods
//           .getIdentity()
//           .accounts({
//             owner: wallet.publicKey,
//             identity: identityPDA,
//             systemProgram: anchor.web3.SystemProgram.programId,
//           })
//           .rpc()
    
     
//         alert('Identity retrieved successfully!')
//         console.log("Here",res)
//       } catch (err) {
//         console.error('Transaction failed:', err)
//         alert('Failed to retrieve identity')
//       }
      
// }
// getIdentity();
// })


  const handleSubmit = async () => {
    console.log(wallet.connected)
      const program = await getProgram(wallet as any)
    if (!wallet.connected || !wallet.publicKey) return alert('Wallet not connected')

    // Derive the PDA (Program Derived Address)
    const [identityPDA] = await PublicKey.findProgramAddressSync(
      [Buffer.from('identity'), wallet.publicKey.toBuffer()],
      PROGRAM_ID
    )

    try {
      await program.methods
        .createIdentity(firstName, lastName, new anchor.BN(age))
        .accounts({
          owner: wallet.publicKey,
          identity: identityPDA,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .rpc()

      alert('Identity created!')
    } catch (err) {
      console.error('Transaction failed:', err)
      alert('Failed to create identity')
    }
  }

  const handleFetch=async ()=>{
    
    if (!wallet.connected) return;
    const program = await getProgram(wallet as any);

    if (!wallet.connected || !wallet.publicKey) return alert("Wallet not connected");
  
    const [identityPDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("identity"), wallet.publicKey.toBuffer()],
      PROGRAM_ID
    );
  
    try {
      const account = await program.account.identity.fetch(identityPDA);

      setIdentityData((prev)=>[...prev,account])
console.log(account)
      // Or set it in state if you're using useState
      // setIdentity(account);
    } catch (err) {
      console.error("Failed to fetch identity:", err);
      alert("No identity found or failed to fetch");
    }

  }

  return (
    <div>
      <Head>
        <title>Form</title>
        <meta name="description" content="Form Functionality" />
      </Head>

      <main style={{ padding: '2rem' }}>
        <WalletMultiButton />

        <div style={{ marginTop: '2rem' }}>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <button onClick={handleSubmit}>Create Identity</button>
          <button onClick={handleFetch}>Fetch Identity</button>

        </div>
        <div>
         All users:
         {identityData?.map((item,index)=>{
     return   (
<div key={index}>
  <li>{item?.firstName}</li>
  <li>{item?.lastName}</li>
  <li>{item?.age.toString()}</li>

</div>
         )})}
        </div>
      </main>
    </div>
  )
}

export default Form
