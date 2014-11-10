'use strict';

var ModelMapper = (function() {

  var _mapToJSON = function(data) {

    var jsonData = {
      "title": data.title,
      "author": data.author,
      "urlType": data.urlType
    };
/*
    switch (data) {
      case (data.prototype.name === 'PostModelVideo'):
            break;

      case (data instanceof PostModelAudio):
            break;

      case (data instanceof PostModelLink):
            break;
    };
*/
    return jsonData;
  };

  var _mapToModel = function(data) {
    return JSON.stringify(data);
  };

  var _createPostVideoJSON = function(data) {
  };

  return {
    mapToJSON: _mapToJSON,
    mapToModel: _mapToModel
  };
})();
