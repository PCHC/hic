import React from 'react';
import BenefitsPlans from '../data/BenefitsPlans';
import HSAContributions from '../data/HSAContributions';
import Total from '../components/Total';
import HSAForm from '../components/HSAForm';
import PlanSelectionForm from '../components/PlanSelectionForm';
import CoverageForm from '../components/CoverageForm';

export default class CalcPage extends React.Component {
  constructor() {
    super();

    //this.handlePlanChange = this.handlePlanChange.bind(this);
    //this.handleStatusChange = this.handleStatusChange.bind(this);
    //this.isHSA = this.isHSA.bind(this);
    this.setCosts = this.setCosts.bind(this);
    //this.setCoverage = this.setCoverage.bind(this);
    this.zeroCosts = this.zeroCosts.bind(this);
    //this.doCalc = this.doCalc.bind(this);
    //this.doInsuranceCalc = this.doInsuranceCalc.bind(this);
    //this.setHSAContributions = this.setHSAContributions.bind(this);

    this.handlePlanSelectionFormChange = this.handlePlanSelectionFormChange.bind(this);
    this.handleCoverageFormChange = this.handleCoverageFormChange.bind(this);
    this.handleHSAFormChange = this.handleHSAFormChange.bind(this);

    this.zeroHSA = this.zeroHSA.bind(this);

    this.plans = BenefitsPlans;
    this.hsaContributions = HSAContributions;
    this.state = {
      selections : {
        status: '',
        plan: '',
        isHSA: false,
        coverage : {
          employee: true,
          spouse: false,
          children: false,
        }
      },
      costs: {
        employee: 0,
        spouse: 0,
        children: 0,
        family: 0,
      },
      hsa : {
        employeeMax: 0,
        employer: 0,
        catchup: 0,
      },
      totals : {
        insurance: 0,
        employeeHSA: 0,
        employerHSA: 0
      }
    }
  }

  setCosts() {
    const {state, selections} = this.state;

    if(!selections.plan || !selections.status) {
      this.zeroCosts();
      this.zeroHSA();
      return;
    }

    const plan = this.findPlan(selections.plan);
    const planCosts = plan.costs[selections.status];

    this.setState({
      ...state,
      costs: {
        ...planCosts
      }
    }, () => {
      this.setHSA();
    })
  }

  zeroCosts() {
    const {state} = this.state;

    this.setState({
      ...state,
      costs: {
        employee: 0,
        spouse: 0,
        children: 0,
        family: 0
      }
    }, () => {
      this.doCalc();
    })
  }

  setHSA() {
    const {state, selections} = this.state;
    const hsaContributions = this.hsaContributions;

    if(!selections.isHSA || selections.status === '' || selections.plan === '') {
      this.zeroHSA();
      return true;
    }

    const isFamily = (selections.coverage.employee && (selections.coverage.spouse || selections.coverage.children)) ? 'family' : 'employee';

    this.setState({
      ...state,
      hsa: {
        employeeMax: hsaContributions.employee.maximum[isFamily],
        employer: hsaContributions.employer[selections.status][isFamily],
        catchup: hsaContributions.employee.catchup
      }
    }, () => {
      return true;
    });
  }

  zeroHSA() {
    const {state} = this.state;

    this.setState({
      ...state,
      hsa: {
        employeeMax: 0,
        employer: 0,
        catchup: 0,
      }
    })
  }

  handlePlanSelectionFormChange(v) {
    const {state, selections} = this.state;

    const planselections = v.selections;

    this.setState({
      ...state,
      selections: {
        ...selections,
        ...planselections
      }
    }, () => {
      this.setHSA();
      this.doInsuranceCalculation();
    })
  }

  handleCoverageFormChange(c) {
    const {state, selections} = this.state;

    const coverageselections = c.coverage;

    this.setState({
      ...state,
      selections: {
        ...selections,
        coverage: {
          ...selections['coverage'],
          ...coverageselections
        }
      }
    }, () => {
      this.setHSA();
      this.doInsuranceCalculation();
    })
  }

  handleHSAFormChange(h) {
    const {state, totals} = this.state;
    const {employeeHSA} = h.totals;

    this.setState({
      ...state,
      totals: {
        ...totals,
        employeeHSA: employeeHSA
      }
    })
  }

  findPlan(key) {
    const plans = this.plans;
    return plans.find(function(plan) {
      return plan.key === key;
    });
  }

  doInsuranceCalculation() {
    const {state, selections, totals} = this.state;

    if(!selections.plan || !selections.status) {
      this.setState({
        ...state,
        totals: {
          insurance: 0,
          employeeHSA: 0,
          employerHSA: 0,
        }
      });
      return;
    }

    const plan = this.findPlan(selections.plan);
    const costs = plan.costs[selections.status];

    var insuranceTotal = 0;

    insuranceTotal += selections.coverage.employee ? costs.employee : 0;
    insuranceTotal += selections.coverage.spouse ? costs.spouse : 0;
    insuranceTotal += selections.coverage.children ? costs.children : 0;

    insuranceTotal += (selections.coverage.spouse && selections.coverage.children) ? costs.family : 0;

    this.setState({
      ...state,
      totals: {
        ...totals,
        insurance: insuranceTotal,
        employeeHSA: selections.isHSA ? totals.employeeHSA : 0,
        employerHSA: selections.isHSA ? totals.employerHSA : 0,
      }
    })
  }

  render() {
    const plans = this.plans;
    const {totals, hsa} = this.state;

    return(
      <div>
        <h1>2018 PCHC Health Insurance Cost Calculator</h1>
        <p className="lead font-weight-light">This tool is designed to help you quickly estimate your health insurance costs per paycheck.<br/>
        While we strive to keep this information accurate, please see the Employee Benefits Guide for the most up-to-date information.</p>
        <div className="row">
          <div className="col-6">
            <PlanSelectionForm plans={plans} onPlanSelectionFormChange={this.handlePlanSelectionFormChange} />

            { this.state.selections.status && this.state.selections.plan ?
              <CoverageForm onCoverageChange={this.handleCoverageFormChange} />
            : null }

            { this.state.selections.isHSA ?
              <HSAForm selections={this.state.selections} plans={plans} onHSAFormChange={this.handleHSAFormChange} maxContribution={
                Math.round((this.state.hsa.employeeMax + this.state.hsa.catchup)/26*100)/100
              } maxAnnualContribution={this.state.hsa.employeeMax} catchup={this.state.hsa.catchup} />
            : null }

          </div>
          <div className="col">
            <Total title="Biweekly Grand Total" alertType="alert alert-success" price={totals.insurance + totals.employeeHSA}>
              Estimated total amount subtracted from your biweekly pay
            </Total>
            <Total title="Biweekly Insurance Cost" alertType="alert alert-primary" price={totals.insurance}>
              Biweekly health insurance premium
            </Total>

            { this.state.selections.isHSA ?
              <div className="hsa-totals">
                <div className="row">
                  <div className="col d-flex align-items-stretch">
                    <Total title="Biweekly Employee HSA Contribution" alertType="alert alert-danger" price={totals.employeeHSA}>
                      Amount contributed by the employee per pay period.<br/>
                      <small>Maximum annual contribution of ${this.state.hsa.employeeMax}</small>
                    </Total>
                  </div>
                  <div className="col d-flex align-items-stretch">
                    <Total title="Annual Employee HSA Contribution" alertType="alert alert-danger" price={totals.employeeHSA*26}>
                      Amount contributed by the employee per year.<br/>
                      <small>Maximum annual contribution of ${this.state.hsa.employeeMax}.<br/>
                      Maximum annual catch-up contribution of ${this.state.hsa.catchup} for employees over 55.</small>
                    </Total>
                  </div>
                </div>

                <div className="row">
                  <div className="col d-flex align-items-stretch">
                    <Total title="Biweekly PCHC HSA Contribution" alertType="alert alert-warning" price={Math.round(hsa.employer/26*100)/100}>
                      Estimated average amount contributed by PCHC per pay period.
                    </Total>
                  </div>
                  <div className="col d-flex align-items-stretch">
                    <Total title="Annual PCHC HSA Contribution" alertType="alert alert-warning" price={hsa.employer}>
                      Amount contributed by PCHC per pay year.
                    </Total>
                  </div>
                </div>
              </div>
            : null }
          </div>
        </div>
      </div>
    )
  }
}
