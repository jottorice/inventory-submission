// Main router

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Items = require('../models/items');

var itemRouter = express.Router();
itemRouter.use(bodyParser.json());

// Route /items
itemRouter.route('/')
.all(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 })

// GET /items
// Get all items as a JSON list of dictionaries
.get(function (req, res, next) {
    console.log('In .get');
    Items.find(req.query)
        .exec(function (err, item) {
        if (err) throw err;
        res.json(item);
    });
})

// POST /items
// Create a new item
.post(function (req, res, next) {
    console.log('In .post');
    Items.create(req.body, function (err, item) {
        console.log("In POST create body");
        console.log("err", err);
        console.log("item", item);
        if (err) throw err;
        console.log('Item created!');
        var id = item._id;
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });

        res.end('Added the item with id: ' + id);
    });
})

// DELETE /items
// Delete all items
.delete(function (req, res, next) {
    Items.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});


// Route /items/:itemid
itemRouter.route('/:itemId')
.all(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 })

// GET /items/:itemid
// Return a single item, referenced by id
.get(function (req, res, next) {
    Items.findById(req.params.itemId)
        .exec(function (err, item) {
        if (err) throw err;
        res.json(item);
    });
})

// PUT /items/:itemid
// Update a single item, referenced by id
.put(function (req, res, next) {
    Items.findByIdAndUpdate(req.params.itemId, {
        $set: req.body
    }, {
        new: true
    }, function (err, item) {
        if (err) throw err;
        res.json(item);
    });
})

// DELETE /items/:itemid
// Delete a single item, referenced by id
.delete(function (req, res, next) {
        Items.findByIdAndRemove(req.params.itemId, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

module.exports = itemRouter;
