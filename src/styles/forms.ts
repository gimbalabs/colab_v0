import { TextStyle } from "react-native";

import * as Colors from "./colors";
import * as Outlines from "./outlines";
import * as Sizing from "./sizing";
import * as Typography from "./typography";

type Input = "primary";
export const input: Record<Input, TextStyle> = {
  primary: {
    lineHeight: 0,
    padding: Sizing.x15,
    borderColor: Colors.neutral.s300,
    borderWidth: Outlines.borderWidth.hairline,
    borderRadius: Outlines.borderRadius.small,
  },
};

type InputLabel = "primary" | "error";
export const inputLabel: Record<InputLabel, TextStyle> = {
  primary: {
    ...Typography.subHeader.x20,
    marginBottom: Sizing.x5,
  },
  error: {
    ...Typography.body.x10,
    marginTop: Sizing.x5,
  },
};
