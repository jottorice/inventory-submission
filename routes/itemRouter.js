console.log('Loaded itemRouter');

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Items = require('../models/items');

var itemRouter = express.Router();
itemRouter.use(bodyParser.json());

//var Verify = require('./verify');

itemRouter.route('/')
.all(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 })

.get(function (req, res, next) {
    console.log('In .get');
    Items.find(req.query)
        .exec(function (err, item) {
        if (err) throw err;
        res.json(item);
    });
})

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

.delete(/*Verify.verifyOrdinaryUser, Verify.verifyAdmin,*/ function (req, res, next) {
    Items.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

itemRouter.route('/:itemId')
.all(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 })

.get(/*Verify.verifyOrdinaryUser,*/ function (req, res, next) {
    Items.findById(req.params.itemId)
        .populate('comments.postedBy')
        .exec(function (err, item) {
        if (err) throw err;
        res.json(item);
    });
})

.put(/*Verify.verifyOrdinaryUser, Verify.verifyAdmin,*/ function (req, res, next) {
    Items.findByIdAndUpdate(req.params.itemId, {
        $set: req.body
    }, {
        new: true
    }, function (err, item) {
        if (err) throw err;
        res.json(item);
    });
})

.delete(/*Verify.verifyOrdinaryUser, Verify.verifyAdmin,*/ function (req, res, next) {
        Items.findByIdAndRemove(req.params.itemId, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

//itemRouter.route('/:itemId/comments')
////.all(Verify.verifyOrdinaryUser)
//
//.get(function (req, res, next) {
//    Items.findById(req.params.itemId)
////        .populate('comments.postedBy')
//        .exec(function (err, item) {
//        if (err) throw err;
//        res.json(item.comments);
//    });
//})
//
//.post(function (req, res, next) {
//    Items.findById(req.params.itemId, function (err, item) {
//        if (err) throw err;
//        req.body.postedBy = req.decoded._doc._id;
////        item.comments.push(req.body);
//        item.save(function (err, item) {
//            if (err) throw err;
//            console.log('Updated Comments!');
//            res.json(item);
//        });
//    });
//})
//
//.delete(Verify.verifyAdmin, function (req, res, next) {
//    Items.findById(req.params.itemId, function (err, item) {
//        if (err) throw err;
//        for (var i = (item.comments.length - 1); i >= 0; i--) {
//            item.comments.id(item.comments[i]._id).remove();
//        }
//        item.save(function (err, result) {
//            if (err) throw err;
//            res.writeHead(200, {
//                'Content-Type': 'text/plain'
//            });
//            res.end('Deleted all comments!');
//        });
//    });
//});
//
//itemRouter.route('/:itemId/comments/:commentId')
//.all(Verify.verifyOrdinaryUser)
//
//.get(function (req, res, next) {
//    Items.findById(req.params.itemId)
//        .populate('comments.postedBy')
//        .exec(function (err, item) {
//        if (err) throw err;
//        res.json(item.comments.id(req.params.commentId));
//    });
//})
//
//.put(function (req, res, next) {
//    // We delete the existing commment and insert the updated
//    // comment as a new comment
//    Items.findById(req.params.itemId, function (err, item) {
//        if (err) throw err;
//        item.comments.id(req.params.commentId).remove();
//                req.body.postedBy = req.decoded._doc._id;
//        item.comments.push(req.body);
//        item.save(function (err, item) {
//            if (err) throw err;
//            console.log('Updated Comments!');
//            res.json(item);
//        });
//    });
//})
//
//.delete(function (req, res, next) {
//    Items.findById(req.params.itemId, function (err, item) {
//        if (item.comments.id(req.params.commentId).postedBy
//           != req.decoded._doc._id) {
//            var err = new Error('You are not authorized to perform this operation!');
//            err.status = 403;
//            return next(err);
//        }
//        item.comments.id(req.params.commentId).remove();
//        item.save(function (err, resp) {
//            if (err) throw err;
//            res.json(resp);
//        });
//    });
//});

module.exports = itemRouter;
