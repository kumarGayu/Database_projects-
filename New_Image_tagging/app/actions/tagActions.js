var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');

var tagActions = {
  addTag: function(tag){
    AppDispatcher.handleAction({
      actionType: appConstants.ADD_TAG,
      data: tag
    });
  },
  modifyTag: function(tag){
    AppDispatcher.handleAction({
      actionType: appConstants.REMOVE_TAG,
      data: tag
    })
  },
  getTag: function(){
    AppDispatcher.handleAction({
      actionType: appConstants.GET_TAG
    })
  },
  removeTag: function(tag){
    AppDispatcher.handleAction({
      actionType: appConstants.REMOVE_TAG,
      data: tag
    })
  },
  removeAll: function(){
    AppDispatcher.handleAction({
      actionType: appConstants.REMOVE_TAG,
      data: {}
    })
  }
};

module.exports = tagActions;
