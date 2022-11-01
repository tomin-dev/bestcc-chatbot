import { db } from "../../lib/db";


export const createCreditCard = ({ input }: { input: any }) => {
  return db.creditCard.create({
    data: input,
  });
};

export const deleteCreditCard = ({ id }: { id: number }) => {
  return db.creditCard.delete({
    where: { id },
  });
};
