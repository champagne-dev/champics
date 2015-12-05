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
    var _href = "/c/"+this.props.name
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
      if(this.props.topics["iteration"]["id"] == this.state.topic_id)
        _topics.unshift(<TopicItemComponent isActive={true} topicName={this.props.topics[iteration]["name"]} topicId={this.props.topics[iteration]["id"]} />)
      else
        _topics.push(<TopicItemComponent isActive={false} topicName={this.props.topics[iteration]["name"]} topicId={this.props.topics[iteration]["id"]} />);
    }
    return (
      <ul>
          {_topics}
      </ul>
    )
  }
});
CHAMPICS.reactive["topicComponent"] = React.render(<TopicComponent topics={[]}/>,document.getElementById("topicComponent"));