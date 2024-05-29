import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const Button = ({ label, ...otherProps }: Props) => {
  return <button {...otherProps}>{label}</button>;
};

export default Button;
