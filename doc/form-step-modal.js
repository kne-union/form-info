const { default: FormInfo, FormStepsModal, List, Input, TextArea, SubmitButton, CancelButton } = _FormInfo;
const { Flex, Button } = antd;
const { useState } = React;

const BaseExample = () => {
  const [open, onOpenChange] = useState(false);
  return (
    <>
      <Button
        onClick={() => {
          onOpenChange(true);
        }}>
        打开StepsForm弹窗
      </Button>
      <FormStepsModal
        modalProps={{ open, title: '多步骤表单', onCancel: () => onOpenChange(false) }}
        items={[
          {
            title: '表单1',
            formProps: {
              data: {
                phone: '10929299202'
              }
            },
            children: <FormInfo title="基本信息" list={[<Input name="name" label="姓名" rule="REQ" />, <Input name="phone" label="电话" rule="REQ TEL" />, <TextArea name="description" label="描述" block />]} />
          },
          {
            title: '表单2',
            formProps: {
              data: {
                phone: '11939388383'
              }
            },
            children: <List title="工作经历" list={[<Input name="name" label="姓名" rule="REQ" />, <Input name="phone" label="电话" rule="REQ TEL" />, <TextArea name="description" label="描述" block />]} />
          }
        ]}
      />
    </>
  );
};

render(<BaseExample />);
