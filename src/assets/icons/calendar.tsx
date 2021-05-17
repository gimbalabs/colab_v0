import * as React from "react";
import Svg, { SvgProps, Rect, Path } from "react-native-svg";

export const CalendarIcon = (props: SvgProps) => {
  return (
    <Svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}>
      <Rect x={3} y={4} width={18} height={18} rx={2} ry={2} />
      <Path d="M16 2v4M8 2v4M3 10h18" />
    </Svg>
  );
};
