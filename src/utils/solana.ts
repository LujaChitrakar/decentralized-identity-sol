import * as anchor from '@coral-xyz/anchor'
import { Connection, PublicKey } from '@solana/web3.js'

// IDL and program ID from your backend
export const idl ={
  "address": "88zKCxGCYGdzQZwicP829eZMsrYVh8uyQ1m6vZ76Jgb3",
  "metadata": {
    "name": "did",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "create_identity",
      "discriminator": [
        12,
        253,
        209,
        41,
        176,
        51,
        195,
        179
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "identity",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  105,
                  100,
                  101,
                  110,
                  116,
                  105,
                  116,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "system_program",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "first_name",
          "type": "string"
        },
        {
          "name": "last_name",
          "type": "string"
        },
        {
          "name": "age",
          "type": "u64"
        }
      ]
    },
    {
      "name": "get_identity",
      "discriminator": [
        239,
        148,
        144,
        13,
        242,
        216,
        55,
        213
      ],
      "accounts": [
        {
          "name": "identity"
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "Identity",
      "discriminator": [
        58,
        132,
        5,
        12,
        176,
        164,
        85,
        112
      ]
    }
  ],
  "types": [
    {
      "name": "Identity",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "first_name",
            "type": "string"
          },
          {
            "name": "last_name",
            "type": "string"
          },
          {
            "name": "age",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ]
}

export const PROGRAM_ID = new PublicKey('88zKCxGCYGdzQZwicP829eZMsrYVh8uyQ1m6vZ76Jgb3')
export const IDENTITY_SEED = Buffer.from("identity")

export function getProvider(wallet: anchor.Wallet) {
  const connection = new Connection("https://api.devnet.solana.com", "processed")
  return new anchor.AnchorProvider(connection, wallet, {
    preflightCommitment: "processed",
  })
}

export async function getProgram(wallet: anchor.Wallet) {
  const provider = getProvider(wallet)
  return new anchor.Program(idl as anchor.Idl,  provider)
}
