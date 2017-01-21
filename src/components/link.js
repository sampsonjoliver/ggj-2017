import React, {Component} from 'react';

export default class Link extends Component {
  render() {
    return (
      <li className="link" key={this.props.id}>
        <a href="#" onClick={() => this.props.onClick()}>
          {this.props.value}
        </a>
      </li>
    );
  }
}
