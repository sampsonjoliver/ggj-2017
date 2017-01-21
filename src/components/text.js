import React, {Component} from 'react';
import styled from 'styled-components';

const StyledText = styled.p`
  position: absolute;
  top: ${props => props.top}
  left: ${props => props.left}
`;

export default class Text extends Component {
  render() {
    return (
      <StyledText top={this.props.data.top} left={this.props.data.left}>
        {this.props.data.data}
      </StyledText>
    );
  }
}
