export default function FunctionalTextInput({ lable, inputProps }) {
  return (
    <div className="input-wrap">
      <label>{lable}:</label>
      <input type="text" {...inputProps} />
    </div>
  );
}
