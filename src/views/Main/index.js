import React, { Component, PropTypes } from 'react';
// import Radium from 'radium';

import style from './style';
import { Input, Slider, Rating } from '../../components';

// @Radium
export default class MainView extends Component {
  static propTypes = {
    getCoordinates: PropTypes.func.isRequired,
    getLocation: PropTypes.func.isRequired,
    setLocation: PropTypes.func.isRequired,
    getPlaces: PropTypes.func.isRequired,
    location: PropTypes.object,
    places: PropTypes.array,
    radius: PropTypes.number,
    minprice: PropTypes.number,
    maxPrice: PropTypes.number,
    keywords: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    random: PropTypes.bool,
  }

  static defaultProps = {
    places: [],
    radius: 800,
    type: 'restaurant',
    minprice: 0,
    maxprice: 4,
    keywords: [],
    random: false,
  }

  constructor(props) {
    super(props);
    this.ref = {};
    this.timers = {};
    this.state = props;
  }

  onSearchChange(event) {
    const { value = '' } = event.target;

    if (!this.ref.input) {
      this.ref.input = event.target;
    }

    if (value !== this.state.value) {
      this.setState({ value });
    }
  }

  onClickInput(event) {
    // event.target.value = '';
    // this.setState({ value: '' });
  }

  componentDidMount() {
    window.scroll(0, 0);

    if (!this.state.location) {
      this.props.getLocation();
    }
  }

  get facets() {
    const { location: { latitude, longitude }, radius, type, minprice, maxprice, keywords, random } = this.state;
    return {
      location: `${latitude},${longitude}`, //: STRING, --> The desired location in "lat,long" format (default: "47.604204,-122.334583")
      radius, //: STRING, --> Search radius in meters (default: "800")
      type, //: STRING, --> Type of place (we really shouldn't need to change this from restaurant) (default: "restaurant")
      minprice, //: STRING, --> Minimum price on 0 - 4 scale (default: "0")
      maxprice, //: STRING, --> Maximum price on 0 - 4 scale (default: "4")
      keywords, //: STRING or ARRAY OF STRINGS, --> Keyword(s) to be used in search (default: "")
      random, //: BOOLEAN, --> Return a single random result from the returned list (default: false)
    }
  }

  componentWillReceiveProps(props) {
    const { places, location } = this.state;
    const diffLocation = props.location.latitude !== location.latitude || props.location.longitude !== location.longitude;
    const diffPlaces = props.places !== places;

    if (diffPlaces) {
      this.setState({ places: props.places });
    }

    if (diffLocation) {
      this.setState({ location: props.location });
    }
  }

  onSearchChange(event) {
    const { value = '' } = event.target;
    clearTimeout(this.timers.typing);

    if (value) {
      this.timers.typing = setTimeout(() => {
        this.props.getCoordinates(value, this.facets);
        this.setState({ fetching: true });
      }, 500);
    }

    if (!this.ref.input) {
      this.ref.input = event.target;
    }

    if (value !== this.state.value) {
      this.setState({ value });
    }
  }

  onKeywordChange(event) {
    const { value = '' } = event.target;
    clearTimeout(this.timers.typing);

    if (!this.ref.input) {
      this.ref.input = event.target;
    }

    const keywords = value.split(' ');
    if (keywords !== this.state.keywords) {
      this.timers.typing = setTimeout(() => {
        this.props.getPlaces(Object.assign({}, this.facets, { keywords }));
        this.setState({ fetching: true });
      }, 500);

      this.setState({ keywords });
    }
  }

  onChange(event) {
    const { value = '' } = event.target;
    clearTimeout(this.timers.typing);

    if (value) {
      this.timers.typing = setTimeout(() => {
        this.props.getPlaces(this.facets);
        this.setState({ fetching: true });
      }, 500);
    }

    if (!this.ref.input) {
      this.ref.input = event.target;
    }

    if (value !== this.state.value) {
      this.setState({ value });
    }
  }

  get search() {
    return (
      <Input
        onChange={::this.onSearchChange}
        placeholder={'Find a location'}
        onClick={::this.onClickInput}
      />
    );
  }

  get keywords() {
    return (
      <Input
        onChange={::this.onKeywordChange}
        placeholder={'Keywords'}
      />
    );
  }

  get places() {
    return (
      <ul style={{ marginBottom: 50 }}>
        {this.state.places.map((place, key) => (
          <li key={key} style={{ marginBottom: 20 }}>
            <h4 style={{ fontWeight: 700, fontSize: 24 }}>{place.name}</h4>
            <span style={{ marginRight: 10 }}>{place.rating.toFixed(1)} / 5</span>
            <Rating rating={place.price_level} />
          </li>
        ))}
      </ul>
    );
  }

  get filters() {
    return (
      <form>
        {this.keywords}
      </form>
    );
  }

  render() {
    return (
      <ul>
        <li style={{ marginBottom: 50 }}>
          <h2 style={{}}>Search By Location</h2>
          {this.search}
        </li>

        <li>
          <h2>Filter</h2>
          {this.filters}
        </li>
        {/* <Slider onChange={::this.onPriceChange} min={0} max={4} lowerPos={this.state.minprice} upperPos={this.state.maxprice} /> */}
        <li style={{ marginBottom: 50 }}>
          <h2 style={{}}>Nearby Places To Eat</h2>
          {this.places}
        </li>

      </ul>
    );
  }
}
