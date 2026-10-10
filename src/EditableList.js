import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Button, Empty } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import ReactForm from '@kne/react-form';
import { hooks, widget, SubmitButton } from '@kne/react-form-antd';
import InfoPage from '@kne/info-page';
import classnames from 'classnames';
import { useIntl } from '@kne/react-intl';
import FormInfo from './FormInfo';
import withLocale from './withLocale';
import { isNestBlockType, markNestBlock } from './nestBlock';
import '@kne/info-page/dist/index.css';
import style from './style.module.scss';

const { useField, useChangeDecorator, useUIDecorator } = hooks;
const { MaxLabelProvider, ScrollToError } = widget;

const NEW_ITEM_KEY = '__editable_list_new_item__';
const ERR_STATE_ERROR = 2;

const getByPath = (data, path) =>
  String(path)
    .split('.')
    .reduce((target, key) => (target == null ? undefined : target[key]), data);

const formatSummaryValue = value => {
  if (value === null || value === undefined || value === '') {
    return null;
  }
  if (Array.isArray(value)) {
    const texts = value.map(formatSummaryValue).filter(text => text !== null);
    return texts.length ? texts.join('、') : null;
  }
  if (typeof value === 'object') {
    return null;
  }
  return String(value);
};

const resolveRowKey = rowKey => {
  if (typeof rowKey === 'function') {
    return rowKey;
  }
  const keyName = typeof rowKey === 'string' && rowKey ? rowKey : 'id';
  return (item, index) => (item && item[keyName] != null ? item[keyName] : index);
};

const DefaultItemContent = ({ data, list }) => {
  const entries = (Array.isArray(list) ? list : [])
    .filter(field => field?.props?.name && field.props.label && !field.props.hidden && field.props.display !== false && !isNestBlockType(field.type))
    .map(field => ({ name: field.props.name, label: field.props.label, text: formatSummaryValue(getByPath(data, field.props.name)) }))
    .filter(entry => entry.text !== null);
  if (!entries.length) {
    return null;
  }
  return (
    <div className={style['editable-list-summary']}>
      {entries.map(entry => (
        <span key={entry.name} className={style['editable-list-summary-item']}>
          <span className={style['editable-list-summary-label']}>{entry.label}</span>
          <span className={style['editable-list-summary-value']}>{entry.text}</span>
        </span>
      ))}
    </div>
  );
};

const EditCard = ({ data, index, title, list, column, saveText, cancelText, onSave, onCancel, scrollIntoViewOnMount }) => {
  const cardRef = useRef(null);
  useEffect(() => {
    if (scrollIntoViewOnMount && cardRef.current && typeof cardRef.current.scrollIntoView === 'function') {
      cardRef.current.scrollIntoView({ block: 'nearest' });
    }
  }, [scrollIntoViewOnMount]);
  return (
    <div ref={cardRef} className={classnames(style['editable-list-item'], style['editable-list-item-editing'])}>
      {typeof index === 'number' || title ? (
        <div className={style['editable-list-edit-header']}>
          {typeof index === 'number' ? <div className={style['editable-list-item-index']}>{index + 1}</div> : null}
          {title ? <div className={style['editable-list-item-title']}>{title}</div> : null}
        </div>
      ) : null}
      {/* 核心 Form 不渲染 DOM，避免在父级 <form> 内再嵌套 <form> */}
      <ReactForm data={data} noFilter onSubmit={onSave}>
        <ScrollToError scrollProps={{ block: 'center' }} />
        <MaxLabelProvider>
          {/* 不传 title：List 内的 FormInfo 标题会被嵌套样式渲染成胶囊标签 */}
          <FormInfo className={style['editable-list-edit-form']} column={column} list={list} />
          <div className={style['editable-list-edit-actions']}>
            <Button onClick={onCancel}>{cancelText}</Button>
            <SubmitButton>{saveText}</SubmitButton>
          </div>
        </MaxLabelProvider>
      </ReactForm>
    </div>
  );
};

const resolveMaxHeight = maxHeight => {
  if (maxHeight === false || maxHeight === null || maxHeight === 0 || maxHeight === 'none') {
    return undefined;
  }
  return typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight;
};

const EditableListBody = ({ value, onChange, extrasRef }) => {
  const {
    list,
    column,
    itemTitle,
    renderItem,
    getKey,
    editingKey,
    newItem,
    insertAtStart,
    startAdd,
    showBottomAdd,
    setEditing,
    minLength,
    maxLength,
    empty,
    addText,
    addIcon,
    editText,
    editIcon,
    removeText,
    removeIcon,
    saveText,
    cancelText,
    maxHeight
  } = extrasRef.current;
  const items = Array.isArray(value) ? value : [];
  const rowsMaxHeight = resolveMaxHeight(maxHeight);
  const isAdding = editingKey === NEW_ITEM_KEY;
  const editingIndex = isAdding || editingKey === null ? -1 : items.findIndex((item, index) => getKey(item, index) === editingKey);
  const isEditing = isAdding || editingIndex > -1;
  const allowAdd = !(typeof maxLength === 'number' && items.length >= maxLength);
  const allowRemove = !isEditing && items.length > minLength;

  const save = (index, data) => {
    if (index < 0) {
      const created = Object.assign({}, newItem, data);
      onChange(insertAtStart ? [created].concat(items) : items.concat([created]));
    } else {
      onChange(items.map((item, i) => (i === index ? Object.assign({}, item, data) : item)));
    }
    setEditing(null);
  };

  const getTitle = (data, index) => (typeof itemTitle === 'function' ? itemTitle({ index, data }) : null);

  const newItemCard = isAdding ? (
    <EditCard
      key="edit-new"
      data={newItem}
      title={getTitle(newItem, insertAtStart ? 0 : items.length)}
      list={list}
      column={column}
      saveText={saveText}
      cancelText={cancelText}
      onSave={data => save(-1, data)}
      onCancel={() => setEditing(null)}
      scrollIntoViewOnMount
    />
  ) : null;

  return (
    <div className={style['editable-list']}>
      <div className={classnames(style['editable-list-rows'], { [style['editable-list-rows-scroll']]: !!rowsMaxHeight })} style={rowsMaxHeight ? { maxHeight: rowsMaxHeight } : undefined}>
        {items.length === 0 && !isAdding ? <div className={style['editable-list-empty']}>{empty}</div> : null}
        {insertAtStart ? newItemCard : null}
        {items.map((item, index) => {
          const key = getKey(item, index);
          if (index === editingIndex) {
            return (
              <EditCard
                key={`edit-${key}`}
                data={item}
                index={index}
                title={getTitle(item, index)}
                list={list}
                column={column}
                saveText={saveText}
                cancelText={cancelText}
                onSave={data => save(index, data)}
                onCancel={() => setEditing(null)}
              />
            );
          }
          const title = getTitle(item, index);
          return (
            <div key={key} className={style['editable-list-item']}>
              <div className={style['editable-list-item-index']}>{index + 1}</div>
              <div className={style['editable-list-item-main']}>
                {title ? <div className={style['editable-list-item-title']}>{title}</div> : null}
                {typeof renderItem === 'function' ? renderItem(item, { index }) : <DefaultItemContent data={item} list={list} />}
              </div>
              <div className={style['editable-list-item-actions']}>
                <Button type="link" className="btn-no-padding" icon={editIcon} disabled={isEditing} onClick={() => setEditing(key)}>
                  {editText}
                </Button>
                <Button type="link" danger className="btn-no-padding" icon={removeIcon} disabled={!allowRemove} onClick={() => onChange(items.filter((_, i) => i !== index))}>
                  {removeText}
                </Button>
              </div>
            </div>
          );
        })}
        {insertAtStart ? null : newItemCard}
      </div>
      {showBottomAdd && allowAdd ? (
        <Button className={style['editable-list-add-btn']} type="dashed" block icon={addIcon} disabled={isEditing} onClick={() => startAdd(false)}>
          {addText}
        </Button>
      ) : null}
    </div>
  );
};

const EditableList = withLocale(p => {
  const { formatMessage } = useIntl();
  const {
    className,
    title,
    bordered,
    styles: partStyles,
    style: partStyle,
    list,
    column,
    itemTitle,
    renderItem,
    createItem,
    rowKey,
    addPosition = 'bottom',
    maxHeight = 600,
    minLength = 0,
    maxLength,
    rule,
    important,
    empty,
    addText,
    addIcon,
    editText,
    editIcon,
    removeText,
    removeIcon,
    saveText,
    cancelText,
    editingErrMsg,
    minLengthErrMsg,
    onEditingChange,
    nestDepth,
    nestParentTitles: _unusedNestParentTitles,
    block: _unusedBlock,
    ...fieldProps
  } = Object.assign(
    {},
    {
      addText: formatMessage({ id: 'addText' }),
      addIcon: <PlusOutlined />,
      editText: formatMessage({ id: 'editText' }),
      editIcon: <EditOutlined />,
      removeText: formatMessage({ id: 'deleteText' }),
      removeIcon: <DeleteOutlined />,
      saveText: formatMessage({ id: 'saveText' }),
      cancelText: formatMessage({ id: 'cancel' }),
      editingErrMsg: formatMessage({ id: 'editableListEditing' }),
      empty: <Empty description={false} />
    },
    p
  );

  const [editing, setEditingState] = useState({ key: null, newItem: null, insertAtStart: false });
  const setEditing = (key, newItem = null, insertAtStart = false) => setEditingState({ key, newItem, insertAtStart });
  const startAdd = insertAtStart => setEditing(NEW_ITEM_KEY, typeof createItem === 'function' ? createItem() : {}, insertAtStart);
  const showTopAdd = addPosition === 'top' || addPosition === 'both';
  const showBottomAdd = addPosition === 'bottom' || addPosition === 'both';

  const ruleStateRef = useRef({});
  const validateRule = useMemo(
    () => async (value, context) => {
      const state = ruleStateRef.current;
      if (state.isEditing) {
        return { result: false, errMsg: state.editingErrMsg };
      }
      const length = Array.isArray(value) ? value.length : 0;
      if (length < state.minLength) {
        return { result: false, errMsg: state.minLengthErrMsg };
      }
      if (typeof state.rule === 'function') {
        return await state.rule(value, context);
      }
      return { result: true, errMsg: '' };
    },
    []
  );

  const fieldState = useField(Object.assign({}, fieldProps, { rule: validateRule }));
  const changeProps = useChangeDecorator(fieldState);
  const render = useUIDecorator(Object.assign({}, changeProps, { important: important !== undefined ? important : minLength > 0 }));

  const getKey = useMemo(() => resolveRowKey(rowKey), [rowKey]);
  const items = Array.isArray(fieldState.value) ? fieldState.value : [];
  const isEditing = editing.key === NEW_ITEM_KEY || (editing.key !== null && items.some((item, index) => getKey(item, index) === editing.key));

  ruleStateRef.current = {
    isEditing,
    minLength,
    rule,
    editingErrMsg,
    minLengthErrMsg: minLengthErrMsg || formatMessage({ id: 'editableListMinLength' }, { count: minLength })
  };

  // 外部整体替换数组（setFormData / 导入）后编辑行可能已不存在
  useEffect(() => {
    if (editing.key !== null && !isEditing) {
      setEditingState({ key: null, newItem: null, insertAtStart: false });
    }
  }, [editing.key, isEditing]);

  const onEditingChangeRef = useRef(onEditingChange);
  onEditingChangeRef.current = onEditingChange;
  const errStateRef = useRef(fieldState.errState);
  errStateRef.current = fieldState.errState;
  const triggerValidateRef = useRef(fieldState.triggerValidate);
  triggerValidateRef.current = fieldState.triggerValidate;
  const editingMountedRef = useRef(false);
  useEffect(() => {
    if (!editingMountedRef.current) {
      editingMountedRef.current = true;
      return;
    }
    onEditingChangeRef.current && onEditingChangeRef.current(isEditing);
    // 退出编辑但值未变（取消）时，清掉提交时留下的「请先保存」错误
    if (!isEditing && errStateRef.current === ERR_STATE_ERROR && typeof triggerValidateRef.current === 'function') {
      triggerValidateRef.current();
    }
  }, [isEditing]);

  const extrasRef = useRef(null);
  extrasRef.current = {
    list,
    column,
    itemTitle,
    renderItem,
    getKey,
    editingKey: isEditing ? editing.key : null,
    newItem: editing.newItem,
    insertAtStart: editing.insertAtStart,
    startAdd,
    showBottomAdd,
    setEditing,
    minLength,
    maxLength,
    empty,
    addText,
    addIcon,
    editText,
    editIcon,
    removeText,
    removeIcon,
    saveText,
    cancelText,
    maxHeight
  };

  const allowAdd = !(typeof maxLength === 'number' && items.length >= maxLength);

  const StableBody = useMemo(
    () =>
      function EditableListStableBody(bodyProps) {
        return <EditableListBody value={bodyProps.value} onChange={bodyProps.onChange} extrasRef={extrasRef} />;
      },
    []
  );

  return (
    <InfoPage.Part
      className={classnames(className, style['list-part'], style['editable-list-part'])}
      title={title}
      bordered={typeof nestDepth === 'number' && nestDepth >= 1 ? false : bordered}
      styles={partStyles}
      style={partStyle}
      extra={
        showTopAdd && allowAdd ? (
          <div className={style['extra-container']}>
            <Button className={style['extra-btn']} icon={addIcon} disabled={isEditing} onClick={() => startAdd(true)}>
              {addText}
            </Button>
          </div>
        ) : null
      }
    >
      {render(StableBody)}
    </InfoPage.Part>
  );
});

export default markNestBlock(EditableList);
