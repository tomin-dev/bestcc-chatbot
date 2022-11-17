import { type MyContext, type MyConversation } from "../../bot";
import { safeCreateEvent } from "../../services/events/events";
import { findOrCreateUserByUsername } from "../../services/users/users";

/** Defines the conversation */
export async function feedback(conversation: MyConversation, ctx: MyContext) {
  await ctx.reply(
    "Por favor escribe en un sólo mensaje tus sugerencias o comentarios. Recuerda ser lo más específico posible."
  );
  const {
    msg: { text },
  } = await conversation.waitFor("message:text");

  const user = await findOrCreateUserByUsername({
    username: ctx.message?.from?.username || "roeeyn",
  });

  await conversation.external(() =>
    safeCreateEvent({
      input: {
        type: "feedback",
        userId: user.id,
        message: text || "N/A",
      },
    })
  );
  await ctx.reply(
    `Gracias por tu comentario! Juntos hacemos que este servicio sea mejor.`
  );

  return;
}
