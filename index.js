const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const db = require("./models")
const {data} = require("./models")
const {lzwDecompress} = require("./algorithm/lzw/decoder")
const {lzwCompress} = require("./algorithm/lzw/encoder")
const {rleDecompress} = require("./algorithm/rle/decoder")
const {rleCompress} = require("./algorithm/rle/encoder");
const cors = require('cors');


app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.ip} ${req.method} ${req.url}`);
    next();
});
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: '*',
    allowedHeaders: ['Content-Type'],
    credentials: true
}))


app.post("/data",(req, res) =>{
    if (req.statusCode>=400){
        console.log(`error code:${req.statusCode}`)
    }
    switch (req.body.type){
        case 'decompress':
            data.create({
                input: req.body.input,
                output: (req.body.choice==='yes')?rleDecompress(lzwDecompress(req.body.input)):lzwDecompress(req.body.input),
                algorithm: (req.body.choice==='yes')?'Run Length Encoding':'None',
                type: req.body.type
            }).catch((err)=>{
                console.log(err)
            })
            break
        case 'compress':
            data.create({
                input: req.body.input,
                output: (req.body.choice==='yes')?lzwCompress(rleCompress(req.body.input)):lzwCompress(req.body.input),
                algorithm: (req.body.choice==='yes')?'Run Length Encoding':'None',
                type: req.body.type
            }).catch((err)=>{
                console.log(err)
            })
            break
        default:
            res.status(400).json({status:"post value isn't valid"})
            return
    }

    res.status(200).json({status:"ok"})
})

app.get("/",(req, res)=>{
    data.findAll({
        order:[['createdAt','DESC']]
    }).then((result)=>{
        res.send(result)
    }).catch((err)=>{
        res.send(err)
    })
})

app.delete("/:id/delete",(req, res)=>{
    const idText = req.params.id

    data.destroy({
        where : {id : idText}
    }).then((rowsDeleted) => {
        if (rowsDeleted > 0) {
            console.log('Column deleted successfully.');
        } else {
            console.log('No column found with the specified ID.');
        }
    }).catch((error) => {
            console.error('Error occurred while deleting column:', error);
    });

    res.status(200).json({status:"ok"})
})

const port = process.env.PORT || 3000
db.sequelize.sync().then(()=>{
    app.listen(port,function (){
        console.log(`listen ${port}`)
    });
})


