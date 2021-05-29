import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export const CheckIcon = (props: SvgProps) => {
  return (
    <Svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.4}
        d="M5 13l4 4L19 7"
      />
    </Svg>
  );
};
