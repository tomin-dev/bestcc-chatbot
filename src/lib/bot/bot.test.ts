import { getCCDataFromMessage, getCCIdFromMessage } from "../../lib/bot/bot";

describe("Get CC Id for removal", () => {
  it("should get the number", () => {
    const result = getCCIdFromMessage("/borrarTarjeta 20");
    expect(result).toEqual(20);
  });

  it("should get the number even with extra stuff", () => {
    const result = getCCIdFromMessage("/borrarTarjeta 20 for favor carnal");
    expect(result).toEqual(20);
  });
});

describe("Get CC Data From Message", () => {
  it("should handle 0 prepend digits", () => {
    const result = getCCDataFromMessage("/crearTarjeta 19 07 mi super tarjeta");
    expect(result.closingDate).toEqual(19);
    expect(result.dueDate).toEqual(7);
    expect(result.alias).toEqual("mi super tarjeta");
  });

  it("should handle no prepend digits", () => {
    const result = getCCDataFromMessage("/crearTarjeta 19 7 mi super tarjeta");
    expect(result.closingDate).toEqual(19);
    expect(result.dueDate).toEqual(7);
    expect(result.alias).toEqual("mi super tarjeta");
  });

  it("should break with unhandled messages", () => {
    expect(() => getCCDataFromMessage("/crearTarjeta cosa cosa")).toThrow();
    expect(() => getCCDataFromMessage("/crearTarjeta")).toThrow();
    expect(() => getCCDataFromMessage("/crearTarjeta 19 420 cosq")).toThrow();
  });

  it("should break with invalid dates", () => {
    expect(() => getCCDataFromMessage("/crearTarjeta 99 30 cosq")).toThrow();
    expect(() => getCCDataFromMessage("/crearTarjeta 20 99 cosq")).toThrow();
    expect(() => getCCDataFromMessage("/crearTarjeta 0 30 cosq")).toThrow();
    expect(() => getCCDataFromMessage("/crearTarjeta 30 0 cosq")).toThrow();
  });
});
