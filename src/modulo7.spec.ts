import { JSDOM } from "jsdom";
import { vi } from "vitest";
import { partida } from "./model";
import * as ui from "./ui";
import { obtenerMensajePuntuacion, generarNumeroCarta } from "./motor";
//import { finalizarJuego } from "./ui";

// Crear un objeto document fake
global.document = new JSDOM("<doctype html><html><body></body></html>").window.document;

describe("comprobarPuntuacion", () => {
  let finalizarJuegoSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    finalizarJuegoSpy = vi.spyOn(ui, "finalizarJuego").mockImplementation(() => {});
  });

  afterEach(() => {
    finalizarJuegoSpy.mockReset();
  });

  it("Debería llamar a finalizar juego si la puntuación es mayor a 7.5", () => {
    vi.spyOn(partida, "puntuacion", "get").mockReturnValue(10);
    //partida.puntuacion = 10;
    const finalizarJuegoSpy = vi.spyOn(ui, "finalizarJuego");
    console.log("Puntuación:", partida.puntuacion);

    expect(finalizarJuegoSpy).toHaveBeenCalledTimes(1);
  });

  it("NO debería llamar a finalizar juego si la puntuación es igual a 7.5", () => {
    vi.spyOn(partida, "puntuacion", "get").mockReturnValue(7.5);
    ui.comprobarPuntuacion();
    expect(finalizarJuegoSpy).not.toHaveBeenCalled();
  });

  it("No debería llamar a finalizar juego si la puntuación es menor a 7.5", () => {
    vi.spyOn(partida, "puntuacion", "get").mockReturnValue(7);
    ui.comprobarPuntuacion();
    expect(finalizarJuegoSpy).not.toHaveBeenCalled();
  });
});

describe("generarNumeroCarta", () => {
  it("Debería devolver el mismo numero si es menor o igual a 7", () => {
    expect(generarNumeroCarta(5)).toEqual(5);
    expect(generarNumeroCarta(7)).toEqual(7);
  });

  it("Debería devolver el número sumando 2 si es mayor a 7", () => {
    expect(generarNumeroCarta(8)).toEqual(10);
    expect(generarNumeroCarta(10)).toEqual(12);
  });
});

describe("obtenerMensajePuntuacion", () => {
  it("Debería devolver 'Has sido muy conservador' cuando la puntuación sea menor o igual a 4 o inferior a 5", () => {
    expect(obtenerMensajePuntuacion(4)).toBe("Has sido muy conservador");
  });

  it("Debería devolver 'Te ha entrado el canguelo eh?' cuando la puntuación sea 5 o menor a 6", () => {
    expect(obtenerMensajePuntuacion(5)).toBe("Te ha entrado el canguelo eh?");
  });

  it("Debería devolver 'Casi casi...' cuando la puntuación es entre 6 y 7", () => {
    expect(obtenerMensajePuntuacion(6.5)).toBe("Casi casi...");
  });

  it("Debería devolver '<strong>¡Lo has clavado ¡Enhorabuena 🎉🎉</strong>' cuando la puntuación es 7.5", () => {
    expect(obtenerMensajePuntuacion(7.5)).toBe("<strong>¡Lo has clavado! ¡Enhorabuena! 🎉🎉</strong>");
  });

  it("Debería devolver una cadena vacía cuando la puntuacion es mayor a 7.5", () => {
    expect(obtenerMensajePuntuacion(8)).toBe("");
  });
});
