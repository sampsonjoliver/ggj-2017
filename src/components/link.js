import React, {Component} from 'react';
import styled from 'styled-components';

const StyledText = styled.a`
  color: #CCCCFF;
  text-decoration: none;

  &:visited {
    color: #CCCCFF;
  }

  &:hover {
    color: white;
  }

  position: absolute;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
`;

export default class Link extends Component {
  onClick(e) {
    e.preventDefault();
    this.props.onClick();
  }
  render() {
    return (
      <StyledText href="#" onClick={this.onClick.bind(this)} top={this.props.data.top} left={this.props.data.left}>
        {this.props.children}
      </StyledText>
    );
  }
}
