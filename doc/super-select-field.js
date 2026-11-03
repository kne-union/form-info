const { default: FormInfo, Form, SubmitButton, ResetButton } = _FormInfo;
const { default: SelectList, SelectTableList, SelectTree, SelectCascader } = _SuperSelect;
const { SelectFunction, SelectIndustry, SelectAddress } = _SuperSelectPlus;
const { hooks } = _ReactFormHelper;
const { Flex, Switch, message } = antd;
const { useState } = React;

// 把受控选择组件包装成表单 Field：label、校验、报错由 useOnChange 统一渲染
const createField = (Component, defaultProps) => {
  const FieldComponent = props => {
    const render = hooks.useOnChange(Object.assign({ style: { width: '100%' } }, defaultProps, props));
    return render(Component);
  };
  FieldComponent.Field = Component;
  return FieldComponent;
};

const SelectListField = createField(SelectList, { placeholder: '请选择' });
const SelectTableListField = createField(SelectTableList, { placeholder: '请选择' });
const SelectTreeField = createField(SelectTree, { placeholder: '请选择', valueKey: 'id', labelKey: 'name' });
const SelectCascaderField = createField(SelectCascader, { placeholder: '请选择', valueKey: 'id', labelKey: 'name', menuItemWidth: 160 });
const SelectFunctionField = createField(SelectFunction);
const SelectIndustryField = createField(SelectIndustry);
const SelectAddressField = createField(SelectAddress);

const departmentOptions = [
  { value: 'tech', label: '技术研发部' },
  { value: 'product', label: '产品设计部' },
  { value: 'operation', label: '运营管理部' },
  { value: 'hr', label: '人力资源部' },
  { value: 'finance', label: '财务部', disabled: true },
  { value: 'marketing', label: '市场营销部' }
];

const userOptions = [
  { value: 'u1', label: '张三', email: 'zhangsan@company.com' },
  { value: 'u2', label: '李四', email: 'lisi@company.com' },
  { value: 'u3', label: '王五', email: 'wangwu@company.com' },
  { value: 'u4', label: '赵六', email: 'zhaoliu@company.com' },
  { value: 'u5', label: '钱七', email: 'qianqi@company.com' }
];

const projectOptions = [
  { id: 1, name: '电商平台', count: 15, description: '在线购物平台' },
  { id: 2, name: 'OA系统', count: 8, description: '办公自动化系统', disabled: true },
  { id: 3, name: 'CRM系统', count: 10, description: '客户关系管理' },
  { id: 4, name: '数据大屏', count: 5, description: '数据可视化展示' },
  { id: 5, name: '移动APP', count: 12, description: '移动端应用' }
];

const organizationTree = [
  { id: 'root', parentId: null, name: '集团总部' },
  { id: 'tech', parentId: 'root', name: '技术中心' },
  { id: 'tech-fe', parentId: 'tech', name: '前端开发组' },
  { id: 'tech-be', parentId: 'tech', name: '后端开发组' },
  { id: 'product', parentId: 'root', name: '产品中心' },
  { id: 'product-design', parentId: 'product', name: '产品设计组' },
  { id: 'hr', parentId: 'root', name: '人力资源部' }
];

const regionData = [
  {
    id: 'guangdong',
    name: '广东省',
    children: [
      {
        id: 'guangzhou',
        name: '广州市',
        children: [
          { id: 'tianhe', name: '天河区' },
          { id: 'yuexiu', name: '越秀区' }
        ]
      },
      {
        id: 'shenzhen',
        name: '深圳市',
        children: [
          { id: 'nanshan', name: '南山区' },
          { id: 'futian', name: '福田区' }
        ]
      }
    ]
  },
  {
    id: 'zhejiang',
    name: '浙江省',
    children: [
      {
        id: 'hangzhou',
        name: '杭州市',
        children: [
          { id: 'xihu', name: '西湖区' },
          { id: 'binjiang', name: '滨江区' }
        ]
      }
    ]
  }
];

// 编辑场景：后端只返回编码，组件加载数据后自动解析 label
const initialData = {
  department: [{ value: 'tech', label: '技术研发部' }],
  city: [{ value: '010' }, { value: '020' }],
  industry: ['001']
};

const BaseExample = () => {
  const [isPopup, setIsPopup] = useState(true);

  return (
    <Flex vertical gap={16}>
      <Flex align="center" gap={12}>
        <span>展示模式：</span>
        <Switch checked={isPopup} onChange={setIsPopup} checkedChildren="下拉" unCheckedChildren="弹窗" />
      </Flex>
      <Form
        data={initialData}
        onSubmit={async data => {
          console.log('提交的表单数据:', data);
          message.success('提交成功');
        }}
      >
        <FormInfo
          title="SuperSelect 字段"
          subtitle="@kne/super-select 组件封装成 Field"
          column={2}
          list={[
            <SelectListField name="department" label="所属部门" rule="REQ" isPopup={isPopup} options={departmentOptions} />,
            <SelectListField name="owner" label="负责人" rule="REQ" single isPopup={isPopup} options={userOptions} />,
            <SelectListField
              name="members"
              label="项目成员"
              isPopup={isPopup}
              allowSelectedAll
              maxLength={3}
              options={userOptions}
              placeholder="最多选择 3 人"
              getSearchCallback={({ searchText }, item) => !searchText || item.label.includes(searchText) || item.email.includes(searchText)}
            />,
            <SelectTableListField
              name="project"
              label="关联项目"
              isPopup={isPopup}
              valueKey="id"
              labelKey="name"
              options={projectOptions}
              columns={[
                { name: 'name', title: '项目名称', span: 8 },
                { name: 'count', title: '团队人数', span: 8 },
                { name: 'description', title: '项目描述', span: 8 }
              ]}
              getSearchCallback={({ searchText }, item) => !searchText || item.name.includes(searchText)}
            />,
            <SelectTreeField name="organization" label="组织架构" isPopup={isPopup} options={organizationTree} />,
            <SelectCascaderField name="region" label="工作地区" rule="REQ" isPopup={isPopup} options={regionData} onlyAllowLastLevel />
          ]}
        />
        <FormInfo
          title="SuperSelectPlus 字段"
          subtitle="@kne/super-select-plus 业务选择器封装成 Field"
          column={2}
          list={[
            <SelectAddressField name="city" label="期望城市" rule="REQ" isPopup={isPopup} maxLength={5} />,
            <SelectAddressField name="currentCity" label="现居城市" single isPopup={isPopup} />,
            <SelectFunctionField name="function" label="期望职能" rule="REQ" isPopup={isPopup} maxLength={3} />,
            <SelectIndustryField name="industry" label="期望行业" isPopup={isPopup} />
          ]}
        />
        <Flex justify="center" gap={12} style={{ marginTop: 24 }}>
          <SubmitButton>提交</SubmitButton>
          <ResetButton>重置</ResetButton>
        </Flex>
      </Form>
    </Flex>
  );
};

render(<BaseExample />);
