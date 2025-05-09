use anchor_lang::prelude::*;
pub mod instructions;
pub mod state;
pub use instructions::*;
pub use state::*;

declare_id!("DxuwDmo88hQqZBvzwrUFpsxfzg8yxW5chp4vJFFHCPqF");

#[program]
pub mod did {

    use crate::instructions::CreateIdentity;

    use super::*;

    pub fn create_identity(
        ctx: Context<CreateIdentity>,
        first_name: String,
        last_name: String,
        age: u64,
    ) -> Result<()> {
        let identity = &mut ctx.accounts.identity;
        identity.owner = ctx.accounts.owner.key();
        identity.age = age;
        identity.first_name = first_name;
        identity.last_name = last_name;
        identity.bump = ctx.bumps.identity;
        Ok(())
    }

    pub fn get_identity(_ctx: Context<GetIdentity>)->Result<()>{
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}