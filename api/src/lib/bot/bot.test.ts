import {
  getBestCreditCardForDay,
  getCCDataFromMessage,
  getCCIdFromMessage,
} from 'src/lib/bot/bot'
import { CreditCard } from '@prisma/client'

describe('Get CC Id for removal', () => {
  it('should get the number', () => {
    const result = getCCIdFromMessage('/borrarTarjeta 20')
    expect(result).toEqual(20)
  })

  it('should get the number even with extra stuff', () => {
    const result = getCCIdFromMessage('/borrarTarjeta 20 for favor carnal')
    expect(result).toEqual(20)
  })
})

describe('Get CC Data From Message', () => {
  it('should handle 0 prepend digits', () => {
    const result = getCCDataFromMessage('/crearTarjeta 19 07 mi super tarjeta')
    expect(result.closingDate).toEqual(19)
    expect(result.dueDate).toEqual(7)
    expect(result.alias).toEqual('mi super tarjeta')
  })

  it('should handle no prepend digits', () => {
    const result = getCCDataFromMessage('/crearTarjeta 19 7 mi super tarjeta')
    expect(result.closingDate).toEqual(19)
    expect(result.dueDate).toEqual(7)
    expect(result.alias).toEqual('mi super tarjeta')
  })

  it('should break with unhandled messages', () => {
    expect(() => getCCDataFromMessage('/crearTarjeta cosa cosa')).toThrow()
    expect(() => getCCDataFromMessage('/crearTarjeta')).toThrow()
    expect(() => getCCDataFromMessage('/crearTarjeta 19 420 cosq')).toThrow()
  })

  it('should break with invalid dates', () => {
    expect(() => getCCDataFromMessage('/crearTarjeta 99 30 cosq')).toThrow()
    expect(() => getCCDataFromMessage('/crearTarjeta 20 99 cosq')).toThrow()
    expect(() => getCCDataFromMessage('/crearTarjeta 0 30 cosq')).toThrow()
    expect(() => getCCDataFromMessage('/crearTarjeta 30 0 cosq')).toThrow()
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
