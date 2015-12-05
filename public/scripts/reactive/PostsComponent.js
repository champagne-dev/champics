// *************** COMMENTS ***************
var CommentComponent = React.createClass({
  propTypes: {
    comment: React.PropTypes.object.isRequired
  },
  getInitialState: function(){
    return {};
  },
  componentDidMount: function(){

  },
  render: function(){
    return 
    (
      <div className="comment">
      </div>
    );
  }
})
// *************** POST ***************
var PostComponent = React.createClass({
  propTypes: {
    post: React.PropTypes.object.isRequired
  },
  getInitialState: function(){
    return {};
  },
  componentDidMount: function(){

  },
  render: function(){
    var _comments = [];
    for(var iteration in this.props.post.comments){
      var comment = this.props.post.comments[iteration];
      _comments.push(<CommentComponent comment={comment} />);
    }
    return (
      <div className="full-post">
        <div className="post">
          <img className="post-image" src={this.props.post.image_path}></img>
        </div>
        <div className="comments">
          {_comments}
        </div>
      </div>
    )
  },

})






// *************** CANVAS ***************
var DrawableCanvas = function(){
  var self = this;
  this.init = function(){
    self.canvas = self.renderCanvas();
    self.ctx = self.canvas.getContext('2d');
    $("#submitEditBtn").click(function(){
      self.save();
    });
    self.runDraw();
  }
  self.init();
}
var DrawableCanvasComponent = React.createClass({
  getInitialState: function(){
    var inherited_styles = {
      width: 200,
      height: 200,
      top: -1,
      left: -1
    }
    return {enabled: "false", inherited_styles: inherited_styles};
  },
  componentDidMount: function(){
    var canvas = this.getDOMNode();
    console.log(canvas);
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
    var canvas = this.getDOMNode();
    console.log(canvas.toDataURL("image/png"));
  }
  render: function() {
    var style = this.state.inherited_styles;
    style.zIndex = 2;
    style.position = "absolute";
    return (
      <canvas className="drawableCanvasComponent" style={style}>
      </canvas>
    )
  }
});
















// *************** FULL COMPONENT ***************
var PostsComponent = React.createClass({
  propTypes: {
    posts: React.PropTypes.array.isRequired,
  },
  getInitialState: function(){
    return {};
  },
  componentDidMount: function(){
  },
  render: function() {
    var _posts = [];
    var _canvas = <DrawableCanvasComponent />
    for (var iteration in this.props.posts){
        _posts.push(<PostComponent post={this.props.posts[iteration]}/>);
    }
    return (
      <div className="posts">
          {_canvas}
          {_posts}
      </div>
    )
  }
});