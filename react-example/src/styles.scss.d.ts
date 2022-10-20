// config file banner
export type IStyles = {
  title: string;
};

export type ModuleClassNames = keyof IStyles;

declare const styles: IStyles;

export default styles;
