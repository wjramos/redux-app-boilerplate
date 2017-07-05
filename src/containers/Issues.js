import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { propTypes, mapDispatchToProps, mapStateToProps, getGridItems } from '../util';
import { Issues } from '../views';

const LIMIT = getGridItems();

class IssuesContainer extends PureComponent {
  static propTypes = propTypes;

  constructor(props) {
    super(props);
    this.state = {
      noLoad: false,
    };
  }

  componentWillMount() {
    const issueEnv = this.props.qa ? 'qa' : 'prod';
    if (!this.props.brands[issueEnv] || !this.props.brands[issueEnv].length) {
      this.props.getBrands(this.props);
    }
  }

  componentDidMount() {
    window.scroll(0, 0);
  }

  componentWillReceiveProps(props) {
    const {
      issue, issues, brand, brands, edition, editions, qa, preview, display,
      getBrands, setBrand, getEditions, setEdition, clearEdition,
      clearIssue, getIssues, clearIssues, setDisplay, clearDisplay,
    } = props;

    const {
      brand: prevBrand, brands: prevBrands, qa: prevQa, preview: prevPreview, edition: prevEdition, issues: prevIssues, editions: prevEditions,
    } = this.props;

    const issueEnv = qa ? 'qa' : 'prod';
    const newIssues = brand && issues[brand] && issues[brand][issueEnv] ? issues[brand][issueEnv] : null;
    const newBrands = brands[issueEnv];
    const newEditions = brand && editions[brand] && editions[brand][issueEnv] ? editions[brand][issueEnv] : null;

    const prevBrandIssues = prevIssues[brand] && prevIssues[brand][issueEnv] ? prevIssues[brand][issueEnv] : null;
    const prevEnvBrands = this.props.brands[issueEnv];
    const prevBrandEditions = brand && prevEditions[brand] && prevEditions[brand][issueEnv] ? prevEditions[brand][issueEnv] : null;

    // Stop loading new content if fewer than expected results returned - usually means end of content
    if (newIssues && prevBrandIssues && ((!newIssues.length && !prevBrandIssues.length) || newIssues.length < prevBrandIssues.length + LIMIT)) {
      this.setState({ noLoad: true });
    }

    // If no available brands, fetch
    if (!brands[issueEnv]) {
      getBrands(props);
    }

    // If no set brand, but brands available, set to first brand
    if (!brand && newBrands && newBrands.length) {
      setBrand(newBrands[0]);
    }

    if (brand && newBrands && !newBrands.length) {
      clearBrand();
    }

    // something has changed from the previous state
    // Allow progressive loading to continue, fetch fresh issues
    if (brand && brand !== prevBrand && (!issues[brand] || !newIssues)) {
      const offset = newIssues ? newIssues.length : 0;
      this.setState({ noLoad: false });
      getIssues(
        Object.assign(
          {},
          props,
          {
            limit: LIMIT,
            offset,
          }
        )
      );
    }

    // On brand change, clear current edition
    if (edition && newEditions && (!newEditions.length || brand === 'all' || brand !== prevBrand || qa !== prevQa)) {
      clearEdition();
    }

    // If editions have not been fetched for current brand,
    // attempt to gather available editions
    if (newIssues && newIssues.length && (!editions[brand] || !newEditions)) {
      getEditions(props);
    }

    // If editions available for current brand and no edition set,
    // set to first available edition
    if (!edition && newEditions && newEditions.length) {
      setEdition('all');
    }

    if (
      display.length
      && (brand !== prevBrand || qa !== prevQa)
    ) {
      clearDisplay();
    }

    // Set issues to display
    if (newIssues
      && newIssues.length
      && newEditions
      && ((!newEditions.length && !edition) || (newEditions.length && edition))
      && (
        !display.length
        || !prevEditions
        || newIssues.length !== prevBrandIssues.length
        || edition !== prevEdition
        || preview !== prevPreview
      )
    ) {
      setDisplay({ issues: newIssues, edition, preview });
    }

    // Clear issue if set and navigating to this route
    if (issue && !this.props.issue) {
      console.log('clearIssue')
      // clearIssue();
    }
  }

  getIssues() {
    const { brand, qa, issues, getIssues } = this.props;

    if (brand && !this.state.noLoad) {
      const issueEnv = qa ? 'qa' : 'prod';
      const offset = issues[brand] && issues[brand][issueEnv] ? issues[brand][issueEnv].length : 0;
      getIssues(
        Object.assign(
          {},
          this.props,
          {
            limit: LIMIT,
            offset,
          }
        )
      );
    }
  }

  render() {
    return (
      <Issues
        {...this.props}
        getIssues={::this.getIssues}
        noLoad={this.state.noLoad}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IssuesContainer);
