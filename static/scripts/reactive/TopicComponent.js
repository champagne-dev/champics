var TopicItemComponent = React.createClass({
  propTypes: {
   topicName: React.PropTypes.string.isRequired,
   topicId: React.PropTypes.string.isRequired,
   isActive: React.PropTypes.bool.isRequired
  },
  getInitialState: function(){
    return {};
  },
  render: function(){
    var _className = this.props.isActive ? "topicItem active" : "topicItem";
    var _href = "/c/"+this.props.topicName
    return (
        <li className={_className}>
          <a href={_href}>{this.props.topicName}</a>
        </li>
      )
  }
});
var TopicComponent = React.createClass({
  propTypes: {
    topics: React.PropTypes.array.isRequired,
  },
  getInitialState: function(){
    return {};
  },
  componentDidMount: function(){

  },
  render: function() {
    var _topics = [];
    for (var iteration in this.props.topics){
      var topic = this.props.topics[iteration];
      var is_active = false;
      if(CHAMPICS.data.current_topic && topic["name"] == CHAMPICS.data.current_topic.name)
        is_active = true;
      _topics.push(<TopicItemComponent isActive={is_active} topicName={topic["name"]} topicId={topic["id"]} />);
    }
    return (
      <ul>
          {_topics}
      </ul>
    )
  }
});
CHAMPICS.reactive["topicComponent"] = React.render(<TopicComponent topics={CHAMPICS.data.topics}/>,document.getElementById("topicComponent"));