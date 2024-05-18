export const FormInput = ({
  name,
  label,
  type,
  className,
  value,
  onChange,
  placeholder,
  required,
}) => {
  return (
    <div className="col-12">
      <label className="form-label fw-bold ">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <input
        name={name}
        type={type || "text"}
        className={`form-control ${className}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export const FormTextArea = ({
  name,
  label,
  className,
  value,
  onChange,
  required,
}) => {
  return (
    <div className="col-12">
      <label className="form-label fw-bold">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <textarea
        name={name}
        className={`form-control ${className}`}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export const FormSelect = ({
  name,
  label,
  required,
  onChange,
  value,
  options,
}) => {
  return (
    <div className="col-12 mb-2">
      <label htmlFor="category" className="form-label fw-bold">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <select
        name={name}
        onChange={onChange}
        value={value}
        className="form-control"
      >
        <option value="">Select {label}</option>
        {options.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};
