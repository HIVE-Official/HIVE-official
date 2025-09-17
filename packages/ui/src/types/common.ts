export type FlexValue = string | number;
export type StyleValue = string | number | undefined;
export type ClassName = string | undefined;
export type Children = React.ReactNode;

export interface BaseComponentProps {
  className?: ClassName;
  style?: React.CSSProperties;
  children?: Children;
}

export type SelectValue = string | string[] | undefined;
export type RadioValue = string;
export type CheckboxValue = boolean;

export interface EventHandlers {
  onClick?: (event: React.MouseEvent) => void;
  onChange?: (event: React.ChangeEvent) => void;
  onFocus?: (event: React.FocusEvent) => void;
  onBlur?: (event: React.FocusEvent) => void;
}
