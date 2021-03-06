import React from 'react';
import Selector from './plan/Selector';

export default class PlanSelectionForm extends React.Component {
  constructor(props) {
    super();

    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.isHSA = this.isHSA.bind(this);

    this.state = {
      selections: {
        status: '',
        plan: '',
        isHSA: false,
      },
    }
  }

  findPlan(key) {
    const plans = this.props.plans;
    return plans.find(function(plan) {
      return plan.key === key;
    });
  }

  isHSA(val) {
    const plan = this.findPlan(val);

    return plan ? plan.isHSA : false;
  }

  handleSelectChange(target) {
    var isHSA = this.state.selections.isHSA;
    if(target.name === 'plan') {
      isHSA = this.isHSA(target.value);
    }

    const {state, selections} = this.state;

    this.setState({
      ...state,
      selections: {
        ...selections,
        [target.name]: target.value,
        isHSA: isHSA
      }
    }, () => {
      this.props.onPlanSelectionFormChange(this.state)
    })
  }

  render() {
    const PlanSelectComponents = this.props.plans.map(
      (plan) => {
        return <option key={plan.key} value={plan.key}>{plan.name}</option>
      }
    );

    return(
      <div>
        <Selector name="status" title="Employment Status" onSelectChange={this.handleSelectChange}>
          <option value="fullTime">Full-Time (40 hours per week) or Part-Time (30–39 hours per week)</option>
          <option value="partTime">Part Time (20–29 hours per week)</option>
        </Selector>
        {this.state.selections.status ?
          <Selector name="plan" title="Health Insurance Plan" onSelectChange={this.handleSelectChange}>
            {PlanSelectComponents}
          </Selector>
        : null }
      </div>
    );
  }
}
