import { CreditCard } from '@prisma/client'

export const getSortedCreditCardsForDay = (
  creditCards: CreditCard[],
  day: number
): CreditCard[] => {
  const furthest = creditCards
    .filter((card) => day <= card.closingDate)
    .sort((a: CreditCard, b: CreditCard) =>
      a.closingDate > b.closingDate ? -1 : a.closingDate < b.closingDate ? 1 : 0
    )

  const closest = creditCards
    .filter((card) => day > card.closingDate)
    .sort((a: CreditCard, b: CreditCard) =>
      a.closingDate > b.closingDate ? -1 : a.closingDate < b.closingDate ? 1 : 0
    )

  return [...closest, ...furthest]
}

export const getBestCreditCardForDay = (
  creditCards: CreditCard[],
  day: number
): CreditCard => {
  return creditCards.length === 0
    ? null
    : getSortedCreditCardsForDay(creditCards, day)[0]
}
