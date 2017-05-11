import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import style from './style';
// import { Table, Select, Banner, Button, Section, Input } from '../../components';

@Radium
export default class MainView extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    getLocation: PropTypes.func.isRequired,
    setLocation: PropTypes.func.isRequired,
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

    this.props.getLocation();
  }

  // componentWillReceiveProps(props) {
  //
  // }

  // onChange(event) {
  //   const { value = '' } = event.target;
  //   if (!this.ref.input) {
  //     this.ref.input = event.target;
  //   }
  //
  //   if (value !== this.state.value) {
  //     this.setState({ value });
  //   }
  // }
  //
  // onSelect(event) {
  //   const { value = '' } = event.target;
  //   if (!this.ref.select) {
  //     this.ref.select = event.target;
  //   }
  //
  //   const id = parseInt(value, 10);
  //   this.props.selectCategory(this.props.inventory.filter(item => item.id === id)[0]);
  //
  //   if (this.ref.input) {
  //     this.ref.input.innerText = event.target.innerText;
  //   }
  // }
  //
  // onClickInput(event) {
  //   event.target.value = '';
  //   this.setState({ value: '' });
  // }
  //
  // onSubmit(event) {
  //   const { selected } = this.props;
  //   event.preventDefault();
  //
  //   // Clear input
  //   if (this.ref.input) {
  //     this.ref.input.value = '';
  //   }
  //
  //   const timestamp = new Date().toISOString();
  //   const order = {
  //     timestamp,
  //     selected,
  //   };
  //   const output = JSON.stringify(order);
  //
  //   // Output
  //   this.setState({ output });
  // }
  //
  // onAdd(value) {
  //   // @TODO - selected items should be stored in a separate store
  //   if (!this.props.selected.includes(value)) {
  //     this.props.addSelection(value);
  //   }
  // }
  //
  // onRemove(value) {
  //   // @TODO - selected items should be stored in a separate store
  //   if (this.props.selected.includes(value)) {
  //     this.props.removeSelection(value);
  //   }
  // }
  //
  // clear() {
  //   if (this.props.selected) {
  //     this.props.clearSelections();
  //   }
  //
  //   if (this.props.category) {
  //     this.props.clearCategory();
  //   }
  // }
  //
  // get datePicker() {
  //   return (
  //     <fieldset>
  //       <Section index={1}>
  //         Request Move Date
  //       </Section>
  //     </fieldset>
  //   );
  // }
  //
  // get addPallet() {
  //   const inventory = this.props.inventory.filter(({ code, description }) => code.includes(this.state.value) || description.includes(this.state.value));
  //
  //   const select = this.state.value ? (
  //     <Select
  //       multiple
  //       onChange={::this.onSelect}
  //       options={inventory}
  //     />
  //   ) : null;
  //
  //   return (
  //     <fieldset>
  //       <Section active={inventory} index={2}>
  //         Add To Pallet Selection List
  //       </Section>
  //       <h3>
  //         Type To Find Item, SKU, or Pallet #, Then Select To Add
  //       </h3>
  //       <Input onChange={::this.onChange} placeholder={'sku... | '} onClick={::this.onClickInput} style={{ borderRadius: 0 }} />
  //       {select}
  //     </fieldset>
  //   );
  // }
  //
  // clearPallet() {
  //   if (this.props.category.id) {
  //     this.props.clearCategory();
  //   }
  // }
  //
  // get selectedBanner() {
  //   const { category } = this.props;
  //   const text = category.id ? `${category.code}\u00a0\u2014\u00a0${category.description}` : '';
  //   return (
  //     <Banner>
  //       {text}
  //       <Button size="small" state={category.id ? 'default' : 'disabled'} onClick={category.id ? ::this.clearPallet : null} style={{ textTransform: 'uppercase', marginLeft: 'auto' }}>
  //         Done
  //       </Button>
  //     </Banner>
  //   );
  // }
  //
  // get selections() {
  //   const { selected, items, category } = this.props;
  //   const action = ({ id }) => (
  //     <a onClick={() => this.onAdd(id)}>
  //       Add To List
  //     </a>
  //   );
  //   const labels = [
  //     'Pallet #',
  //     'Item Code',
  //     'Select for Pickup',
  //   ];
  //
  //   let filtered = [];
  //   if (category.id) {
  //     filtered = items.filter(({ inventory_id: pallet, id }) => category.id === pallet && !selected.includes(id))
  //       .map(item => Object.assign({}, item, { action: action(item), inventory_id: category.code }));
  //     filtered.forEach(item => delete item.id);
  //   }
  //
  //   const table = filtered.length ? (
  //     <Table rows={filtered} labels={labels} />
  //   ) : (
  //     <p>Your list is empty. Make pallets available for selection from Step 2 above.</p>
  //   );
  //
  //   return (
  //     <fieldset>
  //       <Section active={filtered.length || this.props.selected.length} index={3}>
  //         Choose from Pallet Selection List
  //       </Section>
  //       {this.selectedBanner}
  //       {table}
  //     </fieldset>
  //   );
  // }
  //
  // get review() {
  //   const { items, selected, category } = this.props;
  //   const action = item => (
  //     <a onClick={() => this.onRemove(item.id)}>
  //       Remove
  //     </a>
  //   );
  //
  //   const labels = [
  //     'Pallet #',
  //     'Item Code',
  //     'Modify List',
  //   ];
  //   const filtered = items.filter(item => selected.includes(item.id))
  //     .map(item => Object.assign({}, item, { action: action(item), inventory_id: category.code }));
  //   filtered.forEach(item => delete item.id);
  //
  //   const content = filtered.length ? (
  //     <Table rows={filtered} labels={labels} />
  //   ) : (
  //     <p>Your list is empty. Please add pallets from Step 3 above.</p>
  //   );
  //
  //   return (
  //     <fieldset>
  //       <Section active={filtered.length} index={4}>
  //         Choose from Pallet Selection List
  //       </Section>
  //       {content}
  //     </fieldset>
  //   );
  // }
  //
  // get finalize() {
  //   return (
  //     <fieldset>
  //       <Section active={this.props.selected.length} index={5}>
  //         Finalize Your Request
  //       </Section>
  //       <h3>
  //         Brief Description Of Inventory Being Returned
  //       </h3>
  //       <textarea value={this.state.output} style={{ height: 100, border: '1px solid #ccc' }} />
  //       <Button onClick={::this.onSubmit} state={this.props.selected.length ? 'default' : 'disabled'}>
  //         Confirm and Schedule
  //       </Button>
  //       <Button state="cancel" onClick={::this.clear}>
  //         Cancel
  //       </Button>
  //     </fieldset>
  //   );
  // }

  render() {
    return (
      <form style={style}>
        Latitude {this.props.location.latitude}
      </form>
    );
  }
}
