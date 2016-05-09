var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var axios = require('axios');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');

var CHANGE_EVENT = 'change';

var _store = {
  list: []
};

var tagStore = objectAssign({}, EventEmitter.prototype, {
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

var getTag = function(){
  axios.get('http://localhost:3000/tags/getTagpoints').then(function(res){
    _store.list = res.data;
    tagStore.emit(CHANGE_EVENT);
  }).catch(function(res){});
};

var addTag = function(tag){
  axios.put('http://localhost:3000/tags/addTagpoints',tag).then(function(res){ getTag();});
};

var removeTag = function(tag){
  if(_.isEmpty(tag)){
    axios.put('http://localhost:3000/tags/removeAll').then(function(res){ getTag();});
  }else{
    if(_.isEmpty(tag.positions)){
      axios.put('http://localhost:3000/tags/deleteATag',tag).then(function(res){ getTag();});
    }else{
      axios.put('http://localhost:3000/tags/updateATag',tag).then(function(res){ getTag();});
    }
  }
}

var modifyTag = function(index){
  _store.list.splice(index, 1);
}

AppDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){
    case appConstants.ADD_TAG:
      addTag(action.data);
      break;
    case appConstants.REMOVE_TAG:
      removeTag(action.data);
      break;
    case appConstants.GET_TAG:
      getTag();
      break;
    default:
      return true;
  }
});

module.exports = tagStore;
