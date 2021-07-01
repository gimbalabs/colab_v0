import * as React from "react";
import Svg, { SvgProps, Circle } from "react-native-svg";

export const FullyAvailable = (props: SvgProps) => {
  return (
    <Svg width={15} height={15} viewBox="0 0 15 15" fill="none" {...props}>
      <Circle cx={7.5} cy={7.5} r={7} fill="#DBEAFE" stroke="#fff" />
    </Svg>
  );
};
