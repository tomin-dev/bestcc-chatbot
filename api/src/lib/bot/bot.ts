import { findOrCreateUserByUsername } from 'src/services/users/users'

export const sendInstructions = async (ctx: any) => {
  await ctx.reply(`Los comandos disponibles son:`)
  await ctx.reply(
    `/crearTc 19 07 mi super tarjeta\nTe creará la tarjeta de crédito con la fecha de corte los` +
      ` días 19, la fecha límite de pago el 07, y el alias 'mi super tarjeta'`
  )
}

export const createCC = async (ctx: any) => {
  const username = ctx.message.from.username

  if (username === null) {
    return await ctx.reply(
      'Tu usario no es válido. Intenta editarlo en Telegram.'
    )
  }

  const user = await findOrCreateUserByUsername({ username })

  // TODO: add the credit card
  ctx.reply(`User: ${user.username}`)
  return
}
