// To access your database
// Append api/* to import from api and web/* to import from web
import { createCC, sendInstructions } from 'api/src/lib/bot/bot'

import { Telegraf } from 'telegraf'

export default async ({ args }) => {
  // Your script here...
  console.log(':: Executing script with args ::')
  console.log(args)

  const bot = new Telegraf(process.env.BOT_TOKEN)

  bot.command('crearTc', async (ctx) => {
    try {
      await createCC(ctx)
    } catch (err) {
      await ctx.reply(`No entendí tu mensaje, lo siento.`)
      await sendInstructions(ctx)
    }
  })

  bot.on('text', async (ctx) => {
    const username = ctx.message.from.username || 'desconocido'
    await ctx.reply(`Hola ${username}! 👋`)
    await sendInstructions(ctx)
  })

  bot.launch()

  // Enable graceful stop
  process.once('SIGINT', () => bot.stop('SIGINT'))
  process.once('SIGTERM', () => bot.stop('SIGTERM'))
}
