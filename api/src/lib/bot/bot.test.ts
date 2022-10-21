import { getCCDataFromMessage } from 'src/lib/bot/bot'

describe('Bot Validations', () => {
  it('should handle 0 prepend digits', () => {
    const result = getCCDataFromMessage('/crearTc 19 07 mi super tarjeta')
    expect(result.closingDate).toEqual(19)
    expect(result.dueDate).toEqual(7)
    expect(result.alias).toEqual('mi super tarjeta')
  })

  it('should handle no prepend digits', () => {
    const result = getCCDataFromMessage('/crearTc 19 7 mi super tarjeta')
    expect(result.closingDate).toEqual(19)
    expect(result.dueDate).toEqual(7)
    expect(result.alias).toEqual('mi super tarjeta')
  })

  it('should break with unhandled messages', () => {
    expect(() => getCCDataFromMessage('/crearTc cosa cosa')).toThrow()
    expect(() => getCCDataFromMessage('/crearTc')).toThrow()
    expect(() => getCCDataFromMessage('/crearTc 19 420 cosq')).toThrow()
  })

  it('should break with invalid dates', () => {
    expect(() => getCCDataFromMessage('/crearTc 99 30 cosq')).toThrow()
    expect(() => getCCDataFromMessage('/crearTc 20 99 cosq')).toThrow()
    expect(() => getCCDataFromMessage('/crearTc 0 30 cosq')).toThrow()
    expect(() => getCCDataFromMessage('/crearTc 30 0 cosq')).toThrow()
  })
})
