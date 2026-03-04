const {default: FormInfo, FormModal, List, Input, TextArea, SubmitButton} = _FormInfo;
const {useState} = React;
const {Button, Space, message, Divider, Switch} = antd;

const BaseExample = () => {
    const [open, onOpenChange] = useState(false);
    const [autoClose, setAutoClose] = useState(true);
    const [loading, setLoading] = useState(false);

    // 模拟编辑的员工数据
    const [employeeData, setEmployeeData] = useState({
        id: 'EMP20240001',
        name: '李四',
        employeeNo: 'EMP001',
        department: '产品部',
        position: '产品经理',
        phone: '13800138000',
        email: 'lisi@company.com',
        entryDate: '2024-01-15',
        workExperience: [
            {
                companyName: '腾讯科技',
                jobTitle: '产品经理',
                workYears: '2年',
                workDescription: '负责社交产品的规划与设计'
            }
        ]
    });

    // 表单提交处理
    const handleSubmit = async (formData) => {
        setLoading(true);
        console.log('提交的员工数据:', formData);
        
        // 模拟API请求
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        message.success('员工信息更新成功！');
        setLoading(false);
        
        // 如果autoClose为true，会自动关闭，否则需要手动关闭
        if (!autoClose) {
            // 可以在这里执行其他操作后再手动关闭
            setTimeout(() => onOpenChange(false), 500);
        }
    };

    // 自定义底部按钮
    const customFooter = (submitProps) => (
        <Space>
            <Button onClick={() => onOpenChange(false)}>取消</Button>
            <Button 
                type="primary" 
                loading={submitProps.loading}
                onClick={submitProps.onSubmit}
            >
                保存并继续编辑
            </Button>
            <Button 
                type="primary" 
                loading={submitProps.loading}
                onClick={() => {
                    submitProps.onSubmit();
                }}
            >
                保存并关闭
            </Button>
        </Space>
    );

    return <>
        <Space direction="vertical" size="middle">
            <div>
                <Space>
                    <span>自动关闭:</span>
                    <Switch checked={autoClose} onChange={setAutoClose} />
                </Space>
            </div>
            <Button type="primary" onClick={() => onOpenChange(true)}>
                编辑员工信息
            </Button>
        </Space>

        {/* 标准用法 */}
        <FormModal 
            title="编辑员工信息"
            open={open} 
            onCancel={() => onOpenChange(false)}
            formProps={{
                data: employeeData,
                onSubmit: handleSubmit
            }}
            autoClose={autoClose}
            okText="保存"
            cancelText="取消"
            okType="primary"
            width={800}
            okButtonProps={{
                loading: loading
            }}
        >
            <FormInfo 
                title="基本信息" 
                column={2}
                list={[
                    <Input name="employeeNo" label="工号" rule="REQ" disabled />,
                    <Input name="name" label="姓名" rule="REQ" placeholder="请输入员工姓名" />,
                    <Input name="department" label="部门" rule="REQ" placeholder="所属部门" />,
                    <Input name="position" label="职位" rule="REQ" placeholder="职位名称" />,
                    <Input name="phone" label="手机号" rule="REQ TEL" placeholder="11位手机号" />,
                    <Input name="email" label="邮箱" rule="EMAIL" placeholder="企业邮箱" />,
                    <Input name="entryDate" label="入职日期" placeholder="入职日期" />,
                    <TextArea name="remarks" label="备注" placeholder="备注信息" block />
                ]}
            />
            
            <Divider />
            
            <List 
                title="工作经历" 
                name="workExperience"
                itemTitle={({index, data}) => data?.companyName || `工作经历 ${index + 1}`}
                important
                maxLength={5}
                addText="添加工作经历"
                list={[
                    <Input name="companyName" label="公司名称" rule="REQ" placeholder="公司全称" />,
                    <Input name="jobTitle" label="职位" rule="REQ" placeholder="职位名称" />,
                    <Input name="workYears" label="工作年限" placeholder="例如：3年" />,
                    <TextArea name="workDescription" label="工作描述" placeholder="主要工作内容" block />
                ]}
            />
        </FormModal>
    </>;
};

render(<BaseExample/>);
