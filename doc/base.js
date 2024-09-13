const {default: FormInfo, List, TableList, MultiField, Form, Input, TextArea} = _FormInfo;

const BaseExample = () => {
    return <Form>
        <FormInfo title="标题" subtitle="附标题" list={[<Input name="field_1" label="字段1" rule="REQ"/>,
            <Input name="field_2" label="字段2" rule="REQ"/>,
            <Input name="field_3" hidden label="隐藏字段" rule="REQ"/>,
            <MultiField name="field_4" label="字段4" rule="REQ" field={Input} block/>,
            <TextArea name="description" label="描述" block/>]}/>
        <List title="列表" name="list-1" itemTitle={({index}) => `项目${index + 1}`}
              list={[<Input name="field_1" label="字段1" rule="REQ"/>, <Input name="field_2" label="字段2" rule="REQ"/>,
                  <TextArea name="description" label="描述" block/>]}/>
        <List title="复杂列表" name="list-2" itemTitle={({index}) => `项目${index + 1}`} important
              list={[<Input name="field_1" label="字段1" rule="REQ"/>, <Input name="field_2" label="字段2" rule="REQ"/>,
                  <TextArea name="description" label="描述" block/>,
                  <List title="子级列表" itemTitle={({index}) => `子级项目${index + 1}`}
                        list={[<Input name="field_1" label="字段1" rule="REQ"/>,
                            <Input name="field_2" label="字段2" rule="REQ"/>,
                            <TextArea name="description" label="描述" block/>]} block/>]}/>
        <TableList title="表格列表" name="list-3" itemTitle={({index}) => `项目${index + 1}`}
                   list={[<Input name="field_1" label="字段1" rule="REQ"/>,
                       <Input name="field_2" label="字段2" rule="REQ"/>,
                       <Input name="description" label="描述" block/>]}/>
    </Form>;
};

render(<BaseExample/>);
