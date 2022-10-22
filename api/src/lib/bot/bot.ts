import { createCreditCard } from 'src/services/creditCards/creditCards'
import { findOrCreateUserByUsername } from 'src/services/users/users'
import { CreditCard } from '@prisma/client'

export const sendInstructions = async (ctx: any) => {
  await ctx.reply(`Los comandos disponibles son:`)
  await ctx.reply(
    `/crearTarjeta 19 07 mi super tarjeta\nTe creará la tarjeta de crédito con la fecha de corte los` +
      ` días 19, la fecha límite de pago el 07, y el alias 'mi super tarjeta'`
  )
  await ctx.reply(
    `/mejorTarjeta\nTe mostrará la mejor tarjeta a usar hoy basado en la fecha de corte.`
  )
  await ctx.reply(`/tarjetas\nTe mostrará todas las tarjetas guardadas.`)
}

export const getCCDataFromMessage = (
  message: string
): { closingDate: number; dueDate: number; alias: string } => {
  // message: /crearTarjeta 19 07 mi super tarjeta

  const [, closingDate, dueDate, alias] = message.match(
    /\/crearTarjeta\s(\d{1,2})\s(\d{1,2})\s(.*)/
  )

  if (+closingDate > 31 || +dueDate > 31 || +closingDate < 1 || +dueDate < 1) {
    throw new Error('Unvalid dates passed')
  }

  return { closingDate: +closingDate, dueDate: +dueDate, alias }
}

export const getBestCreditCardForDay = (
  creditCards: CreditCard[],
  day: number
): CreditCard => {
  const furthest = creditCards.filter((card) => day <= card.closingDate)
  const closest = creditCards.filter((card) => day > card.closingDate)

  if (closest.length > 0) {
    return closest.reduce((prevCard, nextCard) => {
      return nextCard.closingDate > prevCard.closingDate ? nextCard : prevCard
    })
  }

  return furthest.reduce((prevCard, nextCard) => {
    return nextCard.closingDate > prevCard.closingDate ? nextCard : prevCard
  })
}

export const getBestCreditCardForToday = async (ctx: any) => {
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

  const todaysNumber = new Date().getDate()

  const bestCreditCard = getBestCreditCardForDay(
    user.creditCards as CreditCard[],
    todaysNumber
  )

  ctx.reply(
    `La mejor tarjeta para hoy es:\n${bestCreditCard.alias}, corte: ${bestCreditCard.closingDate}, pago: ${bestCreditCard.dueDate}, id: ${bestCreditCard.id}`
  )
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
    .map((creditCard: any) => {
      return `${creditCard.alias}, corte: ${creditCard.closingDate}, pago: ${creditCard.dueDate}, id: ${creditCard.id}`
    })
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
