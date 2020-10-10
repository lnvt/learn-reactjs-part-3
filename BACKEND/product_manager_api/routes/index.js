var express = require('express');
var router = express.Router();

const { Pool, Client } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sanpham',
  password: 't19081999T',
  port: 1908,
})

router.get('/', function (req, res, next) { });

// api get data from postgreSQL
router.get('/getData01', function (req, res, next) {
  //https://stackoverflow.com/questions/18310394/no-access-control-allow-origin-node-apache-port-issue
  // Website you wish to allow to connect
  // res.setHeader('Access-Control-Allow-Origin', '*');
  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // res.setHeader('Access-Control-Allow-Credentials', true);




  pool.query('SELECT * FROM product_info', (error, response) => {
    // console.log(response.rows);  
    if(error){ console.log(error) }
    else res.send(response.rows);
  })
  //Xoá dòng lệnh pool.end
});


router.get('/add', function (req, res, next) { 
  res.render('add',{});
});

router.post('/add', function (req, res, next) { 
  var product_name = req.body.product_name,
  product_price = req.body.product_price,
  image = req.body.image;
  pool.query("INSERT INTO product_info (product_name,product_price,image) values ($1,$2,$3)",[product_name,product_price,image], (err,response) => {
    if(err) {
      res.send(err);
      res.send(0);
    }
    else {
      //res.send('Insert du lieu thanh cong ' + product_name +" : "+product_price +" : "+ image);}
      res.send(1)}
  });
});

module.exports = router;
