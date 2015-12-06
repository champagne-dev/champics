//jared added this
var PostItemComponent = React.createClass({
  propTypes: {
    post: React.PropTypes.object.isRequired,
  },
  getInitialState: function(){
    return {"voting_disabled": false, "vote_count": this.props.post.score};
  },
  __onUpvote: function(){
    CHAMPICS.ajax.upvotePost(this.props.post.slug, function(data){
      console.log(data)
    })
    var vote_count = this.state.vote_count;
    this.setState({"vote_count": parseInt(vote_count)+1, "voting_disabled": true})
  },
  __onDownvote: function(){
    CHAMPICS.ajax.downvotePost(this.props.post.slug, function(data){
      console.log(data)
    })
    var vote_count = this.state.vote_count;
    this.setState({"vote_count": parseInt(vote_count)-1, "voting_disabled": true})
  },
  render: function(){
    var _className = "postItem";
    var _href = "/c/"+CHAMPICS.data.current_topic.name+"/"+this.props.post.slug //broken link
    var voting;
    var votingClass = "";
    if(this.state.voting_disabled)
      votingClass=" hidden"
    return (
        <li className={_className}>
          <div className="voting-widget">
           <a className={"upvote vote_element fa fa-caret-up"+votingClass} onClick={this.__onUpvote}></a>
           <h5 className="vote_count vote_element">{this.state.vote_count}</h5>
           <a className={"downvote vote_element fa fa-caret-down"+votingClass} onClick={this.__onDownvote}></a>
          </div>
          <a href={_href}>{this.props.post.name}</a>
        </li>
      )
  }
});

var POSTComponent = React.createClass({
  propTypes: {
    posts: React.PropTypes.array.isRequired,
  },
  getInitialState: function(){
    return {};
  },
  componentDidMount: function(){
    //sorry for putting this here
    $(".addPostBtn").click(function(){
      console.log("ok")
      $(".createPostForm").toggle();
    });

    var topic = CHAMPICS.data.current_topic;
    $('.createPostForm > .submit-btn').click(function(){
      var email = $('.createPostForm > .email-field').val();
      var title = $('.createPostForm > .title-field').val();
      var _url  = $('.createPostForm > .url-field').val();
      var topic_id = topic["id"];
      var topic_name = topic["name"];
      CHAMPICS.ajax.savePost(_url, title, email, topic_id, topic_name, function(data){
        console.log(data)
        if (data["results"][0]["error"]) {
          $(".createPostForm > label").text(data["results"][0]["data"])
          console.log(data["results"][0]["data"])
        } else {
          location.reload();
        }
        
      })
    });
  },
  render: function() {
    var currentTopic = CHAMPICS.data.current_topic.name;
    //this is bad but idk how to communicate between components
    var _posts = [];
    for (var iteration in this.props.posts){
      var post = this.props.posts[iteration];
      console.log(post)
      _posts.push(<PostItemComponent post={post} />);
    }
    var topHref = "/c/"+CHAMPICS.data.current_topic.name+"?r=top"
    var newHref = "/c/"+CHAMPICS.data.current_topic.name+"?r=new"
    return (
      <ul id="postList">
          
          <div className="plusBtn">
            <span className="currentTopicName">{currentTopic}&nbsp; </span>
            <span className="addPostBtn">
              <i className="fa fa-plus"></i> 
              <span>&nbsp;post pic</span>
            </span>
          </div>
          <div className="rankOptions">
            <a href={topHref} className="rankOption">Top</a>
            <a href={newHref} className="rankOption">New</a>
          </div>
          <div className="createPostForm">
              <label className="error"></label>
              <input className="title-field input" placeholder="title"></input>
              <input className="email-field input" placeholder="email"></input>
              <input className="url-field input" placeholder="url"></input>
              <button className="submit-btn input">Submit</button>
          </div>
          <div className="postListWrapper">
            <ol>
            {_posts}
            </ol>
          </div>
      </ul>
    )
  }
});
CHAMPICS.reactive["POSTComponent"] = React.render(<POSTComponent posts={CHAMPICS.data.posts}/>,document.getElementById("POSTComponent"));
//jared added this
var PostItemComponent = React.createClass({
  propTypes: {
    slug: React.PropTypes.string.isRequired,
    postName: React.PropTypes.string.isRequired,
    postId: React.PropTypes.string.isRequired
  },
  getInitialState: function(){
    return {};
  },
  render: function(){
    var _className = "postItem";
    var _href = "/c/"+window.current_topic.name+"/"+this.props.slug //broken link
    return (
        <li className={_className}>
          <a href={_href}>{this.props.postName}</a>
        </li>
      )
  }
});

