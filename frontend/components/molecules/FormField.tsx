interface FormFieldProps {
  id?: string;
  label: string;
  error?: string;
  helper?: string;
  required?: boolean;
  children: React.ReactNode;
}

export default function FormField({ id, label, error, helper, required, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className="label-caps text-text-secondary"
      >
        {label}
        {required && <span className="text-danger ml-1">*</span>}
      </label>
      {children}
      {error && <p className="text-danger text-xs">{error}</p>}
      {!error && helper && <p className="text-text-muted text-xs">{helper}</p>}
    </div>
  );
}
