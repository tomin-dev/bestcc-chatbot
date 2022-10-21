import { createCreditCard } from 'src/services/creditCards/creditCards'
import { findOrCreateUserByUsername } from 'src/services/users/users'

export const sendInstructions = async (ctx: any) => {
  await ctx.reply(`Los comandos disponibles son:`)
  await ctx.reply(
    `/crearTc 19 07 mi super tarjeta\nTe creará la tarjeta de crédito con la fecha de corte los` +
      ` días 19, la fecha límite de pago el 07, y el alias 'mi super tarjeta'`
  )
  await ctx.reply(`/tarjetas\nTe mostrará todas las tarjetas guardadas.`)
}

export const getCCDataFromMessage = (
  message: string
): { closingDate: number; dueDate: number; alias: string } => {
  // message: /crearTc 19 07 mi super tarjeta

  const [, closingDate, dueDate, alias] = message.match(
    /\/crearTc\s(\d{1,2})\s(\d{1,2})\s(.*)/
  )

  if (+closingDate > 31 || +dueDate > 31 || +closingDate < 1 || +dueDate < 1) {
    throw new Error('Unvalid dates passed')
  }

  return { closingDate: +closingDate, dueDate: +dueDate, alias }
}

export const getCreditCards = async (ctx: any) => {
  const username = ctx.message.from.username

  if (username === null) {
    return await ctx.reply(
      'Tu usario no es válido. Intenta editarlo en Telegram.'
    )
  }

  const user = await findOrCreateUserByUsername({ username })

  if (user.creditCards === null || user.creditCards.length === 0) {
    ctx.reply(`No tienes tarjetas guardadas`)
    ctx.reply(`Para guardar una usa /crearTc`)
    return
  }

  const reply = user.creditCards
    .map((creditCard: any) => creditCard.alias)
    .reduce((previousValue, currentValue) => {
      return `${previousValue}\n- ${currentValue}`
    }, 'Tarjetas:')

  await ctx.reply(reply)
}

export const createCC = async (ctx: any) => {
  const username = ctx.message.from.username

  if (username === null) {
    return await ctx.reply(
      'Tu usario no es válido. Intenta editarlo en Telegram.'
    )
  }

  const user = await findOrCreateUserByUsername({ username })
  const { closingDate, dueDate, alias } = getCCDataFromMessage(ctx.message.text)

  // TODO: handle duplicates better

  const creditCard = await createCreditCard({
    input: { closingDate, dueDate, alias, userId: user.id },
  })

  ctx.reply(`${creditCard.alias}, creado exitosamente`)
}
