import express from 'express'
import { productManager } from "./ProductManager.js";

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/api/products',async(req,res)=>{
    try{
    const product = await productManager.getProduct()
    res.status(200).json({message:'products',product})
    }catch(error){
        res.status(500).json((error))
    }
})

app.get('/api/products/:idproduct',async(req,res)=>{
    const {idProduct} = req.params
    try{
    const product = await productManager.getProductById(+idProduct)
    res.status(200).json({message: 'Product',product})    
    }catch(error){
        res.status(500).json({error})
    }
})

app.post('/api/products',async(req,res)=>{
    try{
    const newProduct = await productManager.addProduct(req.body)
    res.status(200).json({message:'Product created',product:newProduct})
    }catch(error){
        res.status(500).json({error})
    }
})

app.delete('/api/product/:idProduct',async(req,res)=>{
    const {idProduct} = req.params
    try{
        const response = await productManager.deletProduct(+idProduct)
        res.status(200).json({message:'Product deleted'})
    }catch(error){
        res.status(500).json({erorr})
    }
})

app.put('/api/products/idProduct',async(req,res)=>{
    const {idProduct} = req.params
    try{
    const productUpdated = await productManager.updateProduct(+idProduct,req.body)
    res.status(200).json({message:'Product updated'})
    }catch(error){
        res.status(500).json({error})
    }
})



app.listen(8080, ()=>{
    console.log('escuchando al puerto 8080')
    
})

