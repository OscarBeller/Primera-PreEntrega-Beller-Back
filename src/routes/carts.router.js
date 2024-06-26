import { Router } from "express";
import { cartManager } from "../index.js";

const cartsRouter = Router();

cartsRouter.post('/', async (req, res)=> {
    try {
        const response = await new CartManager().newCart()
        res.json(response)
    } catch (error) {
        res.send('Error al crear el carrito')
    }
})

cartsRouter.get('/:id', async (req,res)=>{
    const {cid} = req.params;
    try {
        const response= await  cartManager.getCartproducts(cid)
        res.json(response)
    } catch (error) {
        res.send('Error al intentar enviar los productos del carrito')
    }
})

cartsRouter.post('/:cid/products/:pid', async  (req,res)=>{
    const{cid, pid} = req.params;
    try {
        await cartManager.addProductToCart(cid,pid)
        res.send('Producto  agregado a la lista de compras')
    } catch (error) {
        res.send('Error al intentar guardar')
    }
})

export {cartsRouter}