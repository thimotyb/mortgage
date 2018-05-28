import React from 'react';
import AmortizationChart from './AmortizationChart';

let calculatePayment = (principal, years, rate) => {
    let monthlyRate = rate / 100 / 12;
    let monthlyPayment = principal * monthlyRate / (1 - (Math.pow(1/(1 + monthlyRate), years * 12)));
    let balance = principal;
    let amortization = [];
    for (let y=0; y<years; y++) {
        let interestY = 0;  //Interest payment for year y
        let principalY = 0; //Principal payment for year y
        for (let m=0; m<12; m++) {
            let interestM = balance * monthlyRate;       //Interest payment for month m
            let principalM = monthlyPayment - interestM; //Principal payment for month m
            interestY = interestY + interestM;
            principalY = principalY + principalM;
            balance = balance - principalM;
        }
        amortization.push({principalY, interestY, balance});
    }
    return {monthlyPayment, amortization};
};

class MortgageCalculator extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            principal: this.props.principal,
            years: this.props.years,
            rate: this.props.rate
        };
    }

    principalChange(event) {
        this.setState({principal: event.target.value});
    }

    yearsChange(event) {
        this.setState({years: event.target.value});
    }

    rateChange(event) {
        this.setState({rate: event.target.value});
    }

    render() {
        let payment = calculatePayment(this.state.principal, this.state.years, this.state.rate);
        let monthlyPayment = payment.monthlyPayment;
        let amortization = payment.amortization;
        return (
            <div className="content">
                <div className="form">
                    <div>
                        <label>Principal:</label>                       
                        <input type="text" value={this.state.principal} onChange={this.principalChange.bind(this)}/>
                    </div>
                    <div>
                        <label>Years:</label>
                        <input type="text" value={this.state.years} onChange={this.yearsChange.bind(this)}/>
                    </div>
                    <div>
                        <label htmlFor="rate">Rate:</label>
                        <input type="text" value={this.state.rate} onChange={this.rateChange.bind(this)}/>
                    </div>
                </div>
                <h2>Monthly Payment: <span className="currency">{Number(monthlyPayment.toFixed(2)).toLocaleString()}</span></h2>
                <AmortizationChart data={amortization}/>
            </div>
        );
    }
};

export default MortgageCalculator;