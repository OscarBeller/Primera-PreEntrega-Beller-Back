import {promises as fs} from  'fs'
import { v4 as uuidv4 } from 'uuid'

export class CartManager {
    constructor(){
        this.path = 'cart.json'
        this.carts = [];
    }

    getCarts = async() =>{
       const response = await fs.readFile(this.path , 'utf8') 
       const responseJson= JSON.parse(response)
       return responseJson
    }
    
    getCartsPrdoucts = async(id) =>{
        const carts = await this.getCarts ()

        const cart = carts.find(cart =>  cart.id === id);
        
        if(cart){
            return cart.products
        }else{
            console.log('Carrito no encontrado');
        }
    
    }

    newCart = async () => {
        const id = uuidv4() 

        const newCart = { id, products: [] }

        this.carts = await this.getCarts()
        this.carts.push(newCart)

        await  fs.writeFile (this.path ,JSON.stringify(this.cars))
        return newCart;
    }

    addProductToCart = async (cart_id, product_id)  => {
        const carts = await this.getCarts()
        const index = carts.findIndex(cart => cart.id === cart_id)
        
        if (index !== -1 ) {
            const cartProducts = await this.getCartsPrdoucts(cart_id)
            const existingProductIndex = cartProducts.findIndex(product => product.product.id == product_id)

            if(existingProductIndex  === -1 ){
                cartProducts[existingProductIndex].quantity = cartProducts[existingProductIndex].quantity +1
            }  else {
               cartProducts.push({product_id, quantity :1})
            }

            carts[index].products = cartProducts

            await fs.writeFile(this.path, JSON.stringify(carts))
            console.log('El producto se agrego al carrito')
        } else{
            console.log('Carrito no encontrado')
        }


    }
}









