const { default: FormInfo, EditableList, List, Form, Input, TextArea, SubmitButton } = _FormInfo;
const { Flex, message, Space, Switch, Tag, Alert, Segmented } = antd;
const { useMemo, useState } = React;

const createTasks = count =>
  Array.from({ length: count }, (_, index) => ({
    id: `task-${index + 1}`,
    taskName: `岗位核心任务 ${index + 1}`,
    taskCode: `T${String(index + 1).padStart(3, '0')}`,
    frequency: ['每日', '每周', '每月'][index % 3],
    description: '负责梳理业务需求，输出技术方案并推动落地，保证交付质量与进度',
    evidence: [{ source: 'JD 原文', content: '具备独立完成复杂需求的能力' }]
  }));

const EditableListExample = () => {
  const [large, setLarge] = useState(false);
  const [editing, setEditing] = useState(false);
  const [addPosition, setAddPosition] = useState('bottom');
  const [limitHeight, setLimitHeight] = useState(true);
  const data = useMemo(() => ({ positionName: '高级前端工程师', tasks: createTasks(large ? 200 : 3) }), [large]);

  return (
    <Flex vertical gap={16}>
      <Space>
        <span>200 条数据：</span>
        <Switch checked={large} onChange={setLarge} />
        <span>添加按钮位置：</span>
        <Segmented
          value={addPosition}
          onChange={setAddPosition}
          options={[
            { label: '底部追加 bottom', value: 'bottom' },
            { label: '标题插入首项 top', value: 'top' },
            { label: '两处 both', value: 'both' }
          ]}
        />
        <span>最大高度 600px：</span>
        <Switch checked={limitHeight} onChange={setLimitHeight} />
        {editing ? <Tag color="processing">编辑中</Tag> : null}
      </Space>
      <Alert type="info" showIcon message="父表单只注册 tasks 一个字段，子字段仅在当前编辑行的独立表单中注册；编辑中提交父表单会提示先保存或取消。" />
      <Form
        key={large ? 'large' : 'small'}
        data={data}
        onSubmit={formData => {
          console.log(formData);
          message.success(`提交成功，共 ${formData.tasks.length} 条 Task`);
        }}
      >
        <FormInfo title="岗位信息" list={[<Input name="positionName" label="岗位名称" rule="REQ" />]} />
        <EditableList
          name="tasks"
          title="Task 列表"
          addPosition={addPosition}
          maxHeight={limitHeight ? 600 : false}
          minLength={1}
          maxLength={500}
          column={2}
          itemTitle={({ data }) => data?.taskName}
          createItem={() => ({ id: `task-${Date.now()}`, frequency: '每周' })}
          onEditingChange={setEditing}
          list={[
            <Input name="taskName" label="任务名称" rule="REQ" />,
            <Input name="taskCode" label="任务编号" rule="REQ" />,
            <Input name="frequency" label="执行频率" />,
            <TextArea name="description" label="任务描述" block />,
            <List name="evidence" title="分析依据" itemTitle={({ index }) => `依据 ${index + 1}`} list={[<Input name="source" label="来源" />, <TextArea name="content" label="内容" block />]} />
          ]}
        />
        <Flex justify="flex-end">
          <SubmitButton>提交</SubmitButton>
        </Flex>
      </Form>
    </Flex>
  );
};

render(<EditableListExample />);
