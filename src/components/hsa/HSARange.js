import React from 'react';

export default class HSARange extends React.Component {
  constructor(props) {
    super();

    this.handleRangeChange = this.handleRangeChange.bind(this);

    this.state = {
      contribution: 0
    }
  }

  handleRangeChange(e) {
    this.setState({
      contribution: e.target.value
    });
    this.props.onHSARangeChange(e.target.value);
  }

  render() {
    const { contribution } = this.state;

    return(
      <div className="form-group">
        <label>Biweekly HSA Contribution</label>
        <small className="form-text text-muted">
          Maximum annual contribution of ${this.props.maxAnnualContribution}.<br/>
          Annual catch-up contribution of ${this.props.catchup} for employees over 55.
        </small>
        <div className="row">
          <div className="col-auto">
            ${contribution}
          </div>
          <div className="col">
            <input className="form-control" type="range" min="0" max={this.props.maxContribution} step="1" value={contribution} onChange={this.handleRangeChange} />
          </div>
        </div>
      </div>
    );
  }
}
