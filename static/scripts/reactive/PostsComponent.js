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
    return {"clicked": false, "voting_disabled": false, "vote_count": this.props.comment.score};
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
  __onUpvote: function(){
    CHAMPICS.ajax.upvoteComment(this.props.comment.id, function(data){
      console.log(data)
    })
    var vote_count = this.state.vote_count;
    this.setState({"vote_count": parseInt(vote_count)+1, "voting_disabled": true})
  },
  __onDownvote: function(){
    CHAMPICS.ajax.downvoteComment(this.props.comment.id, function(data){
      console.log(data)
    })
    var vote_count = this.state.vote_count;
    this.setState({"vote_count": parseInt(vote_count)-1, "voting_disabled": true})
  },
  render: function(){
    var author;
    if(this.props.comment.author)
      author = <label className="author">{this.props.comment.author}</label>
    var style = {
      "paddingLeft": (this.props.tabs*20)+50
    }
    var voting;
    var votingClass = "";
    var votingWidgetClass = "";
    if(this.state.voting_disabled)
      votingClass=" hidden"
    if(this.props.comment.replied_id != -1) // If it's top level
      votingWidgetClass = " hidden"
    voting = <div className={"voting-widget"+votingWidgetClass}>
              <a className={"upvote vote_element fa fa-caret-up"+votingClass} onClick={this.__onUpvote}></a>
              <h5 className="vote_count vote_element">{this.state.vote_count}</h5>
              <a className={"downvote vote_element fa fa-caret-down"+votingClass} onClick={this.__onDownvote}></a>
             </div>
    return (
      <div className="comment" onMouseOver={this.__onHover} onMouseOut={this.__onMouseOut} onClick={this.__onClick} style={style}>
        {voting}
        <h4 className="text">{this.props.comment.text}</h4>
        {author}<label className="separator">&nbsp;|&nbsp;</label>
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
    _commentsDOM.push(
                      <span className="subHeader">
                        <a className="reply" onClick={this.__onCommentReply}>
                          <i className="fa fa-plus"></i> Reply
                        </a>
                        <label className="hint">*hover comment to see drawing</label>
                        <label className="caption">&rdquo;{this.props.post.name}&rdquo;</label>
                      </span>
                      );
    if(this.props.post.comments){
      var _commentsOrdered = []
      var _commentsData = JSON.parse(JSON.stringify(this.props.post.comments));
      var _commentsNewData = {};
      for(var ity in _commentsData)
        _commentsNewData[_commentsData[ity]["id"]] = _commentsData[ity];
      _commentsData = _commentsNewData;
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
var CanvasEditButton = React.createClass({
  propTypes: {
    type: React.PropTypes.number.isRequired, // 0 for color, 1 for stroke size
    extra: React.PropTypes.string,
    onClick: React.PropTypes.func,
    isActive: React.PropTypes.bool
  },
  getInitialState: function(){
    return {};
  },
  __onClick:function(event){
    this.props.onClick(this.props.type, this.props.extra);
    var s = '.edit-btn.active'+this.props.type;
    $('.edit-btn.active'+this.props.type).removeClass('active'+this.props.type);
    $(event.target).addClass('active'+this.props.type);  
  },
  render: function(){
    var className = "";
    var style = {
      backgroundColor: "#222",
      borderRadius: "50%",
      width: "30px",
      height: "30px",
      position: "relative"
    };
    if(this.props.type == 0){
      style["backgroundColor"] = this.props.extra;
    }
    else{
      style["width"] = this.props.extra+"px";
      style["height"] = this.props.extra+"px";
      style["left"] = (30-parseInt(this.props.extra))/2+"px";
    }
    if(this.props.isActive)
      className= "active"+this.props.type
    return (
            <a className={"edit-btn " + className} onClick={this.__onClick} style={style}></a>
    );
  }
})
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
    return {"stroke_color":"green", "stroke_width":7.5, "comment_id": this.props.comment_id, "post_id": this.props.post_id, enabled: this.props.enabled, inherited_styles: this.props.inherited_styles, "drawing": true};
  },
  componentDidMount: function(){
    // $("#submitEditBtn").click(function(){
    //   self.save();
    // });
    if(this.props.enabled && this.state.drawing){
      var self = this;
      var canvas = this.refs.canvas.getDOMNode();
      var ctx = canvas.getContext('2d');
      var fillColor = "red";
      var width = this.state.inherited_styles.width;
      var height = this.state.inherited_styles.height;
      var last_point = null
      canvas.width = width;
      canvas.height = height;
      // define a custom fillCircle method
      ctx.fillCircle = function(x, y, radius, fillColor) {
        this.fillStyle = fillColor;
        this.beginPath();
        this.moveTo(x, y);
        this.arc(x, y, radius/2, 0, Math.PI * 2, false);
        this.fill();
        if(last_point){
          this.beginPath();
          this.moveTo(last_point.x, last_point.y);
          this.lineTo(x,y);
          this.strokeStyle = fillColor;
          this.lineWidth = radius;
          this.stroke();
        }
        last_point = {"x":x,"y":y}
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
        var x = e.pageX - $('.editingContainer').offset().left - this.offsetLeft;
        var y = e.pageY - $('.editingContainer').offset().top - this.offsetTop;
        var radius = self.state.stroke_width; // or whatever
        var fillColor = self.state.stroke_color;
        ctx.fillCircle(x, y, radius, fillColor);
      };
      canvas.onmousedown = function(e) {
        canvas.isDrawing = true;
      };
      canvas.onmouseup = function(e) {
        canvas.isDrawing = false;
        last_point = null;
      };
      canvas.onmouseleave = function(e) {
        canvas.isDrawing = false;
        last_point = null;
      }
    }
    $(".editingContainer").addClass("animated").addClass("slideDown");
    $(".comments").css("top", $(".post").position().top+$(".post").outerHeight(true))
    $(window).scroll(function(){
      var comments = $(".comments");
      var post = $(".post");
      var editingContainer = $(".editingContainer");

      if (window.pageYOffset > 25) {
        if (CHAMPICS.canvasDisabled) {
            setTimeout(function(){
              $(".comments").css("top", $(".post").position().top+$(".post").outerHeight(true))
              CHAMPICS.canvasDisabled = false;
            }, 600)
            
        }
        if (!comments.hasClass("pinned")) {
            comments.addClass("pinned");
        } 
        if (post.hasClass("slideDown") || !post.addClass("slideUp")) {
          post.addClass("slideUp");
          post.removeClass("slideDown");
          editingContainer.addClass("slideUp");
          editingContainer.removeClass("slideDown");
          
        }
      } else {
        if (CHAMPICS.canvasDisabled) {
          setTimeout(function(){
            $(".comments").css("top", $(".post").position().top+$(".post").outerHeight(true))
            CHAMPICS.canvasDisabled = false;
          }, 600)
        }
        if (comments.hasClass("pinned")) {
            comments.removeClass("pinned");
        } 
        if (post.hasClass("slideUp") || !post.addClass("slideDown")) {
          post.addClass("slideDown");
          post.removeClass("slideUp");
          editingContainer.addClass("slideDown");
          editingContainer.removeClass("slideUp");
          
        }
      }
    });
  },
  __changeEditingTool: function(type, extra){
    if(type==0)
      this.setState({"stroke_color": extra})
    else
      this.setState({"stroke_width": extra})
  },
  __onSave: function(){
    var canvas = this.refs.canvas.getDOMNode();
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
      style.zIndex = 1000;
      style.position = "absolute";
      var content;
      var btns;
      var close_btn = <a className="close btn-form fa fa-times" onClick={this.__onDisable}></a>
      var submit_btn = <a className="submit btn-form fa fa-check" onClick={this.__onSubmitDrawing}></a>
      var writing_class = ""
      if(this.state.drawing){
        btns = <div className="control-btns">
                  {submit_btn}
                  {close_btn}
               </div>
        writing_class = " hidden";
      }
      else
        btns = <div className="control-btns">
                  {close_btn}
               </div>
      writing_form = <div className={"writingPortion"+writing_class}>
                      <textarea className="title-field  input-form" placeholder="Comment"></textarea>
                      <input className="name-field input-form" placeholder="Name"></input>
                      <a className="submit-btn btn-form" onClick={this.__onSubmitEdit}>COMMENT</a>
                     </div>
      canvas_tools = <div className="canvasContainer">
                      <canvas className="drawableCanvasComponent" ref="canvas"></canvas>
                      <div className="edit-buttons">
                        <CanvasEditButton type={0} extra="red" onClick={this.__changeEditingTool}/>
                        <CanvasEditButton type={0} extra="blue" onClick={this.__changeEditingTool}/>
                        <CanvasEditButton isActive={true} type={0} extra="green" onClick={this.__changeEditingTool}/>
                        <CanvasEditButton type={1} extra={30} onClick={this.__changeEditingTool}/>
                        <CanvasEditButton type={1} extra={20} onClick={this.__changeEditingTool}/>
                        <CanvasEditButton isActive={true} type={1} extra={10} onClick={this.__changeEditingTool}/>
                      </div>
                     </div>
        return (
            <div className="editingContainer">
              {canvas_tools}
              {writing_form}
              {btns}
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
    return {"canvas_inherited_styles": inherited_styles,"canvas_enabled":false, "posts":this.props.posts};
  },
  componentDidMount: function(){
    
    var interval = setTimeout(function(){
      $(".comments").css("top", $(".post").position().top+$(".post").outerHeight(true))
    }, 700)
    $(".comments").css("top", $(".post").position().top+$(".post").outerHeight(true))
    $(".post").addClass("animated").addClass("slideDown");

    $(window).scroll(function(){
      clearInterval(interval);
      var comments = $(".comments");
      var post = $(".post");
      var editingContainer = $(".editingContainer");

      if (window.pageYOffset > 25) {
        if (!comments.hasClass("pinned")) {
            comments.addClass("pinned");
        } 
        if (post.hasClass("slideDown") || !post.addClass("slideUp")) {
          post.addClass("slideUp");
          post.removeClass("slideDown");
          editingContainer.addClass("slideUp");
          editingContainer.removeClass("slideDown");
          
        }
      } else {
        if (comments.hasClass("pinned")) {
            comments.removeClass("pinned");
        } 
        if (post.hasClass("slideUp") || !post.addClass("slideDown")) {
          post.addClass("slideDown");
          post.removeClass("slideUp");
          editingContainer.addClass("slideDown");
          editingContainer.removeClass("slideUp");
          
        }
      }
    });
  },
  __enableCanvas: function(inherited_styles, comment_id, post_id){
    this.setState({"canvas_inherited_styles": inherited_styles,"canvas_enabled":true, "canvas_comment_id": comment_id, "canvas_post_id": post_id})
  },
  __disableCanvas: function(){
    CHAMPICS.canvasDisabled = true; 
    this.setState({"canvas_enabled": false})
  },
  __onSubmitEdit: function(replied_id, post_id, title, author){
    this.__disableCanvas();
    var self = this;
    CHAMPICS.ajax.saveComment(replied_id, post_id, title, author, function(data){
      var posts = JSON.parse(JSON.stringify(self.state.posts));
      var highest_id = 0;
      for(var id in posts)
        for(var itsy in posts[id]["comments"])
          if(parseInt(posts[id]["comments"][itsy]["id"])>highest_id)
            highest_id = parseInt(posts[id]["comments"][itsy]["id"]);
      var saved_comment = {
        replied_id: replied_id,
        text: title,
        image: CHAMPICS.misc.current_canvas_repr,
        author: author,
        post_id: post_id,
        noReply: true,
        score: 0,
        relative_url: data["results"][0]["relative_url"],
        id: highest_id+1
      }
      for(var id in posts)
        if(parseInt(posts[id]["id"])==parseInt(post_id))
          posts[id].comments.push(saved_comment);
      self.setState({"posts":posts})
    });

  },
  render: function() {
    var _posts = [];
    var _canvas = <DrawableCanvasComponent key={parseInt(this.state.canvas_comment_id) + this.state.canvas_enabled}comment_id={parseInt(this.state.canvas_comment_id)} post_id={this.state.canvas_post_id} enabled={this.state.canvas_enabled} inherited_styles={this.state.canvas_inherited_styles} onDisable={this.__disableCanvas} onSubmit={this.__onSubmitEdit}/>
    for (var iteration in this.state.posts){
        var post = JSON.parse(JSON.stringify(this.state.posts[iteration]));
        post.comments = post.comments || [];
        _posts.push(<PostComponent post={post} onCommentReply={this.__enableCanvas} key={post.comments.length+"post"}/>);
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
