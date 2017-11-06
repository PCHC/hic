import React from 'react';

export default class Total extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return(
      <div className={this.props.alertType}>
        <h4 className="alert-heading">${Math.round(this.props.price*100)/100}</h4>
        <p><strong>{this.props.title}</strong></p>
        {this.props.children &&
          <div>
            <hr/>
            <p className="mb-0">{this.props.children}</p>
          </div>
        }
      </div>
    );
  }
}
