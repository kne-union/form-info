const { default: FormInfo, MatrixScale, Form, Input, InputNumber, Rate, CheckboxGroup, SubmitButton, ResetButton } = _FormInfo;
const { Flex, message } = antd;

const timeShareOptions = [
  { label: '几乎没有（0%）', value: 'none' },
  { label: '少量（1%-20%）', value: 'little' },
  { label: '较少（21%-40%）', value: 'less' },
  { label: '约一半（41%-60%）', value: 'half' },
  { label: '较多（61%-80%）', value: 'more' },
  { label: '大部分（81%-100%）', value: 'most' }
];

const activityRows = [
  { label: '工作/学习', name: 'work' },
  { label: '通勤', name: 'commute' },
  { label: '家务/生活事务', name: 'housework' },
  { label: '休闲娱乐', name: 'leisure' },
  { label: '社交沟通', name: 'social' },
  { label: '运动锻炼', name: 'exercise' },
  { label: '睡眠休息', name: 'sleep' }
];

const satisfactionOptions = [
  { label: '非常不满意', value: 1 },
  { label: '不满意', value: 2 },
  { label: '一般', value: 3 },
  { label: '满意', value: 4 },
  { label: '非常满意', value: 5 }
];

const channelOptions = [
  { label: '手机', value: 'mobile' },
  { label: '电脑', value: 'pc' },
  { label: '平板', value: 'pad' },
  { label: '电视', value: 'tv' }
];

const BaseExample = () => {
  return (
    <Form
      data={{ timeShare: { work: 'most', sleep: 'half' } }}
      onSubmit={data => {
        console.log(data);
        message.success('提交成功，数据见控制台');
      }}
    >
      <FormInfo title="基本信息" list={[<Input name="nickname" label="昵称" rule="REQ" />]} />
      <MatrixScale title="一天中各项活动的时间占比" name="timeShare" rowTitle="活动" rule="REQ" rows={activityRows} options={timeShareOptions} />
      <MatrixScale
        title="对以下服务的满意度（选填）"
        name="satisfaction"
        rowTitle="服务"
        bordered
        rows={[
          { label: '物流配送', name: 'delivery' },
          { label: '售后服务', name: 'afterSale' },
          { label: '商品质量', name: 'quality' }
        ]}
        options={satisfactionOptions}
      />
      <MatrixScale
        title="以下场景常用的设备（多选）"
        name="devices"
        rowTitle="场景"
        field={CheckboxGroup}
        rule="REQ"
        rows={[
          { label: '办公', name: 'office' },
          { label: '看视频', name: 'video' },
          { label: '阅读', name: 'reading' }
        ]}
        options={channelOptions}
      />
      <MatrixScale
        title="从各维度为课程打分（评分矩阵）"
        name="courseRate"
        rowTitle="课程"
        field={Rate}
        rule="REQ"
        rows={[
          { label: '前端工程化', name: 'frontend' },
          { label: '数据结构', name: 'algorithm' },
          { label: '产品思维', name: 'product' }
        ]}
        columns={[
          { label: '内容质量', name: 'content' },
          { label: '讲师表达', name: 'teacher' },
          { label: '实用性', name: 'practical' },
          { label: '推荐意愿', name: 'recommend' }
        ]}
      />
      <MatrixScale
        title="整体满意度（每行一个字段）"
        name="overallRate"
        rowTitle="课程"
        field={Rate}
        rows={[
          { label: '前端工程化', name: 'frontend' },
          { label: '数据结构', name: 'algorithm' }
        ]}
      />
      <MatrixScale
        title="近一周每天的时长（小时）"
        name="weekHours"
        rowTitle="项目"
        field={InputNumber}
        rule="REQ"
        min={0}
        max={24}
        placeholder="小时"
        rows={[
          { label: '工作', name: 'work' },
          { label: '运动', name: 'exercise' }
        ]}
        columns={[
          { label: '周一', name: 'mon' },
          { label: '周二', name: 'tue' },
          { label: '周三', name: 'wed' },
          { label: '周四', name: 'thu' },
          { label: '周五', name: 'fri' }
        ]}
      />
      <MatrixScale
        title="家庭成员信息（填空矩阵）"
        name="family"
        rowTitle="成员"
        field={Input}
        placeholder="请输入"
        rows={[
          { label: '父亲', name: 'father' },
          { label: '母亲', name: 'mother' }
        ]}
        columns={[
          { label: '姓名', name: 'name' },
          { label: '职业', name: 'job' },
          { label: '联系电话', name: 'phone' }
        ]}
      />
      <Flex justify="center" gap={8}>
        <ResetButton>重置</ResetButton>
        <SubmitButton>提交</SubmitButton>
      </Flex>
    </Form>
  );
};

render(<BaseExample />);
