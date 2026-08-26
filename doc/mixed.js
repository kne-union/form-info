const {
  default: FormInfo,
  List,
  TableList,
  MultiField,
  Form,
  Steps,
  Input,
  TextArea,
  Select,
  SubmitButton,
  ResetButton
} = _FormInfo;
const {Flex, message} = antd;
const {useState} = React;

/**
 * 混合场景：FormInfo / List / TableList / MultiField / Steps（嵌入父 Form）
 * 验收：TableList 列宽与 sticky、Steps 样式、下一步校验、提交失败跳步、重置回第一步。
 */
const MixedExample = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async data => {
    setLoading(true);
    console.log('混合表单提交:', data);
    await new Promise(resolve => setTimeout(resolve, 600));
    message.success('提交成功');
    setLoading(false);
  };

  return (
    <Form
      data={{
        name: '张三',
        mobile: '13800138000',
        workExperiences: [{company: '示例公司', title: '前端'}],
        educations: [{school: '示例大学', major: '计算机', degree: 'bachelor'}],
        backupContacts: ['']
      }}
      onSubmit={handleSubmit}
    >
      <FormInfo
        title="基本信息"
        subtitle="请先填写基础资料"
        column={2}
        list={[
          <Input name="name" label="姓名" rule="REQ" placeholder="请输入姓名" />,
          <Input name="mobile" label="手机号" rule="REQ TEL" placeholder="请输入手机号" />,
          <Select
            name="gender"
            label="性别"
            rule="REQ"
            placeholder="请选择"
            options={[
              {label: '男', value: 'male'},
              {label: '女', value: 'female'}
            ]}
          />,
          <TextArea name="remark" label="备注" block placeholder="补充说明" />
        ]}
      />

      <List
        title="工作经历"
        name="workExperiences"
        addText="添加工作经历"
        minLength={1}
        itemTitle={({index, data}) => data?.company || `工作经历 ${index + 1}`}
        list={[
          <Input name="company" label="公司" rule="REQ" placeholder="请输入公司名称" />,
          <Input name="title" label="职位" rule="REQ" placeholder="请输入职位" />,
          <Input name="startDate" label="入职时间" placeholder="例如：2020-01" />
        ]}
      />

      <TableList
        title="教育经历"
        name="educations"
        addText="添加教育经历"
        bordered
        list={[
          <Input name="school" label="学校" rule="REQ" placeholder="请输入学校" />,
          <Input name="major" label="专业" placeholder="请输入专业" />,
          <Select
            name="degree"
            label="学历"
            placeholder="请选择"
            options={[
              {label: '本科', value: 'bachelor'},
              {label: '硕士', value: 'master'},
              {label: '博士', value: 'doctor'}
            ]}
          />
        ]}
      />

      <FormInfo
        title="备用联系方式"
        column={1}
        list={[
          <MultiField
            name="backupContacts"
            label="联系方式"
            field={Input}
            block
            minLength={1}
            maxLength={3}
            placeholder="请输入联系方式"
          />
        ]}
      />

      <Steps
        title="入职补充信息"
        bordered
        items={[
          {
            title: '账号信息',
            column: 2,
            list: [
              <Input name="email" label="邮箱" rule="REQ EMAIL" placeholder="请输入邮箱" />,
              <Input name="employeeNo" label="工号" placeholder="选填" />
            ]
          },
          {
            title: '紧急联系人',
            column: 2,
            list: [
              <Input name="emergencyName" label="联系人" rule="REQ" placeholder="请输入姓名" />,
              <Input name="emergencyMobile" label="联系电话" rule="REQ TEL" placeholder="请输入手机号" />,
              <Select
                name="emergencyRelation"
                label="关系"
                placeholder="请选择"
                options={[
                  {label: '父母', value: 'parent'},
                  {label: '配偶', value: 'spouse'},
                  {label: '子女', value: 'child'},
                  {label: '其他', value: 'other'}
                ]}
              />
            ]
          },
          {
            title: '其他说明',
            column: 1,
            list: [
              <TextArea name="onboardNote" label="补充说明" block placeholder="如有特殊需求请填写" />
            ]
          }
        ]}
      />

      <Flex justify="center" gap={12} style={{marginTop: 24}}>
        <SubmitButton loading={loading}>提交</SubmitButton>
        <ResetButton>重置</ResetButton>
      </Flex>
    </Form>
  );
};

render(<MixedExample />);
