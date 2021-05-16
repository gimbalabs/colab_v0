import * as React from "react";
import Svg, { SvgProps, Circle, Path } from "react-native-svg";

export const SearchIcon = (props: SvgProps) => {
  return (
    <Svg
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}>
      <Circle cx={11} cy={11} r={8} />
      <Path d="M21 21l-4.35-4.35" />
    </Svg>
  );
};
