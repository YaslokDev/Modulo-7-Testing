import { vi } from "vitest";
import { EstadoPartida, partida } from "./model";
import { obtenerMensajePuntuacion, generarNumeroCarta, obtenerEstadoPartida } from "./motor";

describe("obtenerEstadoPartida", () => {
  it("Debería devolver POR_DEBAJO_MAXIMO cuando puntuación es menor a 7.5", () => {
    //Arrange
    const estadoEsperado: EstadoPartida = "POR_DEBAJO_MAXIMO";
    vi.spyOn(partida, "puntuacion", "get").mockReturnValue(4);
    //Act
    const resultado = obtenerEstadoPartida();
    //Assert
    expect(resultado).toBe(estadoEsperado);
  });

  it("Debería devolver JUSTO_MAXIMA cuando puntuación es igual a 7.5", () => {
    //Arrange
    const estadoEsperado: EstadoPartida = "JUSTO_MAXIMA";
    vi.spyOn(partida, "puntuacion", "get").mockReturnValue(7.5);
    //Act
    const resultado = obtenerEstadoPartida();
    //Assert
    expect(resultado).toBe(estadoEsperado);
  });

  it("Debería devolver TE_HAS_PASADO cuando puntuación es mayor a 7.5", () => {
    //Arrange
    const estadoEsperado: EstadoPartida = "TE_HAS_PASADO";
    vi.spyOn(partida, "puntuacion", "get").mockReturnValue(10);
    //Act
    const resultado = obtenerEstadoPartida();
    //Assert
    expect(resultado).toBe(estadoEsperado);
  });
});

describe("generarNumeroCarta", () => {
  it("Debería devolver el mismo numero si es menor o igual a 7", () => {
    //Arrange
    const numeroEsperado: number = 7;
    //Act
    const resultado = generarNumeroCarta(7);
    //Assert
    expect(resultado).toBe(numeroEsperado);
  });

  it("Debería devolver el número sumando 2 si es mayor a 7", () => {
    //Arrange
    const numeroEsperado: number = 10;
    //Act
    const resultado = generarNumeroCarta(8);
    //Assert
    expect(resultado).toBe(numeroEsperado);
  });
});

describe("obtenerMensajePuntuacion", () => {
  it("Debería devolver 'Has sido muy conservador' cuando la puntuación sea menor o igual a 4 o inferior a 5", () => {
    //Arrange
    const puntuacionEsperada: string = "Has sido muy conservador";
    //Act
    const resultado = obtenerMensajePuntuacion(4);
    //Assert
    expect(resultado).toBe(puntuacionEsperada);
  });

  it("Debería devolver 'Te ha entrado el canguelo eh?' cuando la puntuación sea 5 o menor a 6", () => {
    //Arrange
    const puntuacionEsperada: string = "Te ha entrado el canguelo eh?";
    //Act
    const resultado = obtenerMensajePuntuacion(5);
    //Assert
    expect(resultado).toBe(puntuacionEsperada);
  });

  it("Debería devolver 'Casi casi...' cuando la puntuación es entre 6 y 7", () => {
    //Arrange
    const puntuacionEsperada: string = "Casi casi...";
    //Act
    const resultado = obtenerMensajePuntuacion(6.5);
    //Assert
    expect(resultado).toBe(puntuacionEsperada);
  });

  it("Debería devolver '<strong>¡Lo has clavado ¡Enhorabuena 🎉🎉</strong>' cuando la puntuación es 7.5", () => {
    //Arrange
    const puntuacionEsperada: string = "<strong>¡Lo has clavado! ¡Enhorabuena! 🎉🎉</strong>";
    //Act
    const resultado = obtenerMensajePuntuacion(7.5);
    //Assert
    expect(resultado).toBe(puntuacionEsperada);
  });

  it("Debería devolver una cadena vacía cuando la puntuacion es mayor a 7.5", () => {
    //Arrange
    const puntuacionEsperada: string = "";
    //Act
    const resultado = obtenerMensajePuntuacion(8);
    //Assert
    expect(resultado).toBe(puntuacionEsperada);
  });
});
