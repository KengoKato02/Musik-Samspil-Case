import React from "react";

interface TextAreaProps {
  name: string;
  placeholder: string;
  errorMessages?: string;
  value: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextArea = ({
  name,
  placeholder,
  errorMessages,
  label,
  value,
  onChange,
}: TextAreaProps) => {
  return (
    <div>
      <label htmlFor="textareaId" className="text-sm text-[14px] text-medium-gray">
        {label}
      </label>
      <textarea
        id="textareaId"
        className="block w-full p-2 mt-1 border border-soft-gray rounded-xl text-base text-medium-gray outline-none focus:ring-indigo-500 "
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {errorMessages && <p className="text-red-400 text-[14px]">{errorMessages}</p>}
    </div>
  );
};
