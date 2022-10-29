// To access your database
// Append api/* to import from api and web/* to import from web
import {
  createCC,
  getCreditCards,
  getBestCreditCardForToday,
  removeCC,
  sendGreetings,
  safeCallbackWrapper,
} from 'api/src/lib/bot/bot'

import { Telegraf } from 'telegraf'

export default async ({ args }) => {
  // Your script here...
  console.log(':: Executing script with args ::')
  console.log(args)

  const bot = new Telegraf(process.env.BOT_TOKEN)

  bot.start(async (ctx) => await sendGreetings(ctx))

  bot.command(
    'crearTarjeta',
    async (ctx) => await safeCallbackWrapper(ctx)(createCC)
  )

  bot.command(
    'borrarTarjeta',
    async (ctx) => await safeCallbackWrapper(ctx)(removeCC)
  )

  bot.command(
    'tarjetas',
    async (ctx) => await safeCallbackWrapper(ctx)(getCreditCards)
  )

  bot.command(
    'mejorTarjeta',
    async (ctx) => await safeCallbackWrapper(ctx)(getBestCreditCardForToday)
  )

  bot.on('text', async (ctx) => await sendGreetings(ctx))

  bot.launch()

  // Enable graceful stop
  process.once('SIGINT', () => bot.stop('SIGINT'))
  process.once('SIGTERM', () => bot.stop('SIGTERM'))
}
