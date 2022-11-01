import {
  createCC,
  getCreditCards,
  getBestCreditCardForToday,
  removeCC,
  sendGreetings,
  safeCallbackWrapper,
} from "./lib/bot/bot";
import { Bot } from "grammy";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

dotenv.config();

console.log("Starting script...")
const botToken = process.env.BOT_TOKEN;

if(botToken === undefined){
  throw new Error('The bot token is not set. Uset the ".env" file to set it.')
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
  "crearTarjeta",
  async (ctx) => await safeCallbackWrapper(ctx)(createCC)
);

bot.command(
  "borrarTarjeta",
  async (ctx) => await safeCallbackWrapper(ctx)(removeCC)
);

bot.command(
  "tarjetas",
  async (ctx) => await safeCallbackWrapper(ctx)(getCreditCards)
);

bot.command(
  "mejorTarjeta",
  async (ctx) => await safeCallbackWrapper(ctx)(getBestCreditCardForToday)
);

bot.on("message", async (ctx) => await safeCallbackWrapper(ctx)(sendGreetings));

bot.start();
