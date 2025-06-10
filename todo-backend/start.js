const app = require("./server")

const PORT = process.env.PORT || 3001;
app.listen(PORT,(req,res)=>{
    console.log(`server is running on the ${PORT}`);
})