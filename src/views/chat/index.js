import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
// import style from './style';
import ChatLog from '../../components/chat-log';
import ChatInput from '../../components/chat-input';

@Radium
export default class ChatView extends Component {

  static propTypes = {
    chat: PropTypes.array.isRequired,
    user: PropTypes.string.isRequired,
    post: PropTypes.func.isRequired,
  }

  static defaultProps = {
    user: 'jordan',
  }

  constructor(props) {
    super(props);
    this.ref = {};
    this.state = {
      value: '',
    };
  }

  componentDidMount() {
    window.scroll(0, 0);
  }

  onChange(event) {
    const { value = '' } = event.target;
    this.setState({ value });
    if (!this.ref.input) {
      this.ref.input = event.target;
    }
  }

  onSubmit(event) {
    event.preventDefault();
    const { user, post } = this.props;
    const { value } = this.state;

    if (user && value) {
      post({ user, value });
    }

    // Clear input
    if (this.ref.input) {
      this.ref.input.value = '';
    }
  }

  render() {
    return (
      <section>
        <ChatLog chat={this.props.chat} />
        <ChatInput onSubmit={::this.onSubmit} onChange={::this.onChange} />
      </section>
    );
  }
}
