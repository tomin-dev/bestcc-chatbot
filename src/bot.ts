import {
  createCC,
  getCreditCards,
  getBestCreditCardForToday,
  removeCC,
  sendGreetings,
  safeCallbackWrapper,
} from "./lib/bot/bot";
import { Bot, CommandContext, Context } from "grammy";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

dotenv.config();

console.log("Starting script...");
const botToken = process.env.BOT_TOKEN;

if (botToken === undefined) {
  throw new Error('The bot token is not set. Uset the ".env" file to set it.');
}

// Create an instance of the `Bot` class and pass your authentication token to it.
const bot = new Bot(botToken); // <-- put your authentication token between the ""

bot.command(
  "start",
  async (ctx) => await safeCallbackWrapper(ctx)(sendGreetings)
);

bot.command(
  "help",
  async (ctx) => await safeCallbackWrapper(ctx)(sendGreetings)
);

bot.command(
  "settings",
  async (ctx) => await safeCallbackWrapper(ctx)(sendGreetings)
);

bot.command(
  "creartarjeta",
  async (ctx) => await safeCallbackWrapper(ctx)(createCC)
);

bot.command(
  "borrartarjeta",
  async (ctx) => await safeCallbackWrapper(ctx)(removeCC)
);

bot.command(
  "tarjetas",
  async (ctx) => await safeCallbackWrapper(ctx)(getCreditCards)
);

bot.command(
  "mejortarjeta",
  async (ctx) => await safeCallbackWrapper(ctx)(getBestCreditCardForToday)
);

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

bot.on("message", async (ctx) => await safeCallbackWrapper(ctx)(sendGreetings));

bot.start();
