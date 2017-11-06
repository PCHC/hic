import React from 'react';

export default class Selector extends React.Component {
  constructor(props) {
    super();

    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.resetForm = this.resetForm.bind(this);

    this.state = {
      selectValue: ''
    }
  }

  resetForm () {
    this.setState({
      selectValue: ''
    });
    this.props.onSelectChange({name: this.props.name, value: ''});
  }

  componentWillMount() {
    this.resetForm();
  }

  componentWillUnmount() {
    this.resetForm();
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
        <h4><label>Select {this.props.title}</label></h4>
        <select className="form-control" name={this.props.name} placeholder={this.props.title} onChange={this.handleSelectChange}>
          <option value="">Choose...</option>
          {this.props.children}
        </select>
        <hr />
      </div>
    );
  }
}
