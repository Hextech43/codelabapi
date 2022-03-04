const express = require("express")

const yaml = require("yamljs")
const swagger= require("swagger-ui-express")
const res = require("express/lib/response")
const swaggerDoc = yaml.load("./app.yaml")



const app = express()

app.use(express.json())


const data = [
    {
        id:1,
        name: "Esther"
    },
    {
        id:2,
        name: "John"
    },
    {
        id:1,
        name: "Samuel"
    },
    
]




app.use("/doc", swagger.serve, swagger.setup(swaggerDoc))

app.get("/user", (req, res)=>{
    res.status(200).json({msg:"get all", data:data})
})

app.post("addUser", (req, res)=>{
    const add =[...data, req.body]
    res.status(200).json({msg:"new use added", data:add})
})

app.get("/", (req,res)=>{
    res.end("hello")
}) 

app.get("/user/:id", (req,res)=>{
    const db = data.find((el) => el.id === parseInt(req.params.id))
    res.status(200).json({msg:"get all", data:db})
})



app.listen(5000, ()=>{
    console.log("server is ready")
})