import React, { useState } from 'react';

interface FormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const FormField: React.FC<FormFieldProps> = ({ label, value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <label>{label}</label>
      <input type="text" value={value} onChange={handleChange} />
    </div>
  );
};

export default FormField;
