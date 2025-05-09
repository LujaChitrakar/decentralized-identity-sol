use crate::Identity;
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct CreateIdentity<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,

    #[account(
        init,
        payer=owner,
        space=8+Identity::INIT_SPACE,
        seeds=[b"identity",owner.key().as_ref()],
        bump
    )]
    pub identity: Account<'info, Identity>,

    pub system_program: Program<'info, System>,
}
// some changes