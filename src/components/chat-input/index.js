import React, { PropTypes, Component } from 'react';
import { Input } from '..';

export default class ChatInput extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
  }

  render() {
    return (
      <form onSubmit={this.props.onSubmit}>
        <Input onChange={this.props.onChange} />
        <button>
          Send
        </button>
      </form>
    );
  }
}
