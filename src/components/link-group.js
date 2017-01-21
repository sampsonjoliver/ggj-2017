import React, { Component } from 'react';
import Link from './link'

export default class LinkGroup extends Component {
  renderLink(link) {
    return <Link key={link.index} value={link.data}
      onClick={() => this.props.onClick()}
    />;
  }

  render() {
    return (
      <ul className="link-group">
        {this.props.links.map((link) =>
          this.renderLink(link)
        )}
      </ul>
    );
  }
}
