use crate::Identity;
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct GetIdentity<'info> {
    pub identity: Account<'info, Identity>,
}
