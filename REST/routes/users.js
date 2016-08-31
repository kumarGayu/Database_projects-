var express = require('express');
var _ = require('lodash');
var router = express.Router();

/*
 * GET userlist.
 */
router.get('/getTagPoints', function(req, res) {
    var db = req.db;
    var collection = db.get('Tagpoints');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

router.put('/addTagpoints', function(req, res) {
	//console.log(req);
    // Set our internal DB variable
    var db = req.db;
    // Set our collection
    var collection = db.get('Tagpoints');
    // Submit to the DB
    collection.insert(req.body, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.send("successfully added"+req.params.positions);
        }
    });
});

router.put('/deleteATag', function(req, res) {
    // console.dir(req);
    //console.log(req);
    // Set our internal DB variable
    var db = req.db;
    // Set our collection
    var collection = db.get('Tagpoints');
    //console.dir(req.params);
    // Submit to the DB
    collection.remove(
        { _id: req.body._id },
        function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.send("successfully deleted"+ req.body._id+"^^^"+req.body.tag);
        }
    });
});

router.put('/updateATag', function(req, res) {
    // console.dir(req);
    //console.log(req);
    // Set our internal DB variable
    var db = req.db;
    // Set our collection
    var collection = db.get('Tagpoints');
    //console.dir(req.params);
    // Submit to the DB
    collection.update(
        { _id: req.body._id },
        {
            $set:{
                positions:req.body.positions
            }
        },
        function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.send("successfully deleted"+ req.body._id+"^^^"+req.body.tag);
        }
    });
});

router.put('/removeAll', function(req, res) {
    // console.dir(req);
    //console.log(req);
    // Set our internal DB variable
    var db = req.db;
    // Set our collection
    var collection = db.get('Tagpoints');
    //console.dir(req.params);
    // Submit to the DB
    collection.remove(
        {},
        function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.send("successfully deleted"+ req.body._id+"^^^"+req.body.tag);
        }
    });
});

module.exports = router;