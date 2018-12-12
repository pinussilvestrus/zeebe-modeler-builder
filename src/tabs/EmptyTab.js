import React, { Component } from 'react';

import Slot from 'camunda-modeler-client/src/app/slot-fill/Slot';

import css from './EmptyTab.less';

import {
  Tab
} from 'camunda-modeler-client/src/app/primitives';


export default class EmptyTab extends Component {

  componentDidMount() {
    this.props.onShown();
  }

  render() {

    const {
      onAction
    } = this.props;

    return (
      <Tab className={ css.EmptyTab }>
        <p className="create-buttons">
          <span>Create a </span>
          <button className="create-bpmn" onClick={
            () => onAction('create-bpmn-diagram') }
          >BPMN diagram</button>
        </p>

        <Slot name="empty-tab-buttons" />
      </Tab>
    );
  }
}