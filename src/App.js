import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import logo from './logo.svg';
import _ from 'lodash';
import './App.css';

import Text from './components/text'

import GameController from './GameController'

import TodoList from './TodoList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { texts: [], links: [] };
  }

  addText(event) {
    var text = _.assign({}, event);
    this.setState({ texts: _.concat(this.state.texts, text), links: this.state.links });
  }

  removeText(event) {
    var texts = _.filter(this.state.texts, item => item.id != event.id);
    this.setState({ texts: texts, links: this.state.links });
  }

  followLink(link) {
    var links = _.concat(this.state.links, link.id || link.target);
    this.setState({ texts: this.state.texts, links: links });
    this.props.game.enqueueSequence(this.props.game.loadSequence(link.target), this.props.game.loadSequence(link.enqueue), links);
  }

  render() {
    return (
      <div className="App">
        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={1000}>
          {this.state.texts.map((item, i) => <Text key={item.id || item.target} top={item.top} left={item.left} target={item.target} onClick={this.followLink.bind(this, item)}>{item.text}</Text>)}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default App;
