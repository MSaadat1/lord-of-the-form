/* eslint-disable react/no-string-refs */
import React, { Component } from "react";

export default class ClassPhoneInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phoneInputs: props.phoneInput,

      refs: [
        React.createRef(),
        React.createRef(),
        React.createRef(),
        React.createRef(),
      ],
    };
  }

  handleChange = (index) => (e) => {
    const lengths = [2, 2, 2, 1];
    const currentMaxLength = lengths[index];
    const nextRef = this.state.refs[index + 1];
    const prevRef = this.state.refs[index - 1];
    const value = e.target.value;

    const truncatedValue = value.slice(0, currentMaxLength);
    const shouldGoToNextRef =
      currentMaxLength === truncatedValue.length && nextRef?.current;
    const shouldGoToPrevRef = truncatedValue.length === 0;

    const newState = this.state.phoneInputs.map((phone, phoneIndex) =>
      index === phoneIndex ? truncatedValue : phone
    );
    if (shouldGoToNextRef) {
      nextRef.current && nextRef.current.focus();
    }

    if (shouldGoToPrevRef && prevRef?.current) {
      prevRef.current.focus();
    }

    this.setState({ phoneInputs: newState });
  };
  render() {
    const { phoneInputs } = this.state;

    return (
      <div className="input-wrap">
        <label htmlFor="phone">Phone:</label>
        <div id="phone-input-wrap">
          <input
            type="text"
            ref={this.state.refs[0]}
            id="phone-input-1"
            placeholder="55"
            value={phoneInputs[0]}
            onChange={this.handleChange(0)}
          />
          -
          <input
            type="text"
            ref={this.state.refs[1]}
            id="phone-input-2"
            placeholder="55"
            value={phoneInputs[1]}
            onChange={this.handleChange(1)}
          />
          -
          <input
            type="text"
            ref={this.state.refs[2]}
            id="phone-input-3"
            placeholder="55"
            value={phoneInputs[2]}
            onChange={this.handleChange(2)}
          />
          -
          <input
            type="text"
            ref={this.state.refs[3]}
            id="phone-input-4"
            placeholder="5"
            value={phoneInputs[3]}
            onChange={this.handleChange(3)}
          />
        </div>
      </div>
    );
  }
}
