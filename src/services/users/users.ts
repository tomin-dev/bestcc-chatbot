import { db } from "../../lib/db";

export const getUserByUsername = ({ username }: { username: string }) => {
  return db.user.findFirst({
    where: { username },
    include: { creditCards: true },
  });
};

export const findOrCreateUserByUsername = async ({
  username,
}: {
  username: string;
}) => {
  const dbUser = await getUserByUsername({ username });
  return dbUser === null ? await createUser({ input: { username } }) : dbUser;
};

export const createUser = ({ input }: { input: any }) => {
  return db.user.create({
    data: input,
    include: { creditCards: true },
  });
};
