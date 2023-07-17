import { Router as router } from "express";
import {cCreateProduct, cUpdateProduct, cDeleteProduct} from "../../../controller/productController/ProductController.js"

const  productRouter  =  router();

// create product 
productRouter.post('/create_product' , cCreateProduct);

// update product 
productRouter.put("/update_product/:productName", cUpdateProduct)

// delete product 
productRouter.delete("/delete_product/:productName", cDeleteProduct)


export default  productRouter;