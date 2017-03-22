import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getInventory, getItems, addSelection, removeSelection, clearSelections, selectCategory, clearCategory } from '../actions';
import OrderView from '../views/order';

class Order extends Component {
  static propTypes = {
    selected: PropTypes.array,
    category: PropTypes.object,
    items: PropTypes.array,
    inventory: PropTypes.array,
  }

  constructor(props) {
    super(props);

    const { selected, items, inventory, category } = props;

    this.state = {
      items,
      selected,
      inventory,
      category,
    }
  }

  componentWillMount() {
    this.props.getInventory();
    this.props.getItems();
  }

  componentWillReceiveProps(props) {
    const items = props.items.filter(item => !this.state.selected[item]);
    this.setState({ items })
  }

  render() {
    return (
      <OrderView {...this.props} />
    );
  }
}

function mapStateToProps({ items, inventory, selected, category }) {
  return {
    items,
    inventory,
    selected,
    category,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getInventory: bindActionCreators(getInventory, dispatch),
    getItems: bindActionCreators(getItems, dispatch),
    addSelection: bindActionCreators(addSelection, dispatch),
    removeSelection: bindActionCreators(removeSelection, dispatch),
    clearSelections: bindActionCreators(clearSelections, dispatch),
    selectCategory: bindActionCreators(selectCategory, dispatch),
    clearCategory: bindActionCreators(clearCategory, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);
