import React from 'react';
import HSARange from './hsa/HSARange';

export default class HSAForm extends React.Component {
  constructor(props) {
    super();

    this.handleHSARangeChange = this.handleHSARangeChange.bind(this);

    this.state = {
      totals: {
        employeeHSA: 0,
        employerHSA: 0
      }
    }
  }

  handleHSARangeChange(val) {
    const {state, totals} = this.state;

    this.setState({
      ...state,
      totals: {
        ...totals,
        employeeHSA: parseInt(val, 10)
      }
    }, () => {
      this.props.onHSAFormChange(this.state)
    })
  }

  render() {
    return(
      <div>
        <hr />
        <HSARange maxContribution={this.props.maxContribution} maxAnnualContribution={this.props.maxAnnualContribution} catchup={this.props.catchup} onHSARangeChange={this.handleHSARangeChange} />
      </div>
    )
  }
}
