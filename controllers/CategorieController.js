import Category from "../models/CategorieModel.js";

// Get all categories
export const getCategories = async (req, res) => {
    try {
        const response = await Category.findAll();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// Get category by ID
export const getCategoryById = async (req, res) => {
    try {
        const response = await Category.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!response) {
            return res.status(404).json({ msg: "Category not found" });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// Create new category
export const createCategory = async (req, res) => {
    try {
        const { name, description, status } = req.body;
        await Category.create({
            name: name,
            description: description,
            status: status
        });
        res.status(201).json({ msg: "Category created successfully" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

// Update category
export const updateCategory = async (req, res) => {
    try {
        const { name, description, status } = req.body;
        const category = await Category.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!category) {
            return res.status(404).json({ msg: "Category not found" });
        }
        await Category.update({
            name: name,
            description: description,
            status: status
        }, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Category updated successfully" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

// Delete category
export const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!category) {
            return res.status(404).json({ msg: "Category not found" });
        }
        await Category.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Category deleted successfully" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}