import React, {Component} from 'react';
import styled from 'styled-components';

const StyledText = styled.p`
  color: white;
  font-size: 1.2em;
  display: inline-block;
  text-align: left;
  position: absolute;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
`;

const StyledLink = styled.a`
  color: #CCCCFF;
  text-decoration: none;
  cursor: pointer;

  &:visited {
    color: #CCCCFF;
  }

  &:hover {
    color: white;
  }
`;

export default class Text extends Component {
  onClick(e) {
    e.preventDefault();
    this.props.onClick();
  }
  render() {
    return (
      <StyledText top={this.props.top} left={this.props.left}>
        {this.props.target ? <StyledLink onClick={this.onClick.bind(this)} target={this.props.target}>{this.props.children}</StyledLink> : this.props.children}
      </StyledText>
    );
  }
}
