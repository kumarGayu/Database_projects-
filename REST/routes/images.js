var express = require('express');
var _ = require('lodash');
var router = express.Router();

/*
 * GET userlist.
 */
router.get('/getImages', function(req, res) {
    var db = req.db;
    var collection = db.get('Images');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

router.put('/addImages', function(req, res) {
	//console.log(req);
    // Set our internal DB variable
    var db = req.db;
    // Set our collection
    var collection = db.get('Images');
    // Submit to the DB
    collection.insert(req.body, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.send("successfully added"+req.params);
        }
    });
});

module.exports = router;