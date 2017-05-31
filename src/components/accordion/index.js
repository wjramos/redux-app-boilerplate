import React, { Component, PropTypes } from 'react';
import Ionicon from 'react-ionicons';
import Radium from 'radium';

import style from './style';

@Radium
export default class Accordion extends Component {
  static propTypes = {
    heading: PropTypes.string,
    children: PropTypes.any,
    expanded: PropTypes.bool,
    icons: PropTypes.shape({
      collapsed: PropTypes.string,
      expanded: PropTypes.string,
    }),
  }

  static defaultProps = {
    heading: '',
    expanded: false,
    icons: {
      collapsed: 'ion-ios-arrow-down',
      expanded: 'ion-ios-arrow-up',
    },
  }

  constructor(props) {
    super(props);
    this.state = {
      expanded: props.expanded,
    };
  }

  onClick() {
    const expanded = !this.state.expanded;
    this.setState({ expanded });
  }

  get header() {
    return (
      <header
        style={[style.section, style.heading]}
        onClick={::this.onClick}
      >
        <h3 style={[style.headingText]}>
          {this.props.heading}
          {this.icon}
        </h3>
      </header>
    );
  }

  get icon() {
    const { icons: { collapsed, expanded } } = this.props;
    const iconSymbol = this.state.expanded ? expanded : collapsed;

    return (
      <Ionicon icon={iconSymbol} style={style.toggle} />
    );
  }

  get content() {
    const stateStyle = this.state.expanded ? style.expanded : style.collapsed;

    return (
      <div style={[style.section, style.content, stateStyle]}>
        {this.props.children}
      </div>
    );
  }

  render() {
    const stateStyle = this.state.expanded ? style.sectionBorder : '';

    return (
      <section style={[style.accordion, stateStyle]}>
        {this.header}
        {this.content}
      </section>
    );
  }
}
