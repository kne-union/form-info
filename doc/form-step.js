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
