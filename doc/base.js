const {default: FormInfo, List, TableList, MultiField, Form, Input, TextArea, SubmitButton, ResetButton} = _FormInfo;
const {Flex, message, Divider, Switch, Space} = antd;
const {useState} = React;

const BaseExample = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        employeeId: 'EMP20240001',
        name: '张三',
        department: '技术研发部',
        position: '高级前端工程师'
    });

    // 模拟表单提交
    const handleSubmit = async (formData) => {
        setLoading(true);
        console.log('提交的表单数据:', formData);
        
        // 模拟API请求
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        message.success('员工信息提交成功！');
        setLoading(false);
    };

    return <Form data={formData} onSubmit={handleSubmit}>
        <FormInfo 
            title="员工基本信息" 
            subtitle="请填写员工的基本个人信息" 
            column={2}
            gap={20}
            list={[
                <Input name="employeeId" label="工号" rule="REQ" disabled />,
                <Input name="name" label="姓名" rule="REQ" placeholder="请输入员工姓名" />,
                <Input name="department" label="所属部门" rule="REQ" placeholder="例如：技术研发部" />,
                <Input name="position" label="职位" rule="REQ" placeholder="例如：高级前端工程师" />,
                <Input name="phone" label="联系电话" rule="REQ TEL" placeholder="请输入11位手机号" />,
                <Input name="email" label="邮箱" rule="REQ EMAIL" placeholder="请输入企业邮箱" />,
                <Input name="idCard" label="身份证号" rule="REQ ID_CARD" placeholder="请输入18位身份证号" />,
                <TextArea name="skills" label="技能特长" placeholder="请描述员工的专业技能" block />,
                <MultiField 
                    name="certificates" 
                    label="职业证书" 
                    field={Input} 
                    block
                    addText="添加证书"
                    placeholder="例如：PMP项目管理认证"
                />,
                <TextArea name="remarks" label="备注信息" placeholder="其他需要说明的信息" block />
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
                <Input name="companyName" label="公司名称" rule="REQ" placeholder="例如：阿里巴巴集团" />,
                <Input name="jobTitle" label="职位名称" rule="REQ" placeholder="例如：高级开发工程师" />,
                <Input name="workYears" label="工作年限" rule="REQ" placeholder="例如：3年" />,
                <TextArea name="workDescription" label="工作描述" placeholder="请描述主要工作内容和成就" block />,
                <List 
                    title="项目经历" 
                    name="projects"
                    itemTitle={({index, data}) => data?.projectName || `项目 ${index + 1}`}
                    list={[
                        <Input name="projectName" label="项目名称" rule="REQ" placeholder="例如：双十一活动系统" />,
                        <Input name="projectRole" label="担任角色" rule="REQ" placeholder="例如：技术负责人" />,
                        <TextArea name="projectDescription" label="项目描述" placeholder="项目背景、职责和成果" block />
                    ]}
                    block
                />
            ]}
        />
        
        <Divider />
        
        <TableList 
            title="家庭成员信息" 
            name="familyMembers"
            itemTitle={({index}) => `家庭成员 ${index + 1}`}
            maxLength={10}
            addText="添加家庭成员"
            list={[
                <Input name="memberName" label="姓名" rule="REQ" placeholder="家庭成员姓名" />,
                <Input name="relationship" label="关系" rule="REQ" placeholder="例如：配偶、子女" />,
                <Input name="memberPhone" label="联系电话" rule="TEL" placeholder="联系电话" />,
                <Input name="workUnit" label="工作单位" placeholder="工作单位名称" />
            ]}
        />
        
        <Divider />
        
        <FormInfo 
            title="紧急联系人" 
            column={3}
            list={[
                <Input name="emergencyContact" label="姓名" rule="REQ" placeholder="紧急联系人姓名" />,
                <Input name="emergencyRelation" label="关系" rule="REQ" placeholder="与员工关系" />,
                <Input name="emergencyPhone" label="电话" rule="REQ TEL" placeholder="联系电话" />
            ]}
        />
        
        <Flex justify="center" gap={12} style={{marginTop: 24}}>
            <SubmitButton loading={loading}>提交信息</SubmitButton>
            <ResetButton>重置表单</ResetButton>
        </Flex>
    </Form>;
};

render(<BaseExample/>);
