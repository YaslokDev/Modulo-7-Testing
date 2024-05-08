import { partida, EstadoPartida } from "./model";

export const obtenerEstadoPartida = (): EstadoPartida => {
  if (partida.puntuacion === 7.5) {
    partida.estado = "JUSTO_MAXIMA";
  }
  if (partida.puntuacion > 7.5) {
    partida.estado = "TE_HAS_PASADO";
  }
  return partida.estado;
};

export const obtenerNumeroAleatorio = (): number => Math.floor(Math.random() * 10 + 1);

export const generarNumeroCarta = (numeroAleatorio: number): number =>
  numeroAleatorio > 7 ? numeroAleatorio + 2 : numeroAleatorio;

export const obtenerPuntosCarta = (carta: number): number => (carta >= 10 ? 0.5 : carta);

export const obtenerMensajePuntuacion = (puntuacion: number): string => {
  if (puntuacion <= 4 || puntuacion < 5) {
    return "Has sido muy conservador";
  } else if (puntuacion === 5 || puntuacion < 6) {
    return "Te ha entrado el canguelo eh?";
  } else if (puntuacion === 6 || puntuacion <= 7) {
    return "Casi casi...";
  } else if (puntuacion === 7.5) {
    return "<strong>¡Lo has clavado! ¡Enhorabuena! 🎉🎉</strong>";
  }
  return "";
};

export const obtenerUrlCarta = (carta: number): string => {
  const baseCartaUrl = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/";
  switch (carta) {
    case 1:
      return baseCartaUrl + "1_as-copas.jpg";
    case 2:
      return baseCartaUrl + "2_dos-copas.jpg";
    case 3:
      return baseCartaUrl + "3_tres-copas.jpg";
    case 4:
      return baseCartaUrl + "4_cuatro-copas.jpg";
    case 5:
      return baseCartaUrl + "5_cinco-copas.jpg";
    case 6:
      return baseCartaUrl + "6_seis-copas.jpg";
    case 7:
      return baseCartaUrl + "7_siete-copas.jpg";
    case 10:
      return baseCartaUrl + "10_sota-copas.jpg";
    case 11:
      return baseCartaUrl + "11_caballo-copas.jpg";
    case 12:
      return baseCartaUrl + "12_rey-copas.jpg";
    default:
      return "";
  }
};
