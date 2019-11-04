const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const bodyParser = require('body-parser');

// GENERAL CONFIG ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

const app = express()

app.use(cors())
app.set('json spaces', 40);
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'vazer',
    password: 'rosrtdz',
    database: 'database'
});

// FUNCTIONS ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

function SubCategoryRoot(SubCategoryID) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT CategoryID FROM SubCategories WHERE SubCategoryID = '${SubCategoryID}';`, function (err, rows, fields) {
            if (err)  { 
                reject(err);
            } else {
                resolve(rows[0].CategoryID);
            }
        });
    });
}

// ROUTES::GENERAL PURPOSE ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

app.get('/api/subtocat', (req, res) => {
    SubCategoryRoot(req.query.subcatid).then(result => {
        res.json(result);
    });
});

app.get('/api/categories', (req, res) => {
    connection.query('SELECT * FROM Categories;', function (err, rows, fields) {
        if (err)  { 
            console.error('error connecting: ' + err.stack);
        } else {
            res.json(rows)
        }
    });
});

app.get('/api/subcategories', (req, res) => {
    connection.query('SELECT * FROM SubCategories;', function (err, rows, fields) {
        if (err)  { 
            console.error('error connecting: ' + err.stack);
        } else {
            res.json(rows)
        }
    });
});

app.get('/api/categorysubcategories', (req, res) => {
    connection.query(`SELECT * FROM SubCategories WHERE CategoryID = '${req.query.catid}';`, function (err, rows, fields) {
        if (err)  { 
            console.error('error connecting: ' + err.stack);
        } else {
            res.json(rows)
        }
    });
});

app.get('/api/search', (req, res) => {
    connection.query(`SELECT * FROM Products WHERE ProductName LIKE '%${req.query.query}%';`, function (err, rows, fields) {
        if (err)  { 
            console.error('error connecting: ' + err.stack);
        } else {
            res.json(rows)
        }
    });
});

// ROUTES::CREATE/READ/UPDATE/DELETE ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

app.get('/api/products', (req, res) => {
    connection.query(`SELECT  ProductID,  ProductName,  ProductPrice, ProductImage,  ProductSubCategory, ProductQty, ProductAvailable FROM Products WHERE ProductSubCategory = '${req.query.subcatid}';`, function (err, rows, fields) {
        if (err)  { 
            console.error('error connecting: ' + err.stack);
        } else {
            res.json(rows)
        }
    });
});

app.put('/api/product', (req, res) => {
    connection.query(`UPDATE Products SET ProductName = '${req.body.name}', ProductPrice ='${req.body.price}', ProductImage ='${req.body.image}', ProductSubCategory ='${req.body.subcat}', ProductQty ='${req.body.qty}', ProductAvailable ='${req.body.available}' WHERE  ProductID = '${req.body.productid}';`, function (err, rows, fields) {
        if (err)  { 
            console.error('error connecting: ' + err.stack);
        } else {
            res.json(rows)
        }
    });
});

app.post('/api/product', (req, res) => {
    connection.query(`INSERT INTO Products (ProductName, ProductPrice, ProductImage, ProductSubCategory, ProductQty, ProductAvailable) VALUES ('${req.body.name}', '${req.body.price}', '${req.body.image}', '${req.body.subcat}', '${req.body.qty}', '${req.body.available}');`, function (err, rows, fields) {
        if (err)  { 
            console.error('error connecting: ' + err.stack);
        } else {
            res.json(rows)
        }
    });
});

app.delete('/api/product/:id', (req, res) => {
    connection.query(`DELETE FROM Products WHERE ProductID=${req.params.id};`, function (err, rows, fields) {
        if (err)  { 
            console.error('error connecting: ' + err.stack);
        } else {
            res.json(rows)
        }
    });
});

app.get('/', function (req, res) {
    res.send('Suitism Server v1.0')
});

app.listen(3333, () => { console.log("Suitima Server v1.0") });