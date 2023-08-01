import { Router as router } from "express";
import {cCreateProduct, cUpdateProduct, cDeleteProduct, findAllProductC, findSingleProductC} from "../../../controller/productController/ProductController.js"

const  productRouter  =  router();

// create product 
productRouter.post('/create_product' , cCreateProduct);

// update product 
productRouter.put("/update_product/:productName", cUpdateProduct)

// delete product 
productRouter.delete("/delete_product/:productName", cDeleteProduct)

// find single product
productRouter.get("/find_product/:productName", findSingleProductC)

// find all products
productRouter.get("/find_products", findAllProductC)


export default  productRouter;