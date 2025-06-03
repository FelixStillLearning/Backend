import Expedition from "../models/ExpeditionModel.js";

// Get all expeditions
export const getExpeditions = async (req, res) => {
    try {
        const response = await Expedition.findAll();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// Get expedition by ID
export const getExpeditionById = async (req, res) => {
    try {
        const response = await Expedition.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!response) {
            return res.status(404).json({ msg: "Expedition not found" });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// Create new expedition
export const createExpedition = async (req, res) => {
    try {
        const { name, code, logo, baseCost, status } = req.body;
        await Expedition.create({
            name: name,
            code: code,
            logo: logo,
            baseCost: baseCost,
            status: status
        });
        res.status(201).json({ msg: "Expedition created successfully" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

// Update expedition
export const updateExpedition = async (req, res) => {
    try {
        const { name, code, logo, baseCost, status } = req.body;
        const expedition = await Expedition.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!expedition) {
            return res.status(404).json({ msg: "Expedition not found" });
        }
        await Expedition.update({
            name: name,
            code: code,
            logo: logo,
            baseCost: baseCost,
            status: status
        }, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Expedition updated successfully" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

// Delete expedition
export const deleteExpedition = async (req, res) => {
    try {
        const expedition = await Expedition.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!expedition) {
            return res.status(404).json({ msg: "Expedition not found" });
        }
        await Expedition.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Expedition deleted successfully" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

// Get active expeditions only
export const getActiveExpeditions = async (req, res) => {
    try {
        const response = await Expedition.findAll({
            where: {
                status: true
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
