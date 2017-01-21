import React, { Component } from 'react';
import LinkGroup from './link-group';
import Text from './text';

const linkType = "linkBlock";
const textType = "text";
const interactableType = "interactable";

export default class Scene extends Component {
  constructor(props) {
    super(props);
    var sceneName = props.scene;
    const scene = require(`../../public/assets/scenes/${sceneName}`);
    this.state = {
      image: scene.image,
      objects: scene.objects
    };
  }

  render() {
    return <div className="scene">
      {this.state.objects.map((obj) => {
        let object = null;
        if (obj.type == linkType)
          object = <LinkGroup key={obj.id} links={obj.data} />
        else if (obj.type = textType)
          object = <Text key={obj.id} value={obj.data} />

        return object;
      })}
    </div>
  }
}
