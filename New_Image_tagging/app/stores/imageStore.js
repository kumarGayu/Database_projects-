 var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('object-assign');
var axios = require('axios');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');

var CHANGE_EVENT = 'change';

var _store = {
  list: []
};

var imageStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb){
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb){
    this.removeListener(CHANGE_EVENT, cb);
  },
  getList: function(){
    return _store.list;
  }
});

var getImages = function(){
  axios.get('http://localhost:3000/images/getImages').then(function(res){
    _store.list = res.data;
    imageStore.emit(CHANGE_EVENT);
  }).catch(function(res){});
};


var addImage = function(file){
  axios.put('http://localhost:3000/images/addImages',file);
};


AppDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){
    case appConstants.ADD_IMAGE:
      addImage(action.data);
      break;
	case appConstants.GET_IMAGE:
      getImages();
      break;
    default:
      return true;
  }
});

module.exports = imageStore;
