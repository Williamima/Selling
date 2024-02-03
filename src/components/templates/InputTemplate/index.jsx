import { forwardRef } from "react";

const InputTemplate = forwardRef(({ label, error, ...rest }, ref) => {
  return (
    <>
      <label className="label">{label}</label>
      <input className="input" ref={ref} {...rest} />
      {error ? <p>{error.message}</p> : null}
    </>
  );
});

export { InputTemplate };
