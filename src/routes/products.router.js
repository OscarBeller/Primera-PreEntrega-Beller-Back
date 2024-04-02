import { Router } from "express";
import {  productManager } from "../index.js";

const productsRouter = Router()





productsRouter.get('/', async( req, res)=>{
    try {
        const { limit } = req.query;
        const products = await productManager.getProducts()

        if  (limit) {
            const limitedProducts = products.slice(0, limit)
            return res.json(limitedProducts);

        } return  res.json(products)
    }

    catch (error) {
        console.log(error);
        res.send('EROR AL INTENTAR RECIBIR LOS PRODUCTOS')
    }
})

productsRouter.get('/:pid', async (req, res)=>{
    try {
        const {pid} = req.params;
        const products =  await productManager.getProductsById(pid)
        res.json(products)
    } catch (error) {
        console.log(error);
        res.send('EROR AL INTENTAR RECIBIR EL PRODUCTO CON ID  ' )
    }
})

productsRouter.post('/', async( req, res)=>{
    try {
        const {title, description, price, thumbnail, code, stock, status = true, category} =req.body;
        const response = await productManager.addProduct({title, description, price, thumbnail, code, stock, status, category}) 
        res.json(response)
    } catch (error) {
        console.log(error);
        res.send('EROR AL INTENTAR AGREGAR EL PRODUCTO')
    }
})

productsRouter.put('/:pid', async (req, res)=>{
    const {pid} = req.params;

    try {
        const {title, description, price, thumbnail, code, stock, status = true, category} =req.body;
        const response=await productManager.updateProduct(pid ,{title,description,price,thumbnail,code,stock,status,category})
        res.json(response)
    } catch (error) {
        console.log(error);
        res.send('EROR AL INTENTAR MODIFICAR EL PRODUCTO CON ID' + pid)
    }
})

productsRouter.delete('/:pid', async (req, res)=>{
    const {pid} = req.params;
    try {
        await productManager.deleteProduct(pid);
        res.send('PRODUCTO ELIMINADO DE MANERA CORRECTA')
    } catch (error) {
        console.log(error);
        res.send(`ERROR AL INTENTAR BORRAR EL PRODUCTO ${pid}`);
        
    }

})

export {productsRouter}