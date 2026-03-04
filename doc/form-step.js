const {default: FormInfo, FormSteps, List, Input, TextArea, SubmitButton, CancelButton} = _FormInfo;
const {Flex, Divider, message, Button, Space, Card, Switch, Alert} = antd;
const {useState} = React;

const BaseExample = () => {
    const [loading, setLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [autoStep, setAutoStep] = useState(true);

    // 员工入职办理流程数据
    const onboardingData = {
        // 第一步：个人信息
        employeeName: '王五',
        employeeId: 'EMP20240023',
        idCard: '110101199001011234',
        gender: '男',
        birthday: '1990-01-01',
        phone: '13900139000',
        email: 'wangwu@company.com',
        education: '本科',
        graduateSchool: '北京大学',
        major: '计算机科学与技术',
        
        // 第二步：岗位信息
        department: '技术研发部',
        position: '前端开发工程师',
        level: 'P6',
        entryDate: '2024-03-04',
        probationPeriod: '3个月',
        salary: '面议',
        workLocation: '北京总部',
        
        // 第三步：银行账户
        bankName: '中国工商银行',
        bankAccount: '6222021234567890123',
        bankBranch: '北京朝阳支行',
        
        // 第四步：紧急联系人
        emergencyContacts: [
            {
                name: '王母',
                relationship: '母亲',
                phone: '13800138001'
            }
        ]
    };

    // 步骤变更回调
    const handleStepChange = (current, formData) => {
        console.log(`切换到第 ${current + 1} 步，表单数据:`, formData);
        setCurrentStep(current);
    };

    // 流程完成回调
    const handleComplete = async (formData) => {
        setLoading(true);
        console.log('入职办理完成，最终数据:', formData);
        
        // 模拟API提交
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        message.success('入职办理完成！欢迎加入公司！');
        setLoading(false);
    };

    return (
        <Flex vertical gap={24}>
            {/* 配置面板 */}
            <Card title="配置选项" size="small">
                <Space>
                    <span>自动切换步骤:</span>
                    <Switch checked={autoStep} onChange={setAutoStep} />
                    <Divider type="vertical" />
                    <span>当前步骤: 第 {currentStep + 1} 步</span>
                </Space>
            </Card>

            {/* 水平方向步骤表单 */}
            <Card title="员工入职办理流程（水平布局）">
                <FormSteps 
                    items={[{
                        title: '个人信息',
                        formProps: {
                            data: onboardingData
                        },
                        children: (
                            <>
                                <Alert 
                                    message="请填写员工基本个人信息" 
                                    type="info" 
                                    showIcon 
                                    style={{marginBottom: 16}}
                                />
                                <FormInfo 
                                    title="个人资料" 
                                    column={2}
                                    list={[
                                        <Input name="employeeName" label="姓名" rule="REQ" placeholder="员工姓名" />,
                                        <Input name="employeeId" label="工号" rule="REQ" disabled />,
                                        <Input name="idCard" label="身份证号" rule="REQ ID_CARD" placeholder="18位身份证号" />,
                                        <Input name="gender" label="性别" rule="REQ" placeholder="男/女" />,
                                        <Input name="birthday" label="出生日期" placeholder="例如：1990-01-01" />,
                                        <Input name="phone" label="手机号" rule="REQ TEL" placeholder="11位手机号" />,
                                        <Input name="email" label="邮箱" rule="EMAIL" placeholder="个人邮箱" />,
                                        <Input name="education" label="学历" rule="REQ" placeholder="例如：本科、硕士" />,
                                        <Input name="graduateSchool" label="毕业院校" placeholder="学校名称" />,
                                        <Input name="major" label="专业" placeholder="所学专业" />
                                    ]}
                                />
                                <Flex justify="center" gap={8} style={{marginTop: 16}}>
                                    <CancelButton>取消</CancelButton>
                                    <SubmitButton>下一步</SubmitButton>
                                </Flex>
                            </>
                        )
                    }, {
                        title: '岗位信息',
                        formProps: {
                            data: onboardingData
                        },
                        children: (
                            <>
                                <FormInfo 
                                    title="岗位配置" 
                                    column={2}
                                    list={[
                                        <Input name="department" label="所属部门" rule="REQ" placeholder="例如：技术研发部" />,
                                        <Input name="position" label="职位名称" rule="REQ" placeholder="职位名称" />,
                                        <Input name="level" label="职级" rule="REQ" placeholder="例如：P6、P7" />,
                                        <Input name="entryDate" label="入职日期" rule="REQ" placeholder="入职日期" />,
                                        <Input name="probationPeriod" label="试用期" placeholder="例如：3个月" />,
                                        <Input name="salary" label="薪资" placeholder="薪资信息" />,
                                        <Input name="workLocation" label="工作地点" placeholder="工作城市" />,
                                        <Input name="reportTo" label="汇报对象" placeholder="直属领导" />
                                    ]}
                                />
                                <Flex justify="center" gap={8} style={{marginTop: 16}}>
                                    <CancelButton>取消</CancelButton>
                                    <SubmitButton>下一步</SubmitButton>
                                </Flex>
                            </>
                        )
                    }, {
                        title: '银行账户',
                        formProps: {
                            data: onboardingData
                        },
                        children: (
                            <>
                                <Alert 
                                    message="银行账户信息用于工资发放，请仔细核对" 
                                    type="warning" 
                                    showIcon 
                                    style={{marginBottom: 16}}
                                />
                                <FormInfo 
                                    title="银行信息" 
                                    column={2}
                                    list={[
                                        <Input name="bankName" label="开户银行" rule="REQ" placeholder="例如：中国工商银行" />,
                                        <Input name="bankBranch" label="开户支行" rule="REQ" placeholder="支行名称" />,
                                        <Input name="bankAccount" label="银行账号" rule="REQ" placeholder="银行卡号" />,
                                        <Input name="accountName" label="账户名" rule="REQ" placeholder="持卡人姓名" />
                                    ]}
                                />
                                <Flex justify="center" gap={8} style={{marginTop: 16}}>
                                    <CancelButton>取消</CancelButton>
                                    <SubmitButton>下一步</SubmitButton>
                                </Flex>
                            </>
                        )
                    }, {
                        title: '紧急联系人',
                        formProps: {
                            data: onboardingData
                        },
                        children: (
                            <>
                                <List 
                                    title="紧急联系人列表" 
                                    name="emergencyContacts"
                                    itemTitle={({index, data}) => data?.name || `联系人 ${index + 1}`}
                                    important
                                    maxLength={3}
                                    addText="添加联系人"
                                    list={[
                                        <Input name="name" label="姓名" rule="REQ" placeholder="联系人姓名" />,
                                        <Input name="relationship" label="关系" rule="REQ" placeholder="与员工关系" />,
                                        <Input name="phone" label="联系电话" rule="REQ TEL" placeholder="联系电话" />,
                                        <Input name="address" label="联系地址" placeholder="联系地址" />
                                    ]}
                                />
                                <Flex justify="center" gap={8} style={{marginTop: 16}}>
                                    <CancelButton>取消</CancelButton>
                                    <SubmitButton loading={loading}>完成办理</SubmitButton>
                                </Flex>
                            </>
                        )
                    }]}
                    autoStep={autoStep}
                    onChange={handleStepChange}
                    onComplete={handleComplete}
                    stepsClassName="custom-steps"
                />
            </Card>

            <Divider />

            {/* 垂直方向步骤表单 */}
            <Card title="员工入职办理流程（垂直布局）">
                <FormSteps 
                    orientation="vertical"
                    items={[{
                        title: '个人信息',
                        formProps: {
                            data: onboardingData
                        },
                        children: (
                            <>
                                <FormInfo 
                                    title="个人资料" 
                                    column={2}
                                    list={[
                                        <Input name="employeeName" label="姓名" rule="REQ" />,
                                        <Input name="employeeId" label="工号" rule="REQ" disabled />,
                                        <Input name="idCard" label="身份证号" rule="REQ ID_CARD" />,
                                        <Input name="phone" label="手机号" rule="REQ TEL" />
                                    ]}
                                />
                                <Flex justify="center" gap={8} style={{marginTop: 16}}>
                                    <CancelButton>取消</CancelButton>
                                    <SubmitButton>下一步</SubmitButton>
                                </Flex>
                            </>
                        )
                    }, {
                        title: '岗位信息',
                        formProps: {
                            data: onboardingData
                        },
                        children: (
                            <>
                                <FormInfo 
                                    title="岗位配置" 
                                    column={2}
                                    list={[
                                        <Input name="department" label="部门" rule="REQ" />,
                                        <Input name="position" label="职位" rule="REQ" />,
                                        <Input name="entryDate" label="入职日期" rule="REQ" />
                                    ]}
                                />
                                <Flex justify="center" gap={8} style={{marginTop: 16}}>
                                    <CancelButton>取消</CancelButton>
                                    <SubmitButton>完成</SubmitButton>
                                </Flex>
                            </>
                        )
                    }]}
                    autoStep={true}
                    onComplete={handleComplete}
                />
            </Card>
        </Flex>
    );
};

render(<BaseExample/>);
