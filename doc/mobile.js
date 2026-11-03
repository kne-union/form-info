const {default: FormInfo, Form, Input, Select, DatePicker, InputNumber, SubmitButton} = _FormInfo;
const {Flex, Card} = antd;

const MobileExample = () => {
    return (<Flex vertical gap={24}>
        <Card title="移动端自动适配（默认）：纵向卡片 + 字段分隔线" size="small">
            <Form onSubmit={data => console.log('提交请假申请', data)}>
                <FormInfo
                    title="请假申请"
                    column={2}
                    list={[
                        <Select name="leaveType" label="请假类型" rule="REQ" options={[
                            {label: '年假', value: 'annual'},
                            {label: '事假', value: 'personal'},
                            {label: '病假', value: 'sick'}
                        ]}/>,
                        <InputNumber name="days" label="请假天数" rule="REQ" min={0.5} step={0.5}/>,
                        <DatePicker name="startDate" label="开始日期" rule="REQ"/>,
                        <Input name="handover" label="工作交接人" placeholder="请输入交接人姓名"/>
                    ]}
                />
                <SubmitButton>提交申请</SubmitButton>
            </Form>
        </Card>

        <Card title="登录场景：mobile={false} 关闭移动端布局，Select 弹层遮罩等字段优化仍生效" size="small">
            <Form mobile={false} onSubmit={data => console.log('登录', data)}>
                <FormInfo
                    column={1}
                    list={[
                        <Input name="account" label="账号" rule="REQ" placeholder="手机号 / 邮箱"/>,
                        <Input.Password name="password" label="密码" rule="REQ" placeholder="请输入密码"/>,
                        <Select name="tenant" label="登录租户" options={[
                            {label: '总部', value: 'hq'},
                            {label: '华东分公司', value: 'east'}
                        ]}/>
                    ]}
                />
                <SubmitButton block>登录</SubmitButton>
            </Form>
        </Card>
    </Flex>);
};

render(<MobileExample/>);
