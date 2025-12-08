
# form-info


### 描述

构建一个更加美观的form表单组件


### 安装

```shell
npm i --save @kne/form-info
```


### 概述

这是一个基于 React 和 Ant Design 的高颜值表单组件库，专为现代化 Web 应用设计。该组件库通过优雅的视觉设计和丰富的交互功能，为开发者提供了一套完整的表单解决方案。

## 核心特点

**美观优雅的界面设计** - 采用现代化的视觉风格，配合精心设计的间距、色彩和排版，让表单界面更加专业美观。

**多样化的表单组件** - 提供 FormInfo、FormModal、FormSteps、FormStepsModal、List、TableList、MultiField 等丰富的表单组件，满足各种复杂的业务场景需求。

**灵活的布局系统** - 支持响应式网格布局和 Flexbox 布局，可以轻松实现单列、多列以及自定义复杂布局。

**强大的列表功能** - 内置 List、TableList 等列表组件，支持动态添加/删除、嵌套列表等高级功能。

**多步骤表单支持** - 提供 FormSteps 和 FormStepsModal 组件，轻松实现向导式表单流程，提升用户体验。

**国际化支持** - 内置中英文语言包，支持自定义国际化文本，便于多语言应用开发。

**完整的事件系统** - 提供丰富的回调函数和事件钩子，支持表单验证、数据处理、状态管理等完整生命周期控制。

**高度可定制** - 组件设计充分考虑扩展性，支持自定义样式、图标、按钮文本等，满足个性化需求。

该组件库特别适合企业级应用、管理系统、数据录入平台等需要大量表单交互的场景，能够显著提升开发效率和用户体验。

### 示例(全屏)

#### 示例代码

- 基础表单示例
- 展示FormInfo、List、TableList、MultiField等基础组件的组合使用，包含普通字段、隐藏字段、多字段、列表、表格列表等多种表单元素的完整示例
- _FormInfo(@kne/current-lib_form-info),antd(antd),(@kne/current-lib_form-info/dist/index.css)

```jsx
const {default: FormInfo, List, TableList, MultiField, Form, Input, TextArea, SubmitButton, ResetButton} = _FormInfo;
const {Flex} = antd;

const BaseExample = () => {
    return <Form>
        <FormInfo title="标题" subtitle="附标题" list={[<Input name="field_1" label="字段1" rule="REQ"/>,
            <Input name="field_2" label="字段2" rule="REQ"/>,
            <Input name="field_3" hidden label="隐藏字段" rule="REQ"/>,
            <MultiField name="field_4" label="字段4" rule="REQ" field={Input} block/>,
            <TextArea name="description" label="描述" block/>]}/>
        <List title="列表" name="list-1" itemTitle={({index}) => `项目${index + 1}`}
              list={[<Input name="field_1" label="字段1" rule="REQ"/>, <Input name="field_2" label="字段2" rule="REQ"/>,
                  <TextArea name="description" label="描述" block/>]}/>
        <List title="复杂列表" name="list-2" itemTitle={({index}) => `项目${index + 1}`} important
              list={[<Input name="field_1" label="字段1" rule="REQ"/>, <Input name="field_2" label="字段2" rule="REQ"/>,
                  <TextArea name="description" label="描述" block/>,
                  <List title="子级列表" itemTitle={({index}) => `子级项目${index + 1}`}
                        list={[<Input name="field_1" label="字段1" rule="REQ"/>,
                            <Input name="field_2" label="字段2" rule="REQ"/>,
                            <TextArea name="description" label="描述" block/>]} block/>]}/>
        <TableList title="表格列表" name="list-3" itemTitle={({index}) => `项目${index + 1}`}
                   list={[<Input name="field_1" label="字段1" rule="REQ"/>,
                       <Input name="field_2" label="字段2" rule="REQ"/>,
                       <Input name="description" label="描述" block/>]}/>
        <Flex justify="center" gap={8}>
            <SubmitButton>提交</SubmitButton>
            <ResetButton>重置</ResetButton>
        </Flex>
    </Form>;
};

render(<BaseExample/>);

```

- 模态框表单示例
- 演示FormModal组件的使用，展示如何在弹窗中展示表单，支持表单数据初始化和提交后的自动关闭功能
- _FormInfo(@kne/current-lib_form-info),antd(antd),(@kne/current-lib_form-info/dist/index.css)

```jsx
const {default: FormInfo, FormModal, List, Input, TextArea} = _FormInfo;
const {useState} = React;
const {Button} = antd;

const BaseExample = () => {
    const [open, onOpenChange] = useState(false);
    return <>
        <Button onClick={() => {
            onOpenChange(true);
        }}>打开Form弹窗</Button>
        <FormModal formProps={{
            data: {name: '张三'}
        }} open={open} onCancel={() => {
            onOpenChange(false);
        }}>
            <FormInfo title="基本信息" column={1} list={[<Input name="name" label="姓名" rule="REQ"/>,
                <Input name="phone" label="电话" rule="REQ TEL"/>, <TextArea name="description" label="描述" block/>]}/>
            <List title="工作经历" list={[<Input name="name" label="姓名" rule="REQ"/>,
                <Input name="phone" label="电话" rule="REQ TEL"/>, <TextArea name="description" label="描述" block/>]}/>
        </FormModal>
    </>;
};

render(<BaseExample/>);

```

- 步骤表单示例
- 展示FormSteps组件的水平布局和垂直布局两种使用方式，演示多步骤表单的流程控制和步骤管理
- _FormInfo(@kne/current-lib_form-info),antd(antd),(@kne/current-lib_form-info/dist/index.css)

```jsx
const {default: FormInfo, FormSteps, List, Input, TextArea, SubmitButton, CancelButton} = _FormInfo;
const {Flex, Divider} = antd;
const BaseExample = () => {
    return <Flex vertical>
        <FormSteps items={[{
            title: '表单1',
            formProps: {},
            children: <FormInfo title="基本信息" list={[<Input name="name" label="姓名" rule="REQ"/>,
                <Input name="phone" label="电话" rule="REQ TEL"/>, <TextArea name="description" label="描述" block/>,
                <Flex block justify="center" gap={8}>
                    <SubmitButton>提交</SubmitButton>
                    <CancelButton>取消</CancelButton>
                </Flex>]}/>
        }, {
            title: '表单2', formProps: {}, children: <>
                <List title="工作经历" list={[<Input name="name" label="姓名" rule="REQ"/>,
                    <Input name="phone" label="电话" rule="REQ TEL"/>,
                    <TextArea name="description" label="描述" block/>]}/>
                <Flex justify="center" gap={8}>
                    <SubmitButton>提交</SubmitButton>
                    <CancelButton>取消</CancelButton>
                </Flex>
            </>
        }]}/>
        <Divider/>
        <FormSteps orientation="vertical" items={[{
            title: '表单1',
            formProps: {},
            children: <FormInfo title="基本信息" list={[<Input name="name" label="姓名" rule="REQ"/>,
                <Input name="phone" label="电话" rule="REQ TEL"/>, <TextArea name="description" label="描述" block/>,
                <Flex block justify="center" gap={8}>
                    <SubmitButton>提交</SubmitButton>
                    <CancelButton>取消</CancelButton>
                </Flex>]}/>
        }, {
            title: '表单2', formProps: {}, children: <>
                <List title="工作经历" list={[<Input name="name" label="姓名" rule="REQ"/>,
                    <Input name="phone" label="电话" rule="REQ TEL"/>,
                    <TextArea name="description" label="描述" block/>]}/>
                <Flex justify="center" gap={8}>
                    <SubmitButton>提交</SubmitButton>
                    <CancelButton>取消</CancelButton>
                </Flex>
            </>
        }]}/>
    </Flex>
};

render(<BaseExample/>);

```

- 模态框步骤表单示例
- 演示FormStepsModal组件的使用，结合模态框和步骤表单功能，展示在弹窗中实现复杂多步骤表单流程的完整解决方案
- _FormInfo(@kne/current-lib_form-info),antd(antd),(@kne/current-lib_form-info/dist/index.css)

```jsx
const { default: FormInfo, FormStepsModal, List, Input, TextArea, SubmitButton, CancelButton } = _FormInfo;
const { Flex, Button } = antd;
const { useState } = React;

const BaseExample = () => {
  const [open, onOpenChange] = useState(false);
  return (
    <>
      <Button
        onClick={() => {
          onOpenChange(true);
        }}>
        打开StepsForm弹窗
      </Button>
      <FormStepsModal
        modalProps={{ open, title: '多步骤表单', onCancel: () => onOpenChange(false) }}
        items={[
          {
            title: '表单1',
            formProps: {
              data: {
                phone: '10929299202'
              }
            },
            children: <FormInfo title="基本信息" list={[<Input name="name" label="姓名" rule="REQ" />, <Input name="phone" label="电话" rule="REQ TEL" />, <TextArea name="description" label="描述" block />]} />
          },
          {
            title: '表单2',
            formProps: {
              data: {
                phone: '11939388383'
              }
            },
            children: <List title="工作经历" list={[<Input name="name" label="姓名" rule="REQ" />, <Input name="phone" label="电话" rule="REQ TEL" />, <TextArea name="description" label="描述" block />]} />
          }
        ]}
      />
    </>
  );
};

render(<BaseExample />);

```


### API

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
