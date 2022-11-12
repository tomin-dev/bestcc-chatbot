import {
  createCC,
  getCreditCards,
  getBestCreditCardForToday,
  removeCC,
  sendGreetings,
  safeCallbackWrapper,
} from "./lib/bot/bot";
import {
  type Conversation,
  type ConversationFlavor,
  conversations,
  createConversation,
} from "@grammyjs/conversations";
import { Bot, Context, session } from "grammy";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

dotenv.config();

type MyContext = Context & ConversationFlavor;
type MyConversation = Conversation<MyContext>;

console.log("Starting script...");
const botToken = process.env.BOT_TOKEN;

if (botToken === undefined) {
  throw new Error('The bot token is not set. Uset the ".env" file to set it.');
}

// Create an instance of the `Bot` class and pass your authentication token to it.
const bot = new Bot<MyContext>(botToken); // <-- put your authentication token between the ""

bot.use(session({ initial: () => ({}) }));
bot.use(conversations());

/** Defines the conversation */
async function createCardConvo(conversation: MyConversation, ctx: MyContext) {
  // TODO: code the conversation
  await ctx.reply('Write my your first number')
  const { msg: { text: firstNumber } } = await conversation.waitFor("message:text");
  await ctx.reply('Write my your second number')
  const { msg: { text: secondNumber } } = await conversation.waitFor("message:text");
  await ctx.reply('Write my your third number')
  // const { msg: { text: thirdNumber } } = await conversation.waitFor("message:text");
  const thirdNumber: number = await conversation.form.number();

  await ctx.reply(`Your result: ${firstNumber + secondNumber + thirdNumber}`)
  // Explicit return helps to leave the convo
  // https://grammy.dev/plugins/conversations.html#leaving-a-conversation
  return
}

bot.use(createConversation(createCardConvo));

bot.command("convo", async (ctx) => {
  // enter the function "greeting" you declared
  await ctx.conversation.enter("createCardConvo");
});

bot.command(
  "start",
  async (ctx) => await safeCallbackWrapper(ctx)("startCommand")(sendGreetings)
);

bot.command(
  "help",
  async (ctx) => await safeCallbackWrapper(ctx)("helpCommand")(sendGreetings)
);

bot.command(
  "settings",
  async (ctx) =>
    await safeCallbackWrapper(ctx)("settingsCommand")(sendGreetings)
);

bot.command(
  "creartarjeta",
  async (ctx) => await safeCallbackWrapper(ctx)("createCardCommand")(createCC)
);

bot.command(
  "borrartarjeta",
  async (ctx) => await safeCallbackWrapper(ctx)("removeCardCommand")(removeCC)
);

bot.command(
  "tarjetas",
  async (ctx) =>
    await safeCallbackWrapper(ctx)("getCardsCommand")(getCreditCards)
);

bot.command(
  "mejortarjeta",
  async (ctx) =>
    await safeCallbackWrapper(ctx)("getBestCardCommand")(
      getBestCreditCardForToday
    )
);

// Always exit any conversation upon /cancel
bot.command("cancel", async (ctx) => {
  await ctx.conversation.exit();
  await ctx.reply("Proceso cancelado. Si quieres crear otra tarjeata usa /creartarjeta");
});

bot.api.setMyCommands(
  [
    { command: "start", description: "Empezar a usar el bot" },
    { command: "help", description: "Ayuda con los comandos más útiles" },
    { command: "settings", description: "Configuraciones (aún en progreso)" },
    {
      command: "creartarjeta",
      description: "Añade una tarjeta de crédito a tu lista",
    },
    {
      command: "borrartarjeta",
      description: "Borra una tarjeta de crédito de tu lista",
    },
    {
      command: "tarjetas",
      description:
        "Obtén la lista de tus tarjetas ordenadas para el mejor uso.",
    },
    {
      command: "mejortarjeta",
      description: "Obtén la mejor tarjeta registrada a usar el día de hoy",
    },
  ],
  { scope: { type: "all_private_chats" } }
);

bot.on(
  "message",
  async (ctx) => await safeCallbackWrapper(ctx)("genericMessage")(sendGreetings)
);

bot.start();
