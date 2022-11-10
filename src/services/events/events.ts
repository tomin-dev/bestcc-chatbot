import { db } from "../../lib/db";

export const createEvent = async ({ input }: { input: any }) => {
  return db.event.create({
    data: input,
  });
};

export const safeCreateEvent = async ({ input }: { input: any }) => {
  try {
    return await createEvent({ input });
  } catch (e) {
    console.log("Event creation error: ", JSON.stringify(input));
  }
};
