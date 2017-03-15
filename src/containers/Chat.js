import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { post } from '../actions';
import Bot from '../util/bot';
import ChatView from '../views/chat';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.bot = new Bot(props.chat, props.post);
  }

  static propTypes = {
    user: PropTypes.object,
    chat: PropTypes.array,
    post: PropTypes.func,
  }

  render() {
    const { user, chat } = this.props;

    return (
      <ChatView {...this.props} />
    );
  }
}

function mapStateToProps({ user, chat }) {
  return { user, chat };
}

function mapDispatchToProps(dispatch) {
  return {
    post: bindActionCreators(post, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
