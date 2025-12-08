import { ReactNode, ComponentType, FC } from 'react';

export interface FormInfoProps {
  className?: string;
  column?: number | object;
  list?: ReactNode[];
  gap?: number;
  title?: string | ReactNode;
  subtitle?: string | ReactNode;
  extra?: ReactNode;
}

export interface FormModalProps {
  open?: boolean;
  title?: ReactNode;
  onCancel?: () => void;
  formProps?: {
    onSubmit?: (data: any, context: any, ...args: any[]) => Promise<any> | any;
    data?: any;
    [key: string]: any;
  };
  autoClose?: boolean;
  okType?: string;
  okButtonProps?: object;
  okText?: string | ReactNode;
  onOk?: () => void | Promise<any>;
  cancelButtonProps?: object;
  cancelText?: string | ReactNode;
  footer?: ReactNode | (({ defaultFooter, props }: any) => ReactNode);
  renderModal?: (props: any) => ReactNode;
  modalRender?: ({ formChildren, defaultChildren, props }: any) => ReactNode;
  width?: string | number;
  centered?: boolean;
  closable?: boolean;
  maskClosable?: boolean;
  destroyOnClose?: boolean;
  className?: string;
}

export interface StepItem {
  title: string | ReactNode;
  formProps?: {
    onSubmit?: (data: any, context: any, ...args: any[]) => Promise<any> | any;
    data?: any;
    [key: string]: any;
  };
  children?: ReactNode | (({ children, isLastStep, currentStep, onStepChange, getStepCache }: any) => ReactNode);
}

export interface FormStepsProps {
  items: StepItem[];
  current?: number;
  defaultCurrent?: number;
  autoStep?: boolean;
  direction?: string;
  orientation?: string;
  onChange?: (current: number) => void;
  onComplete?: (data: any[]) => void;
  stepsClassName?: string;
  className?: string;
  children?: ReactNode | ((props: any) => ReactNode);
}

export interface FormStepsModalProps {
  items: StepItem[];
  modalProps?: {
    open?: boolean;
    title?: ReactNode;
    onCancel?: () => void;
    autoClose?: boolean;
    [key: string]: any;
  };
  completeText?: string | ReactNode;
  nextText?: string | ReactNode;
  autoStep?: boolean;
  onComplete?: (data: any[]) => void;
  className?: string;
}

export interface ListProps {
  className?: string;
  itemClassName?: string;
  removeIcon?: ReactNode;
  removeText?: string | ReactNode;
  addText?: string | ReactNode;
  addIcon?: ReactNode;
  important?: boolean;
  title?: string | ReactNode;
  name: string;
  list?: ReactNode[];
  empty?: ReactNode;
  itemTitle?: ({ index }: { index: number }) => string;
  block?: boolean;
}

export interface TableListProps {
  className?: string;
  addIcon?: ReactNode;
  addText?: string | ReactNode;
  removeIcon?: ReactNode;
  removeText?: string | ReactNode;
  title?: string | ReactNode;
  name: string;
  list?: ReactNode[];
  empty?: ReactNode;
  itemTitle?: ({ index }: { index: number }) => string;
}

export interface MultiFieldProps {
  className?: string;
  addText?: string | ((label: string) => string);
  addIcon?: ReactNode;
  removeIcon?: ReactNode;
  removeText?: string | ((label: string) => string) | null;
  empty?: ReactNode;
  name: string;
  label: string;
  field: ComponentType<any>;
  block?: boolean;
  rule?: string;
}

export interface FormProps {
  className?: string;
  type?: string;
  children?: ReactNode;
  onSubmit?: (data: any, ...args: any[]) => Promise<any> | any;
  [key: string]: any;
}

// 组件类型声明
export declare const FormInfo: FC<FormInfoProps>;
export declare const FormModal: FC<FormModalProps>;
export declare const FormSteps: FC<FormStepsProps>;
export declare const FormStepsModal: FC<FormStepsModalProps>;
export declare const List: FC<ListProps>;
export declare const SubList: FC<ListProps>;
export declare const TableList: FC<TableListProps>;
export declare const MultiField: FC<MultiFieldProps>;
export declare const Form: FC<FormProps>;

// 默认导出
export default FormInfo;

// 国际化相关
export interface LocaleType {
  submit: string;
  cancel: string;
  complete: string;
  next: string;
  addText: string;
  deleteText: string;
}
