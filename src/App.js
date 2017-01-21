import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import logo from './logo.svg';
import _ from 'lodash';
import './App.css';

import Text from './components/text'
import Link from './components/link'

import GameController from './GameController'

import TodoList from './TodoList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
  }

  addText(event) {
    var text = _.assign({}, event);
    text.type = 'text';
    this.setState({ items: _.concat(this.state.items, text) });
  }

  removeText(event) {
    var items = _.filter(this.state.items, item => item.id != event.id);
    this.setState({ items: items});
  }

  addLink(event) {
    var link = _.assign({}, event);
    link.type = 'link';
    this.setState({ items: _.concat(this.state.items, link) });
  }

  followLink(link) {
    this.props.game.enqueueSequence(this.props.game.loadSequence(link.target));
  }

  render() {
    return (
      <div className="App">
        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={1000}>
          {this.state.items.map((item, i) => {
            if(item.type == 'text') {
              return <Text key={item.id} data={{ top: item.top, left: item.left}}>{item.text}</Text>
            } else {
              return <Link key={item.id} data={{ top: item.top, left: item.left}} onClick={() => this.followLink(item)}>{item.text}</Link>
            }
          })}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default App;
