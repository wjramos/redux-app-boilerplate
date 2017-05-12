import React, { Component, PropTypes } from 'react';
// import Radium from 'radium';

import style from './style';
import { Input, Slider, Rating } from '../../components';

const API_KEY = 'AIzaSyAFf0zyzWR41ZaKQHv3gJ16FUgjTHbI0KA';

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

    // if (!this.ref.input) {
    //   this.ref.input = event.target;
    // }

    if (value !== this.state.value) {
      this.setState({ value });
    }
  }

  onKeywordChange(event) {
    const { value = '' } = event.target;
    clearTimeout(this.timers.typing);

    // if (!this.ref.input) {
    //   this.ref.input = event.target;
    // }

    const keywords = value.split(' ');
    if (keywords !== this.state.keywords) {
      this.timers.typing = setTimeout(() => {
        this.props.getPlaces(Object.assign({}, this.facets, { keywords }));
        this.setState({ fetching: true });
      }, 500);

      this.setState({ keywords });
    }
  }

  onChangeMaxPrice(event) {
    const { value: maxprice = 4 } = event.target;

    this.props.getPlaces(Object.assign({}, this.facets, { maxprice }));
    this.setState({ maxprice });
  }

  get search() {
    return (
      <Input
        onChange={::this.onSearchChange}
        placeholder={'Find a location'}
        onClick={::this.onClickInput}
        value={this.state.value}
      />
    );
  }

  get keywords() {
    return (
      <Input
        onChange={::this.onKeywordChange}
        placeholder={'Keywords'}
        value={this.state.keywords.join(' ')}
      />
    );
  }

  get places() {
    return (
      <ul>
        {this.state.places.map((place, key) => (
          <li key={key} style={{ display: 'flex', flexFlow: 'row nowrap', borderBottom: '1px solid #ccc' }}>
            <aside
              style={{ width: 100, paddingBottom: '100%', position: 'relative', overflow: 'hidden', opacity: 0.999 }}
            >
              <img
                style={{ width: '100%', position: 'absolute', top: '100%', left: '100%', transform: 'translate(-100%, -100%)'}}
                src={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${place.photos[0].photo_reference}&key=${API_KEY}&maxwidth=100`}
              />
            </aside>
            <main style={{ padding: '20px 10px' }}>
              <h4 style={{ fontWeight: 700, fontSize: 24 }}>
                {place.name}
              </h4>
              <span style={{ marginRight: 10 }}>
                {place.rating.toFixed(1)} / 5
              </span>
              <Rating rating={place.price_level} />
            </main>
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

  listItemString(list) {
    return [
      list.slice(0, -1).join(', '),
      list.slice(-1)[0]
    ].map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(
      list.length > 1
      ? ' and '
      : ''
    );
  }

  get placesSection() {
    if (this.state.places) {
      return (
        <section
          style={{ marginBottom: 50 }}
        >
          <h2 style={{ marginBottom: 10 }}>
            {this.state.keywords.length ? this.listItemString(this.state.keywords) : 'Places To Eat'} {this.state.location.name ? `Near ${this.state.location.name}` : 'Nearby'}
          </h2>
          {this.places}
        </section>
      );
    }

    return null;
  }

  render() {
    return (
      <main>
        <section
          // style={{ marginBottom: 50 }}
        >
          <h2 style={{ marginBottom: 10 }}>
            Search By Location
          </h2>
          {this.search}
        </section>

        <section
          // style={{ marginBottom: 50 }}
        >
          <h2 style={{ marginBottom: 10 }}>
            Filter
          </h2>
          {this.filters}
        </section>
        {/* <Slider onChange={::this.onPriceChange} min={0} max={4} lowerPos={this.state.minprice} upperPos={this.state.maxprice} /> */}
        {this.placesSection}
      </main>
    );
  }
}
