import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export const PresentationIcon = (props: SvgProps) => {
  return (
    <Svg width={48} height={1} viewBox="0 0 48 1" {...props}>
      <Path d="M0 0h48v1H0z" fill={props.fill} fillRule="evenodd" />
    </Svg>
  );
};
