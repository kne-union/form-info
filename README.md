
# form-info


### 描述

构建一个更加美观的form表单组件


### 安装

```shell
npm i --save @kne/form-info
```

### 示例(全屏)

#### 示例代码

- Form
- 这里填写示例说明
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
        <Flex justify="center">
            <SubmitButton>提交</SubmitButton>
            <ResetButton>重置</ResetButton>
        </Flex>
    </Form>;
};

render(<BaseExample/>);

```

- FormModal
- 这里填写示例说明
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

- FormSteps
- 这里填写示例说明
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
        <FormSteps direction="vertical" items={[{
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

- FormStepsModal
- 这里填写示例说明
- _FormInfo(@kne/current-lib_form-info),antd(antd),(@kne/current-lib_form-info/dist/index.css)

```jsx
const {default: FormInfo, FormStepsModal, List, Input, TextArea, SubmitButton, CancelButton} = _FormInfo;
const {Flex, Button} = antd;
const {useState} = React;

const BaseExample = () => {
    const [open, onOpenChange] = useState(false);
    return <>
        <Button onClick={() => {
            onOpenChange(true);
        }}>打开StepsForm弹窗</Button>
        <FormStepsModal modalProps={{open, title: '多步骤表单', onCancel: () => onOpenChange(false)}} items={[{
            title: '表单1',
            formProps: {
                data: {
                    phone: '10929299202'
                }
            },
            children: <FormInfo title="基本信息" list={[<Input name="name" label="姓名" rule="REQ"/>,
                <Input name="phone" label="电话" rule="REQ TEL"/>, <TextArea name="description" label="描述" block/>]}/>
        }, {
            title: '表单2',
            formProps: {
                data: {
                    phone: '11939388383'
                }
            },
            children: <List title="工作经历" list={[<Input name="name" label="姓名" rule="REQ"/>,
                <Input name="phone" label="电话" rule="REQ TEL"/>, <TextArea name="description" label="描述" block/>]}/>
        }]}/>
    </>;

    return <Flex vertical>
        <FormSteps/>
    </Flex>
};

render(<BaseExample/>);

```


### API

| 属性名 | 说明 | 类型 | 默认值 |
|-----|----|----|-----|
|     |    |    |     |

