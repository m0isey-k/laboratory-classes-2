const express = require('express');
const fileSystem = require("fs");
const path = require('path');
const bodyParser = require('body-parser');  
const { STATUS_CODE } = require("../constants/statusCode");
const { renderNewProductPage } = require('../views/renderNewProductPage'); 

const router = express.Router();


router.use(bodyParser.urlencoded({ extended: true }));


router.get('/add', (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'add-product.html'));
});


router.post('/add', (req, res) => {
  const { name, description } = req.body; 


  fileSystem.appendFile(
    path.join(__dirname, '../product.txt'),
    `${name}, ${description}\n`,
    (err) => {
      if (err) {
        return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send("Error saving product");
      }

      res.statusCode = STATUS_CODE.FOUND;
      res.setHeader("Location", "/product/new");  
      res.end();
    }
  );
});


router.get('/new', (req, res) => {
  fileSystem.readFile(path.join(__dirname, '../product.txt'), 'utf-8', (err, data) => {
    if (err) {
      return res.status(STATUS_CODE.NOT_FOUND).send("No products found");
    }

    res.send(renderNewProductPage(data));  
  });
});

module.exports = router;
