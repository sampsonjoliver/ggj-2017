import React, {Component} from 'react';
import styled from 'styled-components';

const StyledText = styled.span`
  color: white;
  display: inline-block;
  position: absolute;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
`;

export default class Text extends Component {
  render() {
    return (
      <StyledText top={this.props.data.top} left={this.props.data.left}>
        {this.props.children}
      </StyledText>
    );
  }
}
