import React from 'react';
import Coverage from './coverage/Coverage';

export default class CoverageForm extends React.Component {
  constructor(props) {
    super();

    this.handleCoverageChange = this.handleCoverageChange.bind(this);
    this.resetCoverage = this.resetCoverage.bind(this);

    this.state = {
      coverage: {
        employee: true,
        spouse: false,
        children: false,
      }
    }
  }

  componentWillMount() {
    this.resetCoverage();
  }

  componentWillUnmount() {
    this.resetCoverage();
  }

  resetCoverage() {
    this.setState({
      coverage: {
        employee: true,
        spouse: false,
        children: false,
      }
    }, () => {
      this.props.onCoverageChange(this.state)
    })
  }

  handleCoverageChange(cov) {
    const {coverage} = this.state;

    this.setState({
      coverage: {
        ...coverage,
        [cov.name]: cov.checked
      }
    }, () => {
      this.props.onCoverageChange(this.state)
    })
  }

  render() {
    return(
      <div className="form-group">
        <h4><label>Health Insurance Coverage:</label></h4>
        <Coverage name="employee" checked={true} disabled={true} onCoverageChange={this.handleCoverageChange}>Employee</Coverage>
        <Coverage name="spouse" onCoverageChange={this.handleCoverageChange}>Spouse</Coverage>
        <Coverage name="children" onCoverageChange={this.handleCoverageChange}>Children</Coverage>
        <hr />
      </div>
    )
  }
}
