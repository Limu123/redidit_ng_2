'use strict';

var DataModel = (function() {

  //Post
  function PostModelBase (data) {
    if (data) {
      this.title = data.title || '';
      this.url = data.url || '';
      this.description = data.description || '';

      this.author = data.author || '';
      this.authorUID = data.authorUID || '';
      this.time = data.time || '';

      this.views = data.views || 0;
      this.votes = data.votes || 0;
    }
  }

  function PostModelLink(data) {
    PostModelBase.call(this, data);
    this.urlType = 'link';
  }
  PostModelLink.prototype = new PostModelBase();

  function PostModelVideo(data) {
    PostModelBase.call(this, data);
    this.urlType = 'video';
  }
  PostModelVideo.prototype = new PostModelBase();

  function PostModelAudio(data) {
    PostModelBase.call(this, data);
    this.urlType = 'audio';
  }
  PostModelAudio.prototype = new PostModelBase();

  function PostModelText(data) {
    PostModelBase.call(this, data);
    if (data) {
      this.text = data.text || '';
    };
    this.urlType = 'text';
  }
  PostModelText.prototype = new PostModelBase();

  function PostModelImage(data) {
    PostModelBase.call(this, data);
    this.urlType = 'image';
  }
  PostModelImage.prototype = new PostModelBase();

  //Comment
  function CommentModel(data) {
    if (data) {
      this.postId = data.postId;
      this.commentText = data.commentText;

      this.author = data.author || '';
      this.authorUID = data.authorUID || '';

      this.votes = data.votes || 0;
    }
  }

  //Votes
  function PostVoteModel(data) {
    if (data) {
      this.postId = data.postId || '';
      this.authorUID = data.authorUID || '';
      this.vote = data.vote || 0;
    }
  }

  function CommentVoteModel(data) {
    if (data) {
      this.commentId = data.commentId || '';
      this.postId = data.postId || '';
      this.authorUID = data.authorUID || '';
      this.vote = data.vote || 0;
    }
  }


  var _createPostModelLink = function(data) {
    var postModelLink = new PostModelLink(data);
    return postModelLink;
  };

  var _createPostModelVideo = function(data) {
    var postModelVideo = new PostModelVideo(data);
    return postModelVideo;
  };

  var _createPostModelAudio = function(data) {
    var postModelAudio = new PostModelAudio(data);
    return postModelAudio;
  };

  var _createPostModelText = function (data) {
    var postModelText = new PostModelText(data);
    return postModelText;
  };

  var _createPostModelImage = function(data) {
    var postModelImage = new PostModelImage(data);
    return postModelImage;
  };


  var _createCommentModel = function(data) {
    var commentModel = new CommentModel(data);
    return commentModel;
  };


  var _createPostVoteModel = function(data) {
    var postVoteModel = new PostVoteModel(data);
    return postVoteModel;
  }

  var _createCommentVoteModel = function(data) {
    var commentVoteModel = new CommentVoteModel(data);
    return commentVoteModel;
  }

  return {
    createPostModelLink: _createPostModelLink,
    createPostModelVideo: _createPostModelVideo,
    createPostModelAudio: _createPostModelAudio,
    createPostModelText: _createPostModelText,
    createPostModelImage: _createPostModelImage,

    createCommentModel: _createCommentModel,

    createPostVoteModel: _createPostVoteModel,
    createCommentVoteModel: _createCommentVoteModel
  };

})();
