import {
  createCreditCard,
  deleteCreditCard,
} from 'src/services/creditCards/creditCards'
import { findOrCreateUserByUsername } from 'src/services/users/users'
import { CreditCard } from '@prisma/client'
import {
  getSortedCreditCardsForDay,
  getBestCreditCardForDay,
} from 'src/lib/cards/cards'

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
  await ctx.reply(`/borrarTarjeta 420\nTe borrará la tarjeta con id 420.`)
}

export const getCCIdFromMessage = (message: string): number => {
  const [, creditCardId] = message.match(/\/borrarTarjeta\s(\d+)(.*)/)
  return +creditCardId
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

export const removeCC = async (ctx: any) => {
  const username = ctx.message.from.username

  if (username === null) {
    return await ctx.reply(
      'Tu usario no es válido. Intenta editarlo en Telegram.'
    )
  }

  const user = await findOrCreateUserByUsername({ username })

  if (user.creditCards === null || user.creditCards.length === 0) {
    ctx.reply(`No tienes tarjetas guardadas`)
    ctx.reply(`Para guardar una usa /crearTarjeta`)
    return
  }

  const creditCardId = getCCIdFromMessage(ctx.message.text)
  await deleteCreditCard({ id: creditCardId })

  ctx.reply(`Tarjeta con id: ${creditCardId} eliminada.`)

  const refreshedUser = await findOrCreateUserByUsername({ username })

  if (refreshedUser.creditCards.length === 0) {
    await ctx.reply(`No hay más tarjetas. Puedes agregar una con /crearTarjeta`)
    return
  }

  const reply = refreshedUser.creditCards
    .map((creditCard: any) => {
      return `${creditCard.alias}, corte: ${creditCard.closingDate}, pago: ${creditCard.dueDate}, id: ${creditCard.id}`
    })
    .reduce((previousValue, currentValue) => {
      return `${previousValue}\n- ${currentValue}`
    }, 'El resto de tus tarjetas:')

  await ctx.reply(reply)
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
    ctx.reply(`Para guardar una usa /crearTarjeta`)
    return
  }

  const todaysNumber = new Date().getDate()

  const bestCreditCard = getBestCreditCardForDay(
    user.creditCards as CreditCard[],
    todaysNumber
  )

  await ctx.reply(
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
    ctx.reply(`Para guardar una usa /crearTarjeta`)
    return
  }

  await ctx.reply('Tus tarjetas por orden de beneficio:')

  const todaysNumber = new Date().getDate()

  const sortedCreditCards: CreditCard[] = getSortedCreditCardsForDay(
    user.creditCards as CreditCard[],
    todaysNumber
  )

  const reply: string = sortedCreditCards
    .map(
      (card: CreditCard, idx: number) =>
        `${idx + 1}.${
          idx === 0
            ? '(Mejor)'
            : idx === user.creditCards.length - 1
            ? '(Peor)'
            : ''
        } ${card.alias}, corte: ${card.closingDate}, pago: ${
          card.dueDate
        }, id: ${card.id}`
    )
    .join('\n')

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
