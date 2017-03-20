import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import style from './style';
import { List, Table, Select, Badge } from '../../components';

@Radium
export default class Order extends Component {
  static propTypes = {
    addSelection: PropTypes.func.isRequired,
    removeSelection: PropTypes.func.isRequired,
    selectCategory: PropTypes.func.isRequired,
    clearCategory: PropTypes.func.isRequired,
    inventory: PropTypes.array.isRequired,
    items: PropTypes.array.isRequired,
    selected: PropTypes.array.isRequired,
  }

  static defaultProps = {
    items: [],
    inventory: [],
    selected: [],
  }

  constructor(props) {
    super(props);
    this.ref = {};
    this.state = {
      value: '',
      output: '',
    };
  }

  componentDidMount() {
    window.scroll(0, 0);
  }

  componentWillReceiveProps(props) {

  }

  onChange(event) {
    const { value = '' } = event.target;
    if (!this.ref.input) {
      this.ref.input = event.target;
    }

    if (value !== this.state.value) {
      this.setState({ value });
    }
  }

  onSelect(event) {
    const { value = '' } = event.target;
    if (!this.ref.select) {
      this.ref.select = event.target;
    }

    const id = parseInt(value, 10);
    this.props.selectCategory(this.props.inventory.filter(item => item.id === id)[0])

    // if (!this.props.selected.includes(id)) {
    //   this.props.addSelection(id);
    // }

    // Clear input after add
    // if (this.ref.input) {
    //   this.ref.input.value = '';
    // }
  }

  onSubmit(event) {
    event.preventDefault();
    const { inventory, items, selected } = this.props;
    const { value } = this.state;

    // Clear input
    if (this.ref.input) {
      this.ref.input.value = '';
    }

    const timestamp = new Date().toISOString();
    const order = {
      timestamp,
      selected,
    };
    const output = JSON.stringify(order);

    // Output
    this.setState({ output });
  }

  onAdd(value) {
    // @TODO - selected items should be stored in a separate store
    if (!this.props.selected.includes(value)) {
      this.props.addSelection(value)
    }
  }

  onRemove(value) {
    // @TODO - selected items should be stored in a separate store
    if (this.props.selected.includes(value)) {
      this.props.removeSelection(value);
    }
  }

  clear() {
    // @TODO - should clear both inventory and items stores
    if (this.props.selected) {
      this.props.clearSelections();
    }
  }

  get datePicker() {
    return (
      <fieldset>
        <h2>
          <Badge active={true}>
            1
          </Badge>
          Request Move Date
        </h2>
      </fieldset>
    );
  }

  get addPallet() {
    const inventory = this.props.inventory.filter(({ code, description }) => code.includes(this.state.value) || description.includes(this.state.value));
    const input = !this.props.category.id ? (
      <input onChange={::this.onChange} placeholder={'sku... | '} />
    ) : null;

    const select = this.state.value ? (
      <Select
        multiple
        onChange={::this.onSelect}
        options={inventory}
      />
    ) : null;

    return (
      <fieldset>
        <h2>
          <Badge active={inventory}>
            2
          </Badge>
          Add To Pallet Selection List
        </h2>
        <h3>
          Type To Find Item, SKU, or Pallet #, Then Select To Add
        </h3>
        {input}
        {select}
      </fieldset>
    );
  }

  clearPallet() {
    if (this.props.category.id) {
      this.props.clearCategory();
    }
  }

  get selections() {
    const { selected, items, category } = this.props;
    const action = item => (
      <span onClick={() => this.onAdd(item.id)}>
        Add To List
      </span>
    );
    const labels = [
      '',
      'Pallet #',
      'Item Code',
      'Select for Pickup',
    ];

    let filtered = [];
    let banner;
    if (category.id) {
      filtered = items.filter(({ inventory_id: pallet, id }) => category.id === pallet && !selected.includes(id))
      .map(item => Object.assign({}, item, { action: action(item) }));

      banner = category.id ? (
        <div>
          {category.code} &mdash; {category.description}
          <button type="button" onClick={::this.clearPallet}>Done</button>
        </div>
      ) : null;
    }

    const table = filtered.length ? (
      <Table rows={filtered} labels={labels} />
    ) : null;

    return (
      <fieldset>
        <h2>
          <Badge active={filtered.length || this.props.selected.length}>
            3
          </Badge>
          Choose from Pallet Selection List
        </h2>
        {banner}
        {table}
      </fieldset>
    );
  }

  get review() {
    const action = item => (
      <a onClick={() => this.onRemove(item.id)}>
        Remove
      </a>
    );

    const labels = [
      '',
      'Pallet #',
      'Item Code',
      'Modify List',
    ];
    const selected = this.props.items.filter(item => this.props.selected.includes(item.id))
      .map(item => Object.assign({}, item, { action: action(item) }));

    const content = selected.length ? (
      <div>
        <Table rows={selected} labels={labels} />
        <button type="button" onClick={::this.clear}>
          Clear
        </button>
      </div>
    ) : null;

    return (
      <fieldset>
        <h2>
          <Badge active={selected.length}>
            4
          </Badge>
          Review Pallets Selected For Pickup
        </h2>
        {content}
      </fieldset>
    );
  }

  get finalize() {
    return (
      <fieldset>
        <h2>
          <Badge active={this.props.selected.length}>
            5
          </Badge>
          Finalize Your Request
        </h2>
        <textarea value={this.state.output} />
        <button disabled={!this.props.selected.length}>
          Confirm and Schedule
        </button>
        <button type="button" onClick={::this.clear}>
          Cancel
        </button>
      </fieldset>
    );
  }

  render() {
    return (
      <form onSubmit={::this.onSubmit}>
        {this.datePicker}
        {this.addPallet}
        {this.selections}
        {this.review}
        {this.finalize}
      </form>
    );
  }
}
