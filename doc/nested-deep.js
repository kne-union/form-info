const { default: FormInfo, List, Form, Input, TextArea, SubmitButton, ResetButton } = _FormInfo;
const { Flex, message, Alert } = antd;

/**
 * 超多层 List 嵌套：部门 → 小组 → 成员 → 任务明细
 * 用于验收深层嵌套时的缩进、色条、表头圆角与紧凑间距。
 */
const NestedDeepExample = () => {
  const handleSubmit = data => {
    console.log('深层嵌套提交:', data);
    message.success('提交成功');
  };

  return (
    <Flex vertical gap={16}>
      <Alert
        type="info"
        showIcon
        message="超多层列表嵌套"
        description="部门 → 小组 → 成员 → 任务共 4 层。嵌套的 List / FormInfo 会自动占满整行纵向堆叠，并用左侧色条区分层级，避免与字段并排挤扁。"
      />
      <Form
        data={{
          departments: [
            {
              name: '研发中心',
              teams: [
                {
                  name: '前端组',
                      members: [
                    {
                      name: '张三',
                      role: '工程师',
                      email: 'zhangsan@example.com',
                      city: '上海',
                      tasks: [{ title: '表单搭建', note: '嵌套列表样式' }]
                    }
                  ]
                }
              ]
            }
          ]
        }}
        onSubmit={handleSubmit}
      >
        <List
          title="组织架构"
          name="departments"
          addText="添加部门"
          minLength={1}
          itemTitle={({ data, index }) => data?.name || `部门 ${index + 1}`}
          list={[
            <Input name="name" label="部门名称" rule="REQ" placeholder="例如：研发中心" />,
            <List
              title="下属小组"
              name="teams"
              addText="添加小组"
              minLength={1}
              itemTitle={({ data, index }) => data?.name || `小组 ${index + 1}`}
              list={[
                <Input name="name" label="小组名称" rule="REQ" placeholder="例如：前端组" />,
                <List
                  title="小组成员"
                  name="members"
                  addText="添加成员"
                  minLength={1}
                  itemTitle={({ data, index }) => data?.name || `成员 ${index + 1}`}
                  list={[
                    <Input name="name" label="姓名" rule="REQ" placeholder="姓名" />,
                    <Input name="role" label="角色" placeholder="例如：工程师" />,
                    <FormInfo
                      title="联系资料"
                      column={2}
                      list={[
                        <Input name="email" label="邮箱" placeholder="name@example.com" />,
                        <Input name="city" label="城市" placeholder="所在城市" />
                      ]}
                    />,
                    <List
                      title="任务明细"
                      name="tasks"
                      addText="添加任务"
                      list={[
                        <Input name="title" label="任务" rule="REQ" placeholder="任务名称" />,
                        <TextArea name="note" label="备注" block placeholder="补充说明" />
                      ]}
                    />
                  ]}
                />
              ]}
            />
          ]}
        />
        <Flex justify="center" gap={16}>
          <SubmitButton>提交</SubmitButton>
          <ResetButton>重置</ResetButton>
        </Flex>
      </Form>
    </Flex>
  );
};

render(<NestedDeepExample />);
