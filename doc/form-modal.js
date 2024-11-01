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
