export type EstadoPartida = "POR_DEBAJO_MAXIMO" | "JUSTO_MAXIMA" | "TE_HAS_PASADO";
interface Partida {
  puntuacion: number;
  estado: EstadoPartida;
}

export const partida: Partida = {
  puntuacion: 0,
  estado: "POR_DEBAJO_MAXIMO",
};
