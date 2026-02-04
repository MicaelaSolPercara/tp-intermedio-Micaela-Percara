import { Evento, ActualizarEventoDTO } from "../models/eventos.model";

const eventos: Evento[] = [];

export const getAllEventos = (userId: string): Evento[] => {
  return eventos.filter((e) => e.userId === userId);
};

export const createEvento = (data: Omit<Evento, "id">): Evento => {
  const nuevoEvento: Evento = {
    id: Date.now(),
    ...data,
  };

  eventos.push(nuevoEvento);
  return nuevoEvento;
};

export const actualizarEvento = (
  id: number,
  userId: string,
  datos: ActualizarEventoDTO
): Evento | null => {
  const evento = eventos.find((e) => e.id === id && e.userId === userId);

  if (!evento) return null;

  // Actualiza SOLO lo que venga en "datos"
  Object.assign(evento, datos);

  return evento;
};

export const eliminarEvento = (id: number, userId: string): boolean => {
  const index = eventos.findIndex((e) => e.id === id && e.userId === userId);

  if (index === -1) return false;

  eventos.splice(index, 1);
  return true;
};
