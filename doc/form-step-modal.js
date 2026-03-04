const { default: FormInfo, FormStepsModal, List, Input, TextArea, Select, DatePicker } = _FormInfo;
const { Flex, Button, Space, message, Divider, Result } = antd;
const { useState } = React;

const BaseExample = () => {
  const [open, onOpenChange] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // 模拟项目申请的初始数据
  const projectData = {
    // 第一步：项目基本信息
    projectName: '智能客服系统',
    projectType: 'internal',
    department: '技术研发中心',
    priority: 'high',
    startDate: '2024-03-01',
    endDate: '2024-08-31',
    budget: '500000',

    // 第二步：项目团队
    teamMembers: [
      {
        name: '张三',
        role: '技术负责人',
        email: 'zhangsan@company.com',
        phone: '13800138000'
      }
    ],

    // 第三步：项目详情
    background: '现有客服系统效率低下，需要引入AI技术提升服务质量',
    objectives: `1. 响应时间缩短50%\n2. 客户满意度提升30%\n3. 人力成本降低40%`,
    deliverables: '智能客服系统一套，包含前端界面、后台管理、AI对话引擎'
  };

  // 步骤完成回调
  const handleComplete = async (formData) => {
    setLoading(true);
    console.log('提交的项目申请数据:', formData);
    
    // 模拟API提交
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    message.success('项目申请提交成功！');
    setLoading(false);
    onOpenChange(false);
    
    // 可以在这里执行提交后的操作，如跳转到列表页
  };

  // 步骤变更回调
  const handleStepChange = (current, data) => {
    console.log(`切换到第 ${current + 1} 步，当前数据:`, data);
    setCurrentStep(current);
  };

  return (
    <Space direction="vertical" size="middle">
      <Button 
        type="primary" 
        size="large"
        onClick={() => {
          setCurrentStep(0);
          onOpenChange(true);
        }}
      >
        新建项目申请
      </Button>

      <FormStepsModal
        modalProps={{ 
          open, 
          title: '项目立项申请',
          onCancel: () => onOpenChange(false),
          width: 900,
          destroyOnClose: false
        }}
        items={[
          {
            title: '基本信息',
            formProps: {
              data: projectData
            },
            children: (
              <>
                <FormInfo 
                  title="项目基本信息" 
                  column={2}
                  list={[
                    <Input name="projectName" label="项目名称" rule="REQ" placeholder="请输入项目名称" />,
                    <Input name="projectType" label="项目类型" rule="REQ" placeholder="例如：内部项目、外部项目" />,
                    <Input name="department" label="所属部门" rule="REQ" placeholder="负责部门" />,
                    <Input name="priority" label="优先级" rule="REQ" placeholder="高、中、低" />,
                    <Input name="startDate" label="开始日期" rule="REQ" placeholder="计划开始时间" />,
                    <Input name="endDate" label="结束日期" rule="REQ" placeholder="计划结束时间" />,
                    <Input name="budget" label="预算金额" rule="REQ" placeholder="项目预算（元）" />,
                    <Input name="projectManager" label="项目经理" rule="REQ" placeholder="项目负责人" />
                  ]}
                />
                <Divider />
                <FormInfo 
                  title="项目背景" 
                  column={1}
                  list={[
                    <TextArea 
                      name="background" 
                      label="项目背景" 
                      rule="REQ" 
                      placeholder="请描述项目背景和必要性"
                      block
                      rows={4}
                    />
                  ]}
                />
              </>
            )
          },
          {
            title: '团队配置',
            formProps: {
              data: projectData
            },
            children: (
              <>
                <FormInfo 
                  title="核心成员" 
                  column={2}
                  list={[
                    <Input name="sponsor" label="项目发起人" rule="REQ" placeholder="发起人姓名" />,
                    <Input name="sponsorDept" label="发起人部门" rule="REQ" placeholder="所属部门" />
                  ]}
                />
                <Divider />
                <List 
                  title="项目团队成员" 
                  name="teamMembers"
                  itemTitle={({index, data}) => data?.name || `成员 ${index + 1}`}
                  important
                  maxLength={10}
                  addText="添加团队成员"
                  list={[
                    <Input name="name" label="姓名" rule="REQ" placeholder="成员姓名" />,
                    <Input name="role" label="角色" rule="REQ" placeholder="例如：开发、测试、产品" />,
                    <Input name="email" label="邮箱" rule="EMAIL" placeholder="企业邮箱" />,
                    <Input name="phone" label="手机号" rule="TEL" placeholder="联系电话" />,
                    <Input name="joinDate" label="参与时间" placeholder="加入项目时间" />,
                    <Input name="workload" label="投入比例" placeholder="例如：50%" />
                  ]}
                />
              </>
            )
          },
          {
            title: '项目详情',
            formProps: {
              data: projectData
            },
            children: (
              <>
                <FormInfo 
                  title="项目目标与交付物" 
                  column={1}
                  list={[
                    <TextArea 
                      name="objectives" 
                      label="项目目标" 
                      rule="REQ" 
                      placeholder="请列出项目的主要目标（每行一个）"
                      block
                      rows={4}
                    />,
                    <TextArea 
                      name="deliverables" 
                      label="交付物清单" 
                      rule="REQ" 
                      placeholder="项目需要交付的成果物"
                      block
                      rows={3}
                    />,
                    <TextArea 
                      name="risks" 
                      label="风险与应对" 
                      placeholder="可能存在的风险及应对措施"
                      block
                      rows={3}
                    />
                  ]}
                />
                <Divider />
                <List 
                  title="里程碑计划" 
                  name="milestones"
                  itemTitle={({index, data}) => data?.milestoneName || `里程碑 ${index + 1}`}
                  addText="添加里程碑"
                  list={[
                    <Input name="milestoneName" label="里程碑名称" rule="REQ" placeholder="例如：需求确认" />,
                    <Input name="plannedDate" label="计划日期" rule="REQ" placeholder="预计完成日期" />,
                    <Input name="deliverable" label="交付物" placeholder="该阶段的交付物" />,
                    <TextArea name="milestoneDesc" label="说明" placeholder="里程碑说明" block />
                  ]}
                />
              </>
            )
          }
        ]}
        autoStep={true}
        completeText="提交申请"
        nextText="下一步"
        onComplete={handleComplete}
        onChange={handleStepChange}
      />
    </Space>
  );
};

render(<BaseExample />);
