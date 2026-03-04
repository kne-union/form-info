
# form-info


### 描述

构建一个更加美观的form表单组件


### 安装

```shell
npm i --save @kne/form-info
```


### 概述

这是一个基于 React 和 Ant Design 的高颜值表单组件库，专为现代化 Web 应用设计。该组件库通过优雅的视觉设计和丰富的交互功能，为开发者提供了一套完整的表单解决方案。

## 核心特点

**美观优雅的界面设计** - 采用现代化的视觉风格，配合精心设计的间距、色彩和排版，让表单界面更加专业美观。

**多样化的表单组件** - 提供 FormInfo、FormModal、FormSteps、FormStepsModal、List、TableList、MultiField 等丰富的表单组件，满足各种复杂的业务场景需求。

**灵活的布局系统** - 支持响应式网格布局和 Flexbox 布局，可以轻松实现单列、多列以及自定义复杂布局。

**强大的列表功能** - 内置 List、TableList 等列表组件，支持动态添加/删除、嵌套列表等高级功能。

**多步骤表单支持** - 提供 FormSteps 和 FormStepsModal 组件，轻松实现向导式表单流程，提升用户体验。

**国际化支持** - 内置中英文语言包，支持自定义国际化文本，便于多语言应用开发。

**完整的事件系统** - 提供丰富的回调函数和事件钩子，支持表单验证、数据处理、状态管理等完整生命周期控制。

**高度可定制** - 组件设计充分考虑扩展性，支持自定义样式、图标、按钮文本等，满足个性化需求。

该组件库特别适合企业级应用、管理系统、数据录入平台等需要大量表单交互的场景，能够显著提升开发效率和用户体验。

### 示例(全屏)

#### 示例代码

- 基础表单示例
- 展示FormInfo、List、TableList、MultiField等基础组件的组合使用，包含普通字段、隐藏字段、多字段、列表、表格列表等多种表单元素的完整示例
- _FormInfo(@kne/current-lib_form-info),antd(antd),(@kne/current-lib_form-info/dist/index.css)

```jsx
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

```

- 模态框表单示例
- 演示FormModal组件的使用，展示如何在弹窗中展示表单，支持表单数据初始化和提交后的自动关闭功能
- _FormInfo(@kne/current-lib_form-info),antd(antd),(@kne/current-lib_form-info/dist/index.css)

```jsx
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

```

- 步骤表单示例
- 展示FormSteps组件的水平布局和垂直布局两种使用方式，演示多步骤表单的流程控制和步骤管理
- _FormInfo(@kne/current-lib_form-info),antd(antd),(@kne/current-lib_form-info/dist/index.css)

```jsx
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

```

- 模态框步骤表单示例
- 演示FormStepsModal组件的使用，结合模态框和步骤表单功能，展示在弹窗中实现复杂多步骤表单流程的完整解决方案
- _FormInfo(@kne/current-lib_form-info),antd(antd),(@kne/current-lib_form-info/dist/index.css)

```jsx
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

```


### API

### FormInfo

基础的表单信息展示组件，用于创建结构化的表单布局。

| 属性名 | 说明 | 类型 | 默认值 |
|-----|----|----|-----|
| column | 列数，支持数字或Flexbox配置 | number \| object | 2 |
| list | 表单项列表 | ReactNode[] | [] |
| gap | 字段间距 | number | 24 |
| className | 自定义样式类名 | string | - |
| title | 标题 | string \| ReactNode | - |
| subtitle | 副标题 | string \| ReactNode | - |

### FormModal

模态框表单组件，在弹窗中展示表单内容。

| 属性名 | 说明 | 类型 | 默认值 |
|-----|----|----|-----|
| open | 是否显示模态框 | boolean | false |
| onCancel | 关闭回调 | function | - |
| formProps | 表单属性 | object | {} |
| autoClose | 提交后自动关闭 | boolean | true |
| okType | 确认按钮类型 | string | primary |
| okText | 确认按钮文本 | string \| ReactNode | 提交 |
| cancelText | 取消按钮文本 | string \| ReactNode | 取消 |
| okButtonProps | 确认按钮属性 | object | - |
| cancelButtonProps | 取消按钮属性 | object | - |
| footer | 底部内容 | ReactNode \| function | - |
| renderModal | 自定义模态框渲染 | function | - |
| modalRender | 自定义内容渲染 | function | - |

### FormSteps

步骤表单组件，支持多步骤表单流程。

| 属性名 | 说明 | 类型 | 默认值 |
|-----|----|----|-----|
| items | 步骤配置项 | array | [] |
| current | 当前步骤 | number | - |
| defaultCurrent | 默认当前步骤 | number | 0 |
| autoStep | 自动切换下一步 | boolean | true |
| direction | 步骤条方向 | string | horizontal |
| orientation | 步骤条方向 | string | horizontal |
| onChange | 步骤切换回调 | function | - |
| onComplete | 完成回调 | function | - |
| stepsClassName | 步骤条样式类名 | string | - |

每个步骤项配置：

| 属性名 | 说明 | 类型 | 默认值 |
|-----|----|----|-----|
| title | 步骤标题 | string \| ReactNode | - |
| formProps | 表单属性 | object | - |
| children | 步骤内容 | ReactNode \| function | - |

### FormStepsModal

模态框步骤表单组件，结合了模态框和步骤表单功能。

| 属性名 | 说明 | 类型 | 默认值 |
|-----|----|----|-----|
| items | 步骤配置项 | array | [] |
| modalProps | 模态框属性 | object | {autoClose: true} |
| completeText | 完成按钮文本 | string \| ReactNode | 完成 |
| nextText | 下一步按钮文本 | string \| ReactNode | 下一步 |
| autoStep | 自动切换下一步 | boolean | true |
| onComplete | 完成回调 | function | - |
| className | 样式类名 | string | - |

### List

列表表单组件，支持动态添加/删除列表项。

| 属性名 | 说明 | 类型 | 默认值 |
|-----|----|----|-----|
| name | 字段名 | string | - |
| title | 列表标题 | string \| ReactNode | - |
| list | 表单项列表 | ReactNode[] | - |
| important | 是否重要样式 | boolean | false |
| addText | 添加按钮文本 | string \| ReactNode | 添加 |
| removeText | 删除按钮文本 | string \| ReactNode | 删除 |
| addIcon | 添加按钮图标 | ReactNode | PlusOutlined |
| removeIcon | 删除按钮图标 | ReactNode | DeleteOutlined |
| empty | 空状态内容 | ReactNode | Empty |
| itemClassName | 列表项样式类名 | string | - |
| className | 样式类名 | string | - |

### TableList

表格列表表单组件，以表格形式展示列表数据。

| 属性名 | 说明 | 类型 | 默认值 |
|-----|----|----|-----|
| name | 字段名 | string | - |
| title | 表格标题 | string \| ReactNode | - |
| list | 表单项列表 | ReactNode[] | - |
| addText | 添加按钮文本 | string \| ReactNode | 添加 |
| removeText | 删除按钮文本 | string \| ReactNode | 删除 |
| addIcon | 添加按钮图标 | ReactNode | PlusOutlined |
| removeIcon | 删除按钮图标 | ReactNode | DeleteOutlined |
| empty | 空状态内容 | ReactNode | Empty |
| className | 样式类名 | string | - |

### MultiField

多字段组件，支持动态添加/删除同类型字段。

| 属性名 | 说明 | 类型 | 默认值 |
|-----|----|----|-----|
| name | 字段名 | string | - |
| label | 字段标签 | string | - |
| field | 字段组件 | React.ComponentType | - |
| block | 是否块级显示 | boolean | false |
| addText | 添加按钮文本 | string \| function | 添加 |
| removeText | 删除按钮文本 | string \| function | - |
| addIcon | 添加按钮图标 | ReactNode | PlusOutlined |
| removeIcon | 删除按钮图标 | ReactNode | DeleteOutlined |
| empty | 空状态内容 | ReactNode | Empty |
| className | 样式类名 | string | - |

### Form

基础表单容器组件。

| 属性名 | 说明 | 类型 | 默认值 |
|-----|----|----|-----|
| type | 表单类型 | string | inner |
| className | 自定义样式类名 | string | - |
| children | 子组件 | ReactNode | - |

### 国际化配置

组件内置以下国际化文本：

| 键名 | 中文 | 英文 |
|-----|----|----|
| submit | 提交 | Submit |
| cancel | 取消 | Cancel |
| complete | 完成 | Complete |
| next | 下一步 | Next |
| addText | 添加 | Add |
| deleteText | 删除 | Delete |

可通过 withLocale HOC 或 useIntl hook 自定义国际化文本。
