use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct Identity {
    pub owner: Pubkey,
    #[max_len(50)]
    pub first_name: String,
    #[max_len(50)]
    pub last_name: String,
    pub age: u64,
    pub bump: u8,
}
