const {default: FormInfo, List, TableList, Form, Input, TextArea} = _FormInfo;
const {Flex, Switch, Space, Divider} = antd;
const {useState} = React;

const BorderedExample = () => {
    const [bordered, setBordered] = useState(true);

    return <Form data={{
        employeeId: 'EMP20240001',
        name: '张三',
        department: '技术研发部'
    }}>
        <Flex vertical gap={16}>
            <Space>
                <span>边框模式：</span>
                <Switch checked={bordered} onChange={setBordered} />
            </Space>

            <FormInfo
                title="员工基本信息"
                subtitle="bordered 控制卡片是否显示边框"
                bordered={bordered}
                column={2}
                gap={20}
                list={[
                    <Input name="employeeId" label="工号" rule="REQ" disabled />,
                    <Input name="name" label="姓名" rule="REQ" placeholder="请输入员工姓名" />,
                    <Input name="department" label="所属部门" rule="REQ" placeholder="例如：技术研发部" />,
                    <Input name="position" label="职位" rule="REQ" placeholder="例如：高级前端工程师" />
                ]}
            />

            <Divider />

            <List
                title="工作经历（important）"
                name="workExperience"
                bordered={bordered}
                itemTitle={({index, data}) => data?.companyName || `工作经历 ${index + 1}`}
                important
                addText="添加工作经历"
                list={[
                    <Input name="companyName" label="公司名称" rule="REQ" placeholder="例如：阿里巴巴集团" />,
                    <Input name="jobTitle" label="职位名称" rule="REQ" placeholder="例如：高级开发工程师" />,
                    <TextArea name="workDescription" label="工作描述" placeholder="请描述主要工作内容和成就" block />
                ]}
            />

            <List
                title="教育经历（非important）"
                name="educationHistory"
                bordered={bordered}
                itemTitle={({index, data}) => data?.schoolName || `教育经历 ${index + 1}`}
                addText="添加教育经历"
                list={[
                    <Input name="schoolName" label="学校名称" rule="REQ" placeholder="例如：北京大学" />,
                    <Input name="major" label="专业" rule="REQ" placeholder="例如：计算机科学与技术" />,
                    <Input name="degree" label="学历" rule="REQ" placeholder="例如：本科" />
                ]}
            />

            <Divider />

            <TableList
                title="家庭成员信息"
                name="familyMembers"
                bordered={bordered}
                addText="添加家庭成员"
                list={[
                    <Input name="memberName" label="姓名" rule="REQ" placeholder="家庭成员姓名" />,
                    <Input name="relationship" label="关系" rule="REQ" placeholder="例如：配偶、子女" />,
                    <Input name="memberPhone" label="联系电话" rule="TEL" placeholder="联系电话" />
                ]}
            />
        </Flex>
    </Form>;
};

render(<BorderedExample />);
