import React, {Component} from 'react';

export default class Text extends Component {
  render() {
    return (
      <div className="text">
          <p>{this.props.value}</p>
      </div>
    );
  }
}
