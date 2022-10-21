import type {
  QueryResolvers,
  MutationResolvers,
  CreditCardRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const creditCards: QueryResolvers['creditCards'] = () => {
  return db.creditCard.findMany()
}

export const creditCard: QueryResolvers['creditCard'] = ({ id }) => {
  return db.creditCard.findUnique({
    where: { id },
  })
}

export const createCreditCard: MutationResolvers['createCreditCard'] = ({
  input,
}) => {
  return db.creditCard.create({
    data: input,
  })
}

export const updateCreditCard: MutationResolvers['updateCreditCard'] = ({
  id,
  input,
}) => {
  return db.creditCard.update({
    data: input,
    where: { id },
  })
}

export const deleteCreditCard: MutationResolvers['deleteCreditCard'] = ({
  id,
}) => {
  return db.creditCard.delete({
    where: { id },
  })
}

export const CreditCard: CreditCardRelationResolvers = {
  User: (_obj, { root }) => {
    return db.creditCard.findUnique({ where: { id: root?.id } }).User()
  },
}
