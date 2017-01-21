import React, {Component} from 'react';
import styled from 'styled-components';

const StyledText = styled.a`
  font-size: 1.5em;
  padding: 0.5em;
  margin: 0.5em;
  color: palevioletred;

  &:hover {
    color: papayawhip;
  }
`;

const NonBulletLi = styled.li`
  list-style-type: none;
`;

export default class Link extends Component {
  render() {
    return (
      <NonBulletLi className="link" key={this.props.id}>
        <StyledText href="#" onClick={() => this.props.onClick()}>
          {this.props.value}
        </StyledText>
      </NonBulletLi>
    );
  }
}
