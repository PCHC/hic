import React from 'react';

export default class Selector extends React.Component {
  constructor(props) {
    super();

    this.handleSelectChange = this.handleSelectChange.bind(this);

    this.state = {
      selectValue: ''
    }
  }

  handleSelectChange(e) {
    this.setState({
      selectValue: e.target.value
    });
    this.props.onSelectChange(e.target);
  }

  render() {
    return(
      <div className="form-group">
        <label>Select {this.props.title}</label>
        <select className="form-control" name={this.props.name} placeholder={this.props.title} onChange={this.handleSelectChange}>
          <option value="">---</option>
          {this.props.children}
        </select>
      </div>
    );
  }
}
