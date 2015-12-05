// *************** COMMENTS ***************
var CommentComponent = React.createClass({
  propTypes: {
    comment: React.PropTypes.object.isRequired,
    onHover: React.PropTypes.func.isRequired,
    onReply: React.PropTypes.func.isRequired,
    onDisable: React.PropTypes.func.isRequired,
    onClick: React.PropTypes.func.isRequired,
    tabs: React.PropTypes.number.isRequired,
    noReply: React.PropTypes.bool.isRequired
  },
  getInitialState: function(){
    return {"clicked": false};
  },
  componentDidMount: function(){

  },
  __onHover: function(){
    this.props.onHover(this.props.comment.id);
  },
  __onMouseOut: function(){
    if(!this.state.clicked)
      this.props.onDisable(this.props.comment.id);
  },
  __onClick: function(){
    if(this.props.comment.replied_id == -1){
      if(!this.state.clicked)
        this.props.onClick(this.props.comment.id);
      else
        this.props.onDisable(this.props.comment.id);
    }
  },
  __onReply: function(){
    this.props.onReply(this.props.comment.id);
  },
  render: function(){
    var author;
    if(this.props.comment.author)
      author = <h5 className="author">{this.props.comment.author}</h5>
    var style = {
      "paddingLeft": (this.props.tabs*20)+50
    }
    return (
      <div className="comment" onMouseOver={this.__onHover} onMouseOut={this.__onMouseOut} onClick={this.__onClick} style={style}>
        <h4 className="text">{this.props.comment.text}</h4>
        {author}
        <a className="reply" onClick={this.__onReply}>reply</a>
      </div>
    );
  },
})
// *************** POST ***************
var PostComponent = React.createClass({
  propTypes: {
    post: React.PropTypes.object.isRequired,
    onCommentReply: React.PropTypes.func.isRequired
  },
  getInitialState: function(){
    return {"comment_overlays": []};
  },
  componentDidMount: function(){

  },
  __addOverlay: function(comment_id){
    var _comment_overlays = this.state.comment_overlays;
    _comment_overlays.push(comment_id);
    this.setState({"comment_overlays": _comment_overlays});
  },
  __removeOverlay: function(comment_id){
    var _comment_overlays = this.state.comment_overlays;
    var index = _comment_overlays.indexOf(comment_id);
    if(index > -1){
      _comment_overlays.splice(index, 1);
      this.setState({"comment_overlays": _comment_overlays})
    }
  },
  __onCommentReply: function(comment_id){
    if(!parseInt(comment_id) && comment_id!=0)
      comment_id = -1; //top level
    var post = this.refs.post.getDOMNode();
    var inherited_styles = {
      width: post.offsetWidth,
      height: post.offsetHeight,
      top: post.offsetTop,
      left: post.offsetLeft
    }
    this.props.onCommentReply(inherited_styles, comment_id, this.props.post.id)
  },
  render: function(){
    var _commentsDOM = []
    _commentsDOM.push(<a className="reply" onClick={this.__onCommentReply}>reply</a>);
    if(this.props.post.comments){
      var _commentsOrdered = []
      var _commentsData = JSON.parse(JSON.stringify(this.props.post.comments));
      for(var iteration in _commentsData){
        var comment = _commentsData[iteration];
        if(!comment.noReply)
          _commentsData[iteration].noReply = false;
        if(comment.replied_id == -1){
          _commentsOrdered.push(iteration);
          _commentsData[iteration].tabs = 0;
        }
        else{
          if(_commentsData[comment.replied_id]){
            _commentsOrdered = CHAMPICS.utils.insertAfterKey(_commentsOrdered, comment.replied_id + "", iteration);
            for(var _c in _commentsData)
              if(_commentsData[_c].id == comment.replied_id)
                _commentsData[iteration].tabs = _commentsData[_c].tabs + 1;
          }
        }
      }
      var _overlays = [];
      for(var id in _commentsOrdered){
        var index = _commentsOrdered[id];
        if(parseInt(index)){
          var comment = _commentsData[parseInt(index)];
          if(this.state.comment_overlays.indexOf(comment.id) > -1){
            var _comments_overlaid = CHAMPICS.utils.buildCommentThread([comment],_commentsData, comment);
            for(var iterino in _comments_overlaid){
              var _comment_overlaid = _comments_overlaid[iterino];
              _overlays.push(<img className="overlay-image" src={"/"+_comment_overlaid.relative_url}></img>)
            }
          }
          _commentsDOM.push(<CommentComponent tabs={comment.tabs} noReply={comment.noReply} comment={comment} onHover={this.__addOverlay} onDisable={this.__removeOverlay} onClick={this.__addOverlay} onReply={this.__onCommentReply}/>);
        
        }
      }
    }
    return (
      <div className="full-post">
        <div className="post" ref="post">
          <img className="post-image" src={"/" + this.props.post.relative_url}></img>
          {_overlays}
        </div>
        <div className="comments">
          {_commentsDOM}
        </div>
      </div>
    )
  },

});

// *************** CANVAS ***************
var DrawableCanvasComponent = React.createClass({
  propTypes: {
    inherited_styles: React.PropTypes.object.isRequired,
    enabled: React.PropTypes.bool.isRequired,
    comment_id: React.PropTypes.number,
    post_id: React.PropTypes.number,
    onDisable: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired
  },
  getInitialState: function(){
    return {"comment_id": this.props.comment_id, "post_id": this.props.post_id, enabled: this.props.enabled, inherited_styles: this.props.inherited_styles, "drawing": true};
  },
  componentDidMount: function(){
    // $("#submitEditBtn").click(function(){
    //   self.save();
    // });
    if(this.props.enabled && this.state.drawing){
      var canvas = this.refs.canvas.getDOMNode();
      var ctx = canvas.getContext('2d');
      var fillColor = "red";
      var width = this.state.inherited_styles.width;
      var height = this.state.inherited_styles.height;
      canvas.width = width;
      canvas.height = height;
      // define a custom fillCircle method
      ctx.fillCircle = function(x, y, radius, fillColor) {
        this.fillStyle = fillColor;
        this.beginPath();
        this.moveTo(x, y);
        this.arc(x, y, radius, 0, Math.PI * 2, false);
        this.fill();
      };
      ctx.clearTo = function(fillColor) {
        ctx.fillStyle = fillColor;
      };
      ctx.clearTo(fillColor || "#ddd");
      // bind mouse events
      canvas.onmousemove = function(e) {
        if (!canvas.isDrawing) {
           return;
        }
        console.log(this.offsetLeft)
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        var radius = 10; // or whatever
        var fillColor = '#ff0000';
        ctx.fillCircle(x, y, radius, fillColor);
        console.log(x + " " + y)
      };
      canvas.onmousedown = function(e) {
        canvas.isDrawing = true;
      };
      canvas.onmouseup = function(e) {
        canvas.isDrawing = false;
      };
      canvas.onmouseleave = function(e) {
        canvas.isDrawing = false;
      }
    }
  },
  __onSave: function(){
    var canvas = this.refs.canvas.getDOMNode();
    console.log(canvas.toDataURL("image/png"));
  },
  __onDisable: function(){
    this.props.onDisable();
  },
  __onSubmitDrawing: function(){
    var canvas = this.refs.canvas.getDOMNode();
    CHAMPICS.misc.current_canvas_repr = canvas.toDataURL("image/png");
    this.setState({"drawing": false});
  },
  __onSubmitEdit: function(){
    var title = $('.writingPortion > .title-field').val();
    var name = $('.writingPortion > .name-field').val();
    this.props.onSubmit(this.state.comment_id, this.state.post_id, title, name);
  },
  render: function() {
    if(this.state.enabled){
      var style = this.state.inherited_styles;
      style.zIndex = 2;
      style.position = "absolute";
      var content;
      if(this.state.drawing)
        content = <div className="canvasContainer">
                    <canvas className="drawableCanvasComponent" ref="canvas" style={style}></canvas>
                    <a className="submit-btn" onClick={this.__onSubmitDrawing} style={{"position":"relative","left":-100}}>Submit Drawing</a>
                  </div>
      else
        content = <div className="writingPortion">
                    <textarea className="title-field"></textarea>
                    <input className="name-field"></input>
                    <a className="submit-btn" onClick={this.__onSubmitEdit}>Submit EDIT</a>
                  </div>
        return (
            <div className="editingContainer">
              {content}
              <a className="close" onClick={this.__onDisable} style={{"position":"relative","left":-100}}>Close</a>
            </div>
          )
    }
    else 
      return (
        <div className="phony"></div>
      )
  }
});

// *************** FULL COMPONENT ***************
var PostsComponent = React.createClass({
  propTypes: {
    posts: React.PropTypes.array.isRequired,
  },
  getInitialState: function(){
    var inherited_styles = {
      width: 200,
      height: 200,
      top: -1,
      left: -1
    }
    return {"canvas_inherited_styles": inherited_styles,"canvas_enabled":false};
  },
  componentDidMount: function(){
  },
  __enableCanvas: function(inherited_styles, comment_id, post_id){
    this.setState({"canvas_inherited_styles": inherited_styles,"canvas_enabled":true, "canvas_comment_id": comment_id, "canvas_post_id": post_id})
  },
  __disableCanvas: function(){
    console.log("close")
    this.setState({"canvas_enabled": false})
  },
  __onSubmitEdit: function(replied_id, post_id, title, author){
    this.__disableCanvas();
    var self = this;
    CHAMPICS.ajax.saveComment(replied_id, post_id, title, author, function(data){
      var saved_comment = {
        replied_id: replied_id,
        text: title,
        image: CHAMPICS.misc.current_canvas_repr,
        author: author,
        post_id: post_id,
        noReply: true,
        relative_url: data["results"][0]["relative_url"]
      }
      self.setState({"saved_comment":saved_comment})
    });

  },
  render: function() {
    var _posts = [];
    var _canvas = <DrawableCanvasComponent key={parseInt(this.state.canvas_comment_id) + this.state.canvas_enabled}comment_id={parseInt(this.state.canvas_comment_id)} post_id={this.state.canvas_post_id} enabled={this.state.canvas_enabled} inherited_styles={this.state.canvas_inherited_styles} onDisable={this.__disableCanvas} onSubmit={this.__onSubmitEdit}/>
    for (var iteration in this.props.posts){
        var post = JSON.parse(JSON.stringify(this.props.posts[iteration]));
        post.comments = post.comments || [];
        if(this.state.saved_comment && this.state.saved_comment.post_id == post.id){
          post.comments.push(this.state.saved_comment)
        }
        _posts.push(<PostComponent post={post} onCommentReply={this.__enableCanvas}/>);
    }
    return (
      <div className="posts">
          {_canvas}
          {_posts}
      </div>
    )
  }
});

CHAMPICS.reactive["PostsComponent"] = React.render(<PostsComponent posts={[CHAMPICS.data.current_post]}/>,document.getElementById("PostsComponent"))
