import React from 'react';

export default class Coverage extends React.Component {
  constructor(props) {
    super();

    this.handleCoverageChange = this.handleCoverageChange.bind(this);

    this.state = {
      checked: false
    }
  }

  componentWillMount() {
    const isChecked = this.props.checked ? this.props.checked : false;
    this.setState({
      checked: isChecked,
      name: this.props.name
    })
  }

  handleCoverageChange(e) {
    const isChecked = e.target.checked;
    this.setState({
      checked: isChecked
    }, () => {
      this.props.onCoverageChange(this.state)
    })
  }

  render() {
    return(
      <div className="form-check">
        <label className="form-check-label">
          <input name={this.props.name} type="checkbox" className="form-check-input" onChange={this.handleCoverageChange} checked={this.props.checked} disabled={this.props.disabled} /> {this.props.children}
        </label>
      </div>
    )
  }
}
