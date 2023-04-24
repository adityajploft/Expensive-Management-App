const express = require('express');

const { getAllTransection , addAllTransection , editAllTransection , deleteAllTransection} = require('../Controller/TranstionController')
// Router Object 
const router = express.Router()
// addtranstion Post
router.post("/add-transection",addAllTransection)
// Edittranstion Post
router.post("/edit-transection", editAllTransection)
// delete
router.post("/delete-transection", deleteAllTransection)

router.post("/get-transection", getAllTransection )


module.exports = router