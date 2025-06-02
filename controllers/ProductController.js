import Product from "../models/ProductModel.js";

export const getProducts = async(req, res) =>{
    try {
        const response = await Product.findAll();
        res.status(200).json(response);
    } catch (error){
        console.log(error.message);
    }
}

export const getProductById = async(req, res) =>{
    try {
        const response = await Product.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error){
        console.log(error.message);
    }
}
export const createProduct = async(req, res) =>{
    try {
        await Product.create(req.body);
        res.status(201).json({msg: "product created"});
    } catch (error){
        console.log(error.message);
    }
}

export const updateProduct = async(req, res) =>{
    try {
        await Product.update(req.body,{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "product updated"});
    } catch (error){
        console.log(error.message);
    }
}

export const deleteProduct = async(req, res) =>{
    try {
        await Product.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "product deleted"});
    } catch (error){
        console.log(error.message);
    }
}