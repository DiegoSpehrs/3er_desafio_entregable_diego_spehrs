import express from 'express'
import { productManager } from "./ProductManager.js";

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/products',async(req,res)=>{
    const limit = req.query.limit
    try{
        if(!limit){
            const product = await productManager.getProduct()
            res.status(200).json({message:'products',product})
        }else{
            const product = await productManager.getProduct()
            const prodLimit = product.slice(0,limit)
            res.status(200).json({message:'Los productos segun tu busqueda son', prodLimit})
        }
    }catch(error){
        res.status(500).json((error))
    }
})

app.get('/products/:idproduct',async(req,res)=>{
    const {idProduct} = req.params
    try{
    const product = await productManager.getProductById(+idProduct)
    res.status(200).json({message: 'Product',product})    
    }catch(error){
        res.status(500).json({error})
    }
})

app.listen(8080, ()=>{
    console.log('escuchando al puerto 8080')
    
})

