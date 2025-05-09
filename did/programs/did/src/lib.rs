use anchor_lang::prelude::*;

declare_id!("DxuwDmo88hQqZBvzwrUFpsxfzg8yxW5chp4vJFFHCPqF");

#[program]
pub mod did {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
