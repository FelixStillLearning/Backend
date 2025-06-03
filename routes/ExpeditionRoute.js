import express from "express";
import {
    getExpeditions,
    getExpeditionById,
    createExpedition,
    updateExpedition,
    deleteExpedition,
    getActiveExpeditions
} from "../controllers/ExpeditionController.js";

const router = express.Router();

router.get('/expeditions', getExpeditions);
router.get('/expeditions/active', getActiveExpeditions);
router.get('/expeditions/:id', getExpeditionById);
router.post('/expeditions', createExpedition);
router.patch('/expeditions/:id', updateExpedition);
router.delete('/expeditions/:id', deleteExpedition);

export default router;
