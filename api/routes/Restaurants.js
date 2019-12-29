const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Resto = mongoose.model("Restaurants");
const RestoAdds = mongoose.model("RestaurantsAddress");
router.get('/list',(req,res) =>{
    Resto.find({})
    .then((match)=>{
       res.status(200).json(match);
    })
    .catch((err) => console.log(err));
})
router.get('/search/:id',(req,res) =>{
    console.log(req.params);
    var id = parseInt(req.params.id)
    Resto.find({"Restaurant ID":id})
    .then((match)=>{
        console.log(match);
       res.status(200).json(match);
    })
    .catch((err) => console.log(err));
})
router.get('/sort/:order',(req,res) =>{
    Resto.find().sort({"price":req.params.order})
     .then((match)=>{
       res.status(200).json(match);
    })
    .catch((err) => console.log(err));

})
router.get('/address/:id',(req,res)=>{
    var id = parseInt(req.params.id)
    console.log(req.params);
    RestoAdds.find({"Restaurant ID":id})
    .then((match) =>{
        console.log(match);
        res.status(200).json(match)
    })
})
router.get('/rest_address/list',(req,res)=>{
    var id = parseInt(req.params.id)
    console.log(req.params);
    RestoAdds.find()
    .then((match) =>{
        console.log(match);
        res.status(200).json(match)
    })
})
module.exports = router;