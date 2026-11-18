import express from "express";
const app=express();
app.use(express.json());
const products=[];
//products payload:{id:1,name="laptop",price=50000}
app.post("/products",(req,res)=>{
    const newProduct=req.body;
    products.push(newProduct);
    res.status(200).json({message:"Product created successfully",data:newProduct});
});
app.get("/products",(req,res)=>{
     res.status(200).json({message:"List of all products fetched successfully",data:products});
});
app.get("/products/:id",(req,res)=>{
    const productId=parseInt(req.params.id);
    const product=products.find((prod)=>prod.id===productId);
    if(product){
        res.status(200).json({message:"Product details fetched successfully",data:product});
    }
    else{
        res.status(404).json({message:"Product is NOT FOUND"});
    }
});
//products/:id payload : {id:1, name: "laptop", price:100000}
app.put("/products/:id", (req, res) => {
    const productId = parseInt(req.params.id);
    const updatedProduct = req.body;
    const productIndex = products.findIndex((prod)=> prod.id === productId);
    if (productIndex !== -1) {
        products[productIndex] = {...products[productIndex], ...updatedProduct};
        res.status(200).json({message:"Product updated successfully",data:products[productIndex]});
    }else{
        res.status(404).json({message:"Product is NOT FOUND"});
    }
});
app.delete("/products/:id", (req, res) => {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex((prod)=> prod.id === productId);
    if (productIndex !== -1) {
        const deletedProduct = products.splice(productIndex, 1);
        res.status(200).json({
            message: "Product deleted successfully",
            data: deletedProduct[0]
        });
    } else {
        res.status(404).json({
            message: "Product not found"
        });
    }
});
app.listen(5000, () => {
    console.log("Server running at http://localhost:5000/");
});
