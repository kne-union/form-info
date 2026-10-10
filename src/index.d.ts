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
  /** 未指定：桌面横排、溢出自动竖排，移动端竖排；`horizontal` 强制横排；`vertical` 强制竖排 */
  direction?: 'horizontal' | 'vertical' | string;
  /** 同 direction */
  orientation?: 'horizontal' | 'vertical' | string;
  onChange?: (current: number) => void;
  onComplete?: (data: any[]) => void;
  stepsClassName?: string;
  className?: string;
  children?: ReactNode | ((props: any) => ReactNode);
}

export interface StepsItem {
  title?: string | ReactNode;
  key?: string | number;
  id?: string | number;
  column?: number | object;
  gap?: number;
  list?: ReactNode[];
  children?: ReactNode;
  /** 显式指定本步校验字段；默认从 list[].props.name 收集 */
  fieldNames?: string[];
}

export interface StepsProps {
  className?: string;
  stepsClassName?: string;
  title?: string | ReactNode;
  subtitle?: string | ReactNode;
  bordered?: boolean;
  items: StepsItem[];
  current?: number;
  defaultCurrent?: number;
  onChange?: (current: number) => void;
  /** 未指定：桌面横排、溢出自动竖排，移动端竖排；`horizontal` 强制横排；`vertical` 强制竖排 */
  direction?: 'horizontal' | 'vertical' | string;
  /** 同 direction */
  orientation?: 'horizontal' | 'vertical' | string;
  showActions?: boolean;
  prevText?: string | ReactNode;
  nextText?: string | ReactNode;
  prevIcon?: ReactNode;
  nextIcon?: ReactNode;
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
  /** 移动端适配，同 @kne/table-view：true 默认卡片、function 自定义、string 走 preset */
  renderMobile?: boolean | string | ((props: any) => ReactNode);
}

export interface EditableListProps {
  name: string;
  label?: string;
  title?: string | ReactNode;
  className?: string;
  bordered?: boolean;
  list?: ReactNode[];
  column?: number;
  itemTitle?: ({ index, data }: { index: number; data: any }) => ReactNode;
  renderItem?: (item: any, { index }: { index: number }) => ReactNode;
  createItem?: () => Record<string, any>;
  rowKey?: string | ((item: any, index: number) => string | number);
  /** bottom：底部添加并追加到末尾；top：标题右侧添加并插入到第一项；both：两处都显示 */
  addPosition?: 'bottom' | 'top' | 'both';
  /** 行区域最大高度，超出滚动；数字为 px，传 false 关闭，默认 600 */
  maxHeight?: number | string | false;
  minLength?: number;
  maxLength?: number;
  rule?: (value: any[], context: any) => Promise<{ result: boolean; errMsg?: string }> | { result: boolean; errMsg?: string };
  important?: boolean;
  empty?: ReactNode;
  addText?: string | ReactNode;
  addIcon?: ReactNode;
  editText?: string | ReactNode;
  editIcon?: ReactNode;
  removeText?: string | ReactNode;
  removeIcon?: ReactNode;
  saveText?: string | ReactNode;
  cancelText?: string | ReactNode;
  editingErrMsg?: string;
  minLengthErrMsg?: string;
  onEditingChange?: (isEditing: boolean) => void;
  [key: string]: any;
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
export declare const FormSteps: FC<FormStepsProps> & { Embed: FC<StepsProps> };
export declare const FormStepsModal: FC<FormStepsModalProps>;
export declare const Steps: FC<StepsProps>;
export declare const validateFieldsByName: (openApi: any, names?: string[]) => Promise<boolean>;
export declare const List: FC<ListProps>;
export declare const SubList: FC<ListProps>;
export declare const TableList: FC<TableListProps>;
export declare const EditableList: FC<EditableListProps>;
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
