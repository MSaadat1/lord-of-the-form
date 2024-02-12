import { useRef } from "react";

export default function PhoneInput({ updateHandler, phoneInput }) {
  const refs = [useRef(), useRef(), useRef(), useRef()];
  const ref0 = refs[0];
  const ref1 = refs[1];
  const ref2 = refs[2];
  const ref3 = refs[3];

  const handleChange = (index) => (e) => {
    const lengths = [2, 2, 2, 1];
    const currentMaxLength = lengths[index];
    const nextRef = refs[index + 1];
    const prevRef = refs[index - 1];
    const value = e.target.value;

    const truncatedValue = value.slice(0, currentMaxLength);
    const shouldGoToNextRef =
      currentMaxLength === truncatedValue.length && nextRef?.current;
    const shouldGoToPrevRef = truncatedValue.length === 0;

    const newState = phoneInput.map((phone, phoneIndex) =>
      index === phoneIndex ? truncatedValue : phone
    );
    if (shouldGoToNextRef) {
      nextRef.current && nextRef.current.focus();
    }

    if (shouldGoToPrevRef && prevRef?.current) {
      prevRef.current.focus();
    }

    updateHandler(newState);
  };

  return (
    <>
      <div className="input-wrap">
        <label htmlFor="phone">Phone:</label>
        <div id="phone-input-wrap">
          <input
            type="text"
            ref={ref0}
            id="phone-input-1"
            placeholder="55"
            value={phoneInput[0]}
            onChange={handleChange(0)}
          />
          -
          <input
            type="text"
            ref={ref1}
            id="phone-input-2"
            placeholder="55"
            value={phoneInput[1]}
            onChange={handleChange(1)}
          />
          -
          <input
            type="text"
            ref={ref2}
            id="phone-input-3"
            placeholder="55"
            value={phoneInput[2]}
            onChange={handleChange(2)}
          />
          -
          <input
            type="text"
            ref={ref3}
            id="phone-input-4"
            placeholder="5"
            value={phoneInput[3]}
            onChange={handleChange(3)}
          />
        </div>
      </div>
    </>
  );
}
