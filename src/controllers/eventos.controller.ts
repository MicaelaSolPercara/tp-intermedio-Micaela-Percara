import { Request, Response } from "express";
import { getAllEventos, createEvento } from "../services/eventos.service";
import { actualizarEvento, eliminarEvento } from "../services/eventos.service";
import { ActualizarEventoDTO } from "../models/eventos.model";


export const getEventos = (req: Request, res: Response) => {
 const userId = (req as any).user.id; 

  const eventos = getAllEventos(userId);
  res.json(eventos);
};


export const postEvento = (req: Request, res: Response) => {
 const userId = (req as any).user.id;

  const nuevoEvento = createEvento({ ...req.body, userId });

  res.status(201).json(nuevoEvento);
};

export const patchEvento = (req: Request, res: Response) => {
  const id: number = Number(req.params.id);          // 👈 fuerza number
  if (Number.isNaN(id)) return res.status(400).json({ message: "ID inválido" });

  const userId: string = String(req.user!.id);       // 👈 fuerza string

  const datos: ActualizarEventoDTO = req.body;       // 👈 fuerza DTO

  const evento = actualizarEvento(id, userId, datos);

  if (!evento) return res.status(404).json({ message: "Evento no encontrado" });

  return res.json(evento);
};

export const deleteEvento = (req: Request, res: Response) => {
  const id: number = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ message: "ID inválido" });

  const userId: string = String(req.user!.id);

  const eliminado = eliminarEvento(id, userId);

  if (!eliminado) return res.status(404).json({ message: "Evento no encontrado" });

  return res.json({ message: "Evento eliminado correctamente" });
};