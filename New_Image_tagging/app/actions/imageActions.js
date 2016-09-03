var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');

var imageActions = {
  addImage: function(file){
    AppDispatcher.handleAction({
      actionType: appConstants.ADD_IMAGE,
      data: file
    });
  },
  getImages: function(){
	AppDispatcher.handleAction({
      actionType: appConstants.GET_IMAGE
    });
  }
};

module.exports = imageActions;
