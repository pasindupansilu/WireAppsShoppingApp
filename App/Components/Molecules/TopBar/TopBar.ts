export type ActionIconProps = {
  label?: string | JSX.Element | React.ReactNode;
  icon: JSX.Element | React.ReactNode;
  onPress?: () => void;
  onLongPress?: () => void;
};

export type RenderIconListOutput =
  | JSX.Element
  | React.ReactNode
  | JSX.Element[]
  | React.ReactNode[]
  | null;

export type TopBarBaseProps = {
  title: string | JSX.Element | React.ReactNode;
  titleAlign?: 'left' | 'center' | 'right';
  actionIcons?: ActionIconProps[];
  classNames?: string;
};
export type TopBarProps = TopBarBaseProps &
  (
    | {
        showBackButton?: boolean;
        backAction?: () => void;
      }
    | {
        showBackButton?: never;
        backAction?: never;
      }
  );
