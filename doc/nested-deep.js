const { default: FormInfo, List, Form, Input, TextArea, SubmitButton, ResetButton } = _FormInfo;
const { Flex, message, Alert, Space, Switch } = antd;
const { useState } = React;

/**
 * 第 1～4 级：常规嵌套样式
 * 第 5 级起（子步骤…）：nest-beyond 满宽同宽；仅第 5 级保留左侧色条
 */
const NestedDeepExample = () => {
  const [bordered, setBordered] = useState(true);

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
        description="第 1～4 级（部门→小组→成员→任务）为常规嵌套；从第 5 级「子步骤」起同宽无缩进，仅第 5 级保留左侧色条，字段左右 padding 一致。"
      />
      <Space>
        <span>边框模式：</span>
        <Switch checked={bordered} onChange={setBordered} />
      </Space>
      <Form
        key={bordered ? 'bordered' : 'plain'}
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
                      tasks: [
                        {
                          title: '表单搭建',
                          note: '嵌套列表样式',
                          steps: [
                            {
                              name: '样式验收',
                              checks: [
                                {
                                  label: '满宽色条',
                                  remarks: [{ content: '第 5 层起不再靠缩进表示包含' }]
                                }
                              ]
                            }
                          ]
                        }
                      ]
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
          title="组织架构（第 1 级）"
          name="departments"
          addText="添加部门"
          bordered={bordered}
          minLength={1}
          itemTitle={({ data, index }) => data?.name || `部门 ${index + 1}`}
          list={[
            <Input name="name" label="部门名称" rule="REQ" placeholder="例如：研发中心" />,
            <List
              title="下属小组（第 2 级）"
              name="teams"
              addText="添加小组"
              bordered={bordered}
              minLength={1}
              itemTitle={({ data, index }) => data?.name || `小组 ${index + 1}`}
              list={[
                <Input name="name" label="小组名称" rule="REQ" placeholder="例如：前端组" />,
                <List
                  title="小组成员（第 3 级）"
                  name="members"
                  addText="添加成员"
                  bordered={bordered}
                  minLength={1}
                  itemTitle={({ data, index }) => data?.name || `成员 ${index + 1}`}
                  list={[
                    <Input name="name" label="姓名" rule="REQ" placeholder="姓名" />,
                    <Input name="role" label="角色" placeholder="例如：工程师" />,
                    <FormInfo
                      title="联系资料"
                      column={2}
                      bordered={bordered}
                      list={[
                        <Input name="email" label="邮箱" placeholder="name@example.com" />,
                        <Input name="city" label="城市" placeholder="所在城市" />
                      ]}
                    />,
                    <List
                      title="任务明细（第 4 级）"
                      name="tasks"
                      addText="添加任务"
                      bordered={bordered}
                      list={[
                        <Input name="title" label="任务" rule="REQ" placeholder="任务名称" />,
                        <TextArea name="note" label="备注" block placeholder="补充说明" />,
                        <List
                          title="子步骤（第 5 级·满宽色条）"
                          name="steps"
                          addText="添加步骤"
                          bordered={bordered}
                          itemTitle={({ data, index }) => data?.name || `步骤 ${index + 1}`}
                          list={[
                            <Input name="name" label="步骤名" rule="REQ" placeholder="例如：样式验收" />,
                            <List
                              title="检查项（第 6 级）"
                              name="checks"
                              addText="添加检查项"
                              bordered={bordered}
                              itemTitle={({ data, index }) => data?.label || `检查 ${index + 1}`}
                              list={[
                                <Input name="label" label="检查点" rule="REQ" placeholder="例如：满宽色条" />,
                                <List
                                  title="备注条（第 7 级）"
                                  name="remarks"
                                  addText="添加备注"
                                  bordered={bordered}
                                  list={[
                                    <TextArea name="content" label="说明" block placeholder="更深层级仍保持内容区宽度" />
                                  ]}
                                />
                              ]}
                            />
                          ]}
                        />
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
