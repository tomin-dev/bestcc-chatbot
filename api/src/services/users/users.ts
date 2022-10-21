import type {
  QueryResolvers,
  MutationResolvers,
  UserRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'
import { creditCards } from '../creditCards/creditCards'

export const getUserByUsername = ({ username }) => {
  return db.user.findFirst({
    where: { username },
    include: { creditCards: true },
  })
}

export const findOrCreateUserByUsername = async ({ username }) => {
  const dbUser = await getUserByUsername({ username })
  return dbUser === null ? await createUser({ input: { username } }) : dbUser
}

export const users: QueryResolvers['users'] = () => {
  return db.user.findMany()
}

export const user: QueryResolvers['user'] = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const createUser: MutationResolvers['createUser'] = ({ input }) => {
  return db.user.create({
    data: input,
  })
}

export const updateUser: MutationResolvers['updateUser'] = ({ id, input }) => {
  return db.user.update({
    data: input,
    where: { id },
  })
}

export const deleteUser: MutationResolvers['deleteUser'] = ({ id }) => {
  return db.user.delete({
    where: { id },
  })
}

export const User: UserRelationResolvers = {
  creditCards: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).creditCards()
  },
}
