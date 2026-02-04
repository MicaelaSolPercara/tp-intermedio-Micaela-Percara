import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { getEventos, postEvento, patchEvento, deleteEvento } from "../controllers/eventos.controller";

const router = Router();

router.get("/", authenticate, getEventos);

router.post("/", authenticate, postEvento);

router.patch("/:id", authenticate, patchEvento);
router.delete("/:id", authenticate, deleteEvento);

export default router;

