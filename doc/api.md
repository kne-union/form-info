### FormInfo

基础的表单信息展示组件，用于创建结构化的表单布局。

| 属性名 | 说明 | 类型 | 默认值 |
|-----|----|----|-----|
| column | 列数，支持数字或Flexbox配置 | number \| object | 2 |
| list | 表单项列表 | ReactNode[] | [] |
| gap | 字段间距 | number | 24 |
| className | 自定义样式类名 | string | - |
| title | 标题 | string \| ReactNode | - |
| subtitle | 副标题 | string \| ReactNode | - |

### FormModal

模态框表单组件，在弹窗中展示表单内容。

| 属性名 | 说明 | 类型 | 默认值 |
|-----|----|----|-----|
| open | 是否显示模态框 | boolean | false |
| onCancel | 关闭回调 | function | - |
| formProps | 表单属性 | object | {} |
| autoClose | 提交后自动关闭 | boolean | true |
| okType | 确认按钮类型 | string | primary |
| okText | 确认按钮文本 | string \| ReactNode | 提交 |
| cancelText | 取消按钮文本 | string \| ReactNode | 取消 |
| okButtonProps | 确认按钮属性 | object | - |
| cancelButtonProps | 取消按钮属性 | object | - |
| footer | 底部内容 | ReactNode \| function | - |
| renderModal | 自定义模态框渲染 | function | - |
| modalRender | 自定义内容渲染 | function | - |

### FormSteps

步骤表单组件，支持多步骤表单流程。

| 属性名 | 说明 | 类型 | 默认值 |
|-----|----|----|-----|
| items | 步骤配置项 | array | [] |
| current | 当前步骤 | number | - |
| defaultCurrent | 默认当前步骤 | number | 0 |
| autoStep | 自动切换下一步 | boolean | true |
| direction | 步骤条方向 | string | horizontal |
| orientation | 步骤条方向 | string | horizontal |
| onChange | 步骤切换回调 | function | - |
| onComplete | 完成回调 | function | - |
| stepsClassName | 步骤条样式类名 | string | - |

每个步骤项配置：

| 属性名 | 说明 | 类型 | 默认值 |
|-----|----|----|-----|
| title | 步骤标题 | string \| ReactNode | - |
| formProps | 表单属性 | object | - |
| children | 步骤内容 | ReactNode \| function | - |

### FormStepsModal

模态框步骤表单组件，结合了模态框和步骤表单功能。

| 属性名 | 说明 | 类型 | 默认值 |
|-----|----|----|-----|
| items | 步骤配置项 | array | [] |
| modalProps | 模态框属性 | object | {autoClose: true} |
| completeText | 完成按钮文本 | string \| ReactNode | 完成 |
| nextText | 下一步按钮文本 | string \| ReactNode | 下一步 |
| autoStep | 自动切换下一步 | boolean | true |
| onComplete | 完成回调 | function | - |
| className | 样式类名 | string | - |

### List

列表表单组件，支持动态添加/删除列表项。

| 属性名 | 说明 | 类型 | 默认值 |
|-----|----|----|-----|
| name | 字段名 | string | - |
| title | 列表标题 | string \| ReactNode | - |
| list | 表单项列表 | ReactNode[] | - |
| important | 是否重要样式 | boolean | false |
| addText | 添加按钮文本 | string \| ReactNode | 添加 |
| removeText | 删除按钮文本 | string \| ReactNode | 删除 |
| addIcon | 添加按钮图标 | ReactNode | PlusOutlined |
| removeIcon | 删除按钮图标 | ReactNode | DeleteOutlined |
| empty | 空状态内容 | ReactNode | Empty |
| itemClassName | 列表项样式类名 | string | - |
| className | 样式类名 | string | - |

### TableList

表格列表表单组件，以表格形式展示列表数据。

| 属性名 | 说明 | 类型 | 默认值 |
|-----|----|----|-----|
| name | 字段名 | string | - |
| title | 表格标题 | string \| ReactNode | - |
| list | 表单项列表 | ReactNode[] | - |
| addText | 添加按钮文本 | string \| ReactNode | 添加 |
| removeText | 删除按钮文本 | string \| ReactNode | 删除 |
| addIcon | 添加按钮图标 | ReactNode | PlusOutlined |
| removeIcon | 删除按钮图标 | ReactNode | DeleteOutlined |
| empty | 空状态内容 | ReactNode | Empty |
| className | 样式类名 | string | - |

### MultiField

多字段组件，支持动态添加/删除同类型字段。

| 属性名 | 说明 | 类型 | 默认值 |
|-----|----|----|-----|
| name | 字段名 | string | - |
| label | 字段标签 | string | - |
| field | 字段组件 | React.ComponentType | - |
| block | 是否块级显示 | boolean | false |
| addText | 添加按钮文本 | string \| function | 添加 |
| removeText | 删除按钮文本 | string \| function | - |
| addIcon | 添加按钮图标 | ReactNode | PlusOutlined |
| removeIcon | 删除按钮图标 | ReactNode | DeleteOutlined |
| empty | 空状态内容 | ReactNode | Empty |
| className | 样式类名 | string | - |

### Form

基础表单容器组件。

| 属性名 | 说明 | 类型 | 默认值 |
|-----|----|----|-----|
| type | 表单类型 | string | inner |
| className | 自定义样式类名 | string | - |
| children | 子组件 | ReactNode | - |

### 国际化配置

组件内置以下国际化文本：

| 键名 | 中文 | 英文 |
|-----|----|----|
| submit | 提交 | Submit |
| cancel | 取消 | Cancel |
| complete | 完成 | Complete |
| next | 下一步 | Next |
| addText | 添加 | Add |
| deleteText | 删除 | Delete |

可通过 withLocale HOC 或 useIntl hook 自定义国际化文本。