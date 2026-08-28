### FormInfo

基础表单分区组件，用于结构化展示一组表单项。

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| column | 列数；支持数字，或传给 `@kne/flex-box` 的配置对象 | `number \| object` | `2` |
| list | 表单项列表 | `ReactNode[]` | `[]` |
| gap | 字段间距 | `number` | `24` |
| className | 自定义样式类名 | `string` | - |
| title | 标题 | `string \| ReactNode` | - |
| subtitle | 副标题 | `string \| ReactNode` | - |
| extra | 标题栏右侧额外内容 | `ReactNode` | - |
| bordered | 是否显示边框（透传 `InfoPage.Part`） | `boolean` | - |

### Form

基础表单容器，封装 `@kne/react-form-antd` 的 Form。

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 表单类型 | `string` | `inner` |
| className | 自定义样式类名 | `string` | - |
| children | 子节点 | `ReactNode` | - |
| onSubmit | 提交回调 | `(data, ...args) => any` | - |

其余属性透传给底层 Form。

### FormModal

弹窗表单：在 Modal 中承载表单内容。

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| open | 是否显示 | `boolean` | `false` |
| title | 弹窗标题 | `ReactNode` | - |
| onCancel | 关闭回调 | `() => void` | - |
| formProps | 透传给内部 Form 的属性（含 `data`、`onSubmit` 等） | `object` | `{}` |
| autoClose | 提交成功后自动关闭 | `boolean` | `true` |
| okType | 确认按钮类型 | `string` | `primary` |
| okText | 确认按钮文案 | `string \| ReactNode` | 提交 |
| cancelText | 取消按钮文案 | `string \| ReactNode` | 取消 |
| okButtonProps | 确认按钮属性 | `object` | - |
| cancelButtonProps | 取消按钮属性 | `object` | - |
| onOk | 自定义确认逻辑 | `() => void \| Promise` | - |
| footer | 底部区域；可为函数 `({ defaultFooter, props }) => ReactNode` | `ReactNode \| function` | - |
| renderModal | 自定义整窗渲染。除 antd Modal 参数外，会传入 `formProps`、`cancelText`、`saveText`、`autoClose`；默认实现会剥掉这些字段再交给 antd Modal | `(props) => ReactNode` | - |
| modalRender | 自定义内容渲染 `({ formChildren, defaultChildren, props })` | `function` | - |
| width / centered / closable / maskClosable / destroyOnClose / className | 透传 antd Modal | - | - |

### FormSteps

独立步骤向导：每一步自带 Form，适合多表单向导流程。导出上同时挂载 `FormSteps.Embed`（等同下方 **Steps**）。

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 步骤配置 | `StepItem[]` | `[]` |
| current | 受控当前步骤 | `number` | - |
| defaultCurrent | 默认步骤 | `number` | `0` |
| autoStep | 提交成功后自动进入下一步 / 触发完成 | `boolean` | `true` |
| direction / orientation | 步骤条方向 | `string` | `horizontal` |
| onChange | 步骤变化 | `(current: number) => void` | - |
| onComplete | 最后一步完成回调，参数为各步缓存 | `(stepCache) => void` | - |
| stepsClassName | 步骤条样式类名 | `string` | - |
| className | 外层样式类名 | `string` | - |
| children | 自定义包裹渲染；可为函数 | `ReactNode \| function` | - |

每个 `items[]` 项：

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 步骤标题 | `string \| ReactNode` | - |
| formProps | 该步 Form 属性（`data`、`onSubmit` 等） | `object` | - |
| children | 步骤内容；可为函数，注入 `isLastStep` / `currentStep` / `onStepChange` / `getStepCache` | `ReactNode \| function` | - |

### Steps（`FormSteps.Embed`）

嵌入**父级 Form** 的分步区域（不自建 Form）。字段始终挂载，随父表单一并提交。

行为约定：

- 点击「下一步」：校验当前步字段
- 父表单提交失败（`form:submit:error` / 提交未通过）：跳到首个出错步骤
- 父表单重置（`form:reset`）：回到第 0 步

独立多 Form 向导请继续使用 **FormSteps**，二者互不影响。

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 步骤配置 | `StepsItem[]` | `[]` |
| title | 分区标题 | `string \| ReactNode` | - |
| subtitle | 副标题 | `string \| ReactNode` | - |
| bordered | 是否显示边框 | `boolean` | - |
| current | 受控当前步骤 | `number` | - |
| defaultCurrent | 默认步骤 | `number` | `0` |
| onChange | 步骤变化 | `(current: number) => void` | - |
| direction / orientation | 步骤条方向 | `string` | - |
| showActions | 是否显示上一步 / 下一步 | `boolean` | `true` |
| prevText / nextText | 按钮文案 | `string \| ReactNode` | 上一步 / 下一步 |
| prevIcon / nextIcon | 按钮图标 | `ReactNode` | - |
| stepsClassName / className | 样式类名 | `string` | - |

每个 `items[]` 项：

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 步骤标题 | `string \| ReactNode` | - |
| list | 字段列表（同 FormInfo.list） | `ReactNode[]` | - |
| column / gap | 传给内部 FormInfo | `number \| object` | - |
| children | 自定义内容（与 `list` 二选一） | `ReactNode` | - |
| fieldNames | 本步校验字段名；默认从 `list` 的 `name` 收集 | `string[]` | - |
| key / id | 步骤标识 | `string \| number` | - |

另导出工具方法 `validateFieldsByName(openApi, names?)`，按字段名触发校验。

### FormStepsModal

弹窗版步骤向导（FormSteps + Modal）。

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 步骤配置（同 FormSteps） | `StepItem[]` | `[]` |
| modalProps | 透传 FormModal / Modal（含 `open`、`title`、`autoClose` 等） | `object` | `{ autoClose: true }` |
| completeText | 完成按钮文案 | `string \| ReactNode` | 完成 |
| nextText | 下一步按钮文案 | `string \| ReactNode` | 下一步 |
| autoStep | 是否自动切步 | `boolean` | `true` |
| onComplete | 完成回调 | `(data) => void` | - |
| className | 样式类名 | `string` | - |

### List

动态列表表单。子项卡片默认带边框；`bordered` 控制外层 Part。移动端边框由容器查询收起，不依赖 JS 开关。

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 字段名 | `string` | - |
| title | 列表标题 | `string \| ReactNode` | - |
| list | 每项内的表单项 | `ReactNode[]` | - |
| important | 重要样式（子项头背景等） | `boolean` | `false` |
| bordered | 外层 Part 是否边框 | `boolean` | - |
| itemTitle | 子项标题；`({ index, data }) => string` | `function` | - |
| addText / removeText | 添加 / 删除文案 | `string \| ReactNode` | 添加 / 删除 |
| addIcon / removeIcon | 添加 / 删除图标 | `ReactNode` | `PlusOutlined` / `DeleteOutlined` |
| empty | 空状态 | `ReactNode` | `Empty` |
| itemClassName / className | 样式类名 | `string` | - |
| block | 是否块级 | `boolean` | - |

`SubList` 与 `List` 为同一实现。

### TableList

表格形态的动态列表。桌面端字段列等分对齐，列过多时可横向滚动，操作列在溢出时 sticky；移动端走 `@kne/table-view` 的 `renderMobile` 卡片布局。

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 字段名 | `string` | - |
| title | 表格标题 | `string \| ReactNode` | - |
| list | 列对应的表单项 | `ReactNode[]` | - |
| bordered | 外层 Part 是否边框 | `boolean` | - |
| renderMobile | 移动端渲染：`true` 默认卡片；`function` 自定义；`string` 走 table-view preset；`false` 关闭 | `boolean \| string \| function` | `true` |
| addText / removeText | 添加 / 删除文案 | `string \| ReactNode` | 添加 / 删除 |
| addIcon / removeIcon | 添加 / 删除图标 | `ReactNode` | `PlusOutlined` / `DeleteOutlined` |
| empty | 空状态 | `ReactNode` | `Empty` |
| itemTitle | 子项标题函数 | `function` | - |
| className | 样式类名 | `string` | - |

### MultiField

同一字段可动态增减多条（同类型控件）。

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 字段名 | `string` | - |
| label | 字段标签 | `string` | - |
| field | 字段组件 | `ComponentType` | - |
| block | 是否块级 | `boolean` | `false` |
| rule | 校验规则字符串 | `string` | - |
| addText | 添加文案；可为 `(label) => string` | `string \| function` | 添加 |
| removeText | 删除文案；可为函数；传 `null` 隐藏 | `string \| function \| null` | - |
| addIcon / removeIcon | 图标 | `ReactNode` | `PlusOutlined` / `DeleteOutlined` |
| empty | 空状态 | `ReactNode` | `Empty` |
| className | 样式类名 | `string` | - |

### 国际化

内置文案键（`zh-CN` / `en-US`）：

| 键名 | 中文 | 英文 |
| --- | --- | --- |
| submit | 提交 | Submit |
| cancel | 取消 | Cancel |
| complete | 完成 | Complete |
| prev | 上一步 | Previous |
| next | 下一步 | Next |
| addText | 添加 | Add |
| deleteText | 删除 | Delete |
| untitledStep | 第{index}步 | Step {index} |

可通过 `withLocale` 或 `@kne/react-intl` 的 `useIntl` 覆盖。
