import React from "react";
import "./Error.scss";

interface IErrorProps {
  message: string;
}

const Error: React.FC<IErrorProps> = ({ message }) => (
  <div className="error-wrapper">{message}</div>
);

export default Error;
