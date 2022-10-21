export const schema = gql`
  type CreditCard {
    id: Int!
    alias: String!
    closingDate: DateTime!
    dueDate: DateTime!
    createdAt: DateTime!
    updatedAt: DateTime!
    User: User!
    userId: Int!
  }

  type Query {
    creditCards: [CreditCard!]! @requireAuth
    creditCard(id: Int!): CreditCard @requireAuth
  }

  input CreateCreditCardInput {
    alias: String!
    closingDate: DateTime!
    dueDate: DateTime!
    userId: Int!
  }

  input UpdateCreditCardInput {
    alias: String
    closingDate: DateTime
    dueDate: DateTime
    userId: Int
  }

  type Mutation {
    createCreditCard(input: CreateCreditCardInput!): CreditCard! @requireAuth
    updateCreditCard(id: Int!, input: UpdateCreditCardInput!): CreditCard!
      @requireAuth
    deleteCreditCard(id: Int!): CreditCard! @requireAuth
  }
`
