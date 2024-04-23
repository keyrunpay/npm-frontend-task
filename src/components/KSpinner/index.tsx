import React from "react";

interface IProps {
  type: "dark" | "white";
}

export function KSpinner(props: IProps) {
  return <img width={16} src={`/svg/spinner_${props.type}.svg`} alt="" />;
}
