import { ViewProps } from "react-native";

export interface SpinnerProps extends ViewProps {
  size: number;
  colors: string[];
  animating: boolean;
  hidesWhenStopped: boolean;
}

export const defaultProps = {
  size: 48,
  color: ["#000", "#000", "#000"],
  animating: true,
  hidesWhenStopped: true,
};
