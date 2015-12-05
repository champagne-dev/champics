// *************** COMMENTS ***************
var CommentComponent = React.createClass({
  propTypes: {
    comment: React.PropTypes.object.isRequired,
    onHover: React.PropTypes.func.isRequired,
    onReply: React.PropTypes.func.isRequired,
    onDisable: React.PropTypes.func.isRequired,
    onClick: React.PropTypes.func.isRequired
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
    var user;
    if(this.props.comment.user)
      user = <h5 className="user">{this.props.comment.user}</h5>
    return 
    (
      <div className="comment" onMouseOver={this.__onHover} onMouseOut={this.__onMouseLeave} onClick={this.__onClick}>
        <div className="text">{this.props.comment.text}</div>
        {user}
        <a className="reply" onClick={this.__onReply}></a>
      </div>
    );
  }
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
    var post = this.refs.post.getDOMNode();
    var inherited_styles = {
      width: post.offsetWidth,
      height: post.offsetHeight,
      top: post.offsetTop,
      left: post.offsetLeft
    }
    this.props.onCommentReply(comment_id, inherited_styles)
  },
  render: function(){
    var _comments = [];
    var _overlays = [];
    for(var iteration in this.props.post.comments){
      var comment = this.props.post.comments[iteration];
      if(this.state.comment_overlays.indexOf(comment.id) > -1)
        _overlays.push(<img className="overlay-image" src={comment.image_path}></img>)
      _comments.push(<CommentComponent comment={comment} onHover={this.__addOverlay} onDisable={this.__removeOverlay} onClick={this.__addOverlay} onReply={this.props.onCommentReply}/>);
    }
    return (
      <div className="full-post">
        <div className="post" ref="post">
          <img className="post-image" src={this.props.post.image_path}></img>
          {_overlays}
        </div>
        <div className="comments">
          {_comments}
        </div>
      </div>
    )
  },

})






// *************** CANVAS ***************
var DrawableCanvasComponent = React.createClass({
  propTypes: {
    inherited_styles: React.PropTypes.object.isRequired,
    enabled: React.PropTypes.bool.isRequired,
    onDisable: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired
  }
  getInitialState: function(){
    return {enabled: this.props.enabled, inherited_styles: this.props.inherited_styles, "drawing": true};
  },
  componentDidMount: function(){
    // $("#submitEditBtn").click(function(){
    //   self.save();
    // });
    var canvas = this.refs.canvas.getDOMNode();
    var ctx = canvas.getContext('2d');
    var fillColor = "red";
    var width = this.state.inherited_styles.width;
    var height = this.state.inherited_styles.height;
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
      var x = e.pageX - this.offsetLeft;
      var y = e.pageY - this.offsetTop;
      var radius = 10; // or whatever
      var fillColor = '#ff0000';
      ctx.fillCircle(x, y, radius, fillColor);
    };
    canvas.onmousedown = function(e) {
      canvas.isDrawing = true;
    };
    canvas.onmouseup = function(e) {
      canvas.isDrawing = false;
    };
  },
  __onSave: function(){
    var canvas = this.refs.canvas.getDOMNode();
    console.log(canvas.toDataURL("image/png"));
  },
  __onDisable: function(){
    this.props.onDisable();
  },
  __onSubmitDrawing: function(){

  },
  __onSubmitEdit: function(){
    this.props.onSubmit(title, name, image);
  },
  render: function() {
    var container;
    if(this.state.enabled){
      var style = this.state.inherited_styles;
      style.zIndex = 2;
      style.position = "absolute";
      var content;
      if(this.state.drawing)
        content = <div className="canvasContainer">
                    <canvas className="drawableCanvasComponent" ref="canvas"></canvas>
                    <a className="submit-btn" onClick={this.__onSubmitDrawing}></a>
                  </div>
      else
        content = <div className="writingPortion">
                    <textarea className="title-field"></textarea>
                    <input className="name-field"></input>
                    <a className="submit-btn" onClick={this.__onSubmitEdit}></a>
                  </div>
      container = 
        <div className="editingContainer" style={style}>
          {content}
          <a className="close" onClick={this.__onDisable}></a>
        </div>
    }
    return (
      {container}
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
  __enableCanvas: function(inherited_styles){
    this.setState({"canvas_inherited_styles": inherited_styles,"canvas_enabled":false})
  },
  __disableCanvas: function(){
    this.setState({"canvas_enabled": false})
  },
  render: function() {
    var _posts = [];
    var _canvas = <DrawableCanvasComponent enabled={this.state.canvas_enabled} inherited_styles={this.state.canvas_inherited_styles} onDisable={this.__disableCanvas}/>
    for (var iteration in this.props.posts){
        _posts.push(<PostComponent post={this.props.posts[iteration]} onCommentReply={this.__enableCanvas}/>);
    }
    return (
      <div className="posts">
          {_canvas}
          {_posts}
      </div>
    )
  }
});
CHAMPICS.reactive["postsComponent"] = React.render(<PostsComponent posts={[]}/>,document.getElementById("postsComponent"))