import React, { Component } from "react"

class Converter extends Component {
  state = {
    currencies: [
      "TRY",
      "USD",
      "EUR",
      "GBP",
      "CHF",
      "CNH",
      "CAD",
      "ZAR",
      "HKD",
      "CNY",
      "JPY",
      "RUB",
      "SEK",
      "PLN",
      "MXN",
      "NOK",
      "AUD",
      "SGD",
      "PHP",
      "NZD"
    ],
    base: "TRY",
    amount: "",
    convertTo: "USD",
    result: "",
    date: ""
  }

  handleSelect = (e) => {
    this.setState(
      {
        [e.target.name]: e.target.value,
        result: null
      },
      this.calculate
    )
  }

  handleInput = (e) => {
    this.setState(
      {
        amount: e.target.value,
        result: null,
        date: null
      },
      this.calculate
    )
  }

  calculate = () => {
    const amount = this.state.amount
    if (amount === isNaN) {
      return
    } else {
      fetch(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`)
        .then((res) => res.json())
        .then((data) => {
          const date = data.date
          const result = (data.rates[this.state.convertTo] * amount).toFixed(4)
          this.setState({
            result,
            date
          })
        })
    }
  }

  handleSwap = (e) => {
    const base = this.state.base
    const convertTo = this.state.convertTo
    e.preventDefault()
    this.setState(
      {
        convertTo: base,
        base: convertTo,
        result: null
      },
      this.calculate
    )
  }
  render() {
    const { currencies, base, amount, convertTo, result, date } = this.state
    return (
      <div className="app">
        <div className="container">
          <h3>
            {amount} {base} is equevalent to
          </h3>
          <h1 className="equal">
            {amount === "" ? "0" : result === null ? "Calculating..." : result}{" "}
            {convertTo}
          </h1>
          <p>Last update: {amount === "" ? "" : date === null ? "" : date}</p>
          <div className="textarea">
            <form className="form-inline">
              <input
                type="number"
                className="form-control"
                value={amount}
                onChange={this.handleInput}
              />
              <select
                name="base"
                className="form-control"
                value={base}
                onChange={this.handleSelect}
              >
                {currencies.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </form>
            <button className="swapbtn" onClick={this.handleSwap}>
              ↓↑
            </button>
            <form className="form-inline">
              <input
                className="form-control"
                readOnly="yes"
                value={
                  amount === ""
                    ? ""
                    : result === null
                    ? "Calculating..."
                    : result
                }
              />
              <select
                name="convertTo"
                className="form-control"
                value={convertTo}
                onChange={this.handleSelect}
              >
                {currencies.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Converter
