import React, { Component } from 'react';
import Link from './link'
import styled from 'styled-components';

const StyledLinkGroup = styled.ul`
  position: absolute;
  top: ${props => props.top}
  left: ${props => props.left}
`;

export default class LinkGroup extends Component {
  renderLink(link) {
    return <Link key={link.index} value={link.data}
      onClick={() => this.props.onClick()}
    />;
  }

  render() {
    return (
      <StyledLinkGroup className="link-group" top={this.props.data.top} left={this.props.data.left}>
        {this.props.data.data.map((link) =>
          this.renderLink(link)
        )}
      </StyledLinkGroup>
    );
  }
}
