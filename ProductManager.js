import fs from "fs";

class ProductManager{
    constructor(path){
        this.path = path
    }

    async getProduct(){
        try{
          if(fs.existsSync(this.path)) {
            const productFile = await fs.promises.readFile(this.path, 'utf-8')
            return JSON.parse(productFile)
          } else {
            return []
          } 
        } catch (error) {
            return error
        }
    }

    async addProduct(title,description,price,thumbnail,code,stock){
        try{
          const productPrev = await this.getProduct()
          let id 
          if(!productPrev.length) {
            id = 1
          } else {
            id = productPrev[productPrev.length -1].id +1   
          }
          const newProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
          productPrev.push({...newProduct, id})
          await fs.promises.writeFile(this.path, JSON.stringify(productPrev))
        } catch (error){
            return error
        }
    }

    async getProductById(id){
        try{
          const productPrev = await this.getProduct()
          const product = productPrev.find((p) => p.id === id)
          if(!product) {
            return 'Producto con id no encontrado'
          } 
          return product     
        } catch (error){
            return error
        }
    }

    async updateProduct(id,obj) {
        try{
          const productPrev = await this.getProduct()
          const productIndex = productPrev.findIndex((p) => p.id === id)
          if(productIndex === -1) {
            return 'No hay un producto con ese id'
          }
          const product = productPrev[productIndex]
          productPrev[productIndex] = {...obj,...product}
          await fs.promises.writeFile(this.path, JSON.stringify(productPrev))  
        } catch (error) {
            return error
        }
    }

    async deletProduct(id) {
        try{
          const productPrev = await this.getProduct()
          const newArrProduct = productPrev.filter((p) => p.id !== id)
          await fs.promises.writeFile(this.path, JSON.stringify(newArrProduct))  
        }catch (error) {
            return error
        }
    }
}


/*
const test = async () => {
  const manager1 = new ProductManager('productosPrueba.json');
  await manager1.getProduct();
  await manager1.addProduct('producto prueba', 'este es un producto prueba',200,'Sin imagen','abc123',25);
  console.log(await manager1.getProduct());
  console.log(await manager1.getProductById(1));
  await manager1.updateProduct(1,'Iphone', 'este es un producto prueba',200,'Sin imagen','abc123',25);
  await manager1.deletProduct(1);
} 

test()
*/
export const productManager = new ProductManager('productosPrueba.json')

