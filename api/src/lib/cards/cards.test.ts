import { CreditCard } from '@prisma/client'
import {
  getSortedCreditCardsForDay,
  getBestCreditCardForDay,
} from 'src/lib/cards/cards'

describe('Get Best credit cards', () => {
  it('should sort cards for the day 16', () => {
    const cards = [
      {
        alias: 'uno',
        closingDate: 17,
      } as CreditCard,
      {
        alias: 'dos',
        closingDate: 27,
      } as CreditCard,
      {
        alias: 'tres',
        closingDate: 30,
      } as CreditCard,
    ]

    const result = getSortedCreditCardsForDay(cards, 16)

    expect(result.length).toEqual(3)
    expect(result[0].alias).toEqual('tres')
    expect(result[1].alias).toEqual('dos')
    expect(result[2].alias).toEqual('uno')
  })

  it('should sort cards for the day 25', () => {
    const cards = [
      {
        alias: 'uno',
        closingDate: 17,
      } as CreditCard,
      {
        alias: 'dos',
        closingDate: 27,
      } as CreditCard,
      {
        alias: 'tres',
        closingDate: 30,
      } as CreditCard,
    ]

    const result = getSortedCreditCardsForDay(cards, 25)

    expect(result.length).toEqual(3)
    expect(result[0].alias).toEqual('uno')
    expect(result[1].alias).toEqual('tres')
    expect(result[2].alias).toEqual('dos')
  })

  it('should sort cards for the day 28', () => {
    const cards = [
      {
        alias: 'uno',
        closingDate: 17,
      } as CreditCard,
      {
        alias: 'dos',
        closingDate: 27,
      } as CreditCard,
      {
        alias: 'tres',
        closingDate: 30,
      } as CreditCard,
    ]

    const result = getSortedCreditCardsForDay(cards, 28)

    expect(result.length).toEqual(3)
    expect(result[0].alias).toEqual('dos')
    expect(result[1].alias).toEqual('uno')
    expect(result[2].alias).toEqual('tres')
  })

  it('should sort cards for the day 31', () => {
    const cards = [
      {
        alias: 'uno',
        closingDate: 17,
      } as CreditCard,
      {
        alias: 'dos',
        closingDate: 27,
      } as CreditCard,
      {
        alias: 'tres',
        closingDate: 30,
      } as CreditCard,
    ]

    const result = getSortedCreditCardsForDay(cards, 31)

    expect(result.length).toEqual(3)
    expect(result[0].alias).toEqual('tres')
    expect(result[1].alias).toEqual('dos')
    expect(result[2].alias).toEqual('uno')
  })
})

describe('Get Best credit card', () => {
  it('should get "tres" for the day 16', () => {
    const cards = [
      {
        alias: 'uno',
        closingDate: 17,
      } as CreditCard,
      {
        alias: 'dos',
        closingDate: 27,
      } as CreditCard,
      {
        alias: 'tres',
        closingDate: 30,
      } as CreditCard,
    ]

    const result = getBestCreditCardForDay(cards, 16)

    expect(result.alias).toEqual('tres')
  })

  it('should get "uno" for the day 25', () => {
    const cards = [
      {
        alias: 'uno',
        closingDate: 17,
      } as CreditCard,
      {
        alias: 'dos',
        closingDate: 27,
      } as CreditCard,
      {
        alias: 'tres',
        closingDate: 30,
      } as CreditCard,
    ]

    const result = getBestCreditCardForDay(cards, 25)

    expect(result.alias).toEqual('uno')
  })

  it('should get "dos" for the day 28', () => {
    const cards = [
      {
        alias: 'uno',
        closingDate: 17,
      } as CreditCard,
      {
        alias: 'dos',
        closingDate: 27,
      } as CreditCard,
      {
        alias: 'tres',
        closingDate: 30,
      } as CreditCard,
    ]

    const result = getBestCreditCardForDay(cards, 28)

    expect(result.alias).toEqual('dos')
  })

  it('should get "tres" for the day 31', () => {
    const cards = [
      {
        alias: 'uno',
        closingDate: 17,
      } as CreditCard,
      {
        alias: 'dos',
        closingDate: 27,
      } as CreditCard,
      {
        alias: 'tres',
        closingDate: 30,
      } as CreditCard,
    ]

    const result = getBestCreditCardForDay(cards, 31)

    expect(result.alias).toEqual('tres')
  })
})
