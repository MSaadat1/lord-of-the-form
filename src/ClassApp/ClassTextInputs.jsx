import { Component } from "react";

export class ClassTextIput extends Component {
  render() {
    const { label, inputProps } = this.props;
    return (
      <div className="input-wrap">
        <label>{label}:</label>
        <input type="text" {...inputProps} />
      </div>
    );
  }
}
