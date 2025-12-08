import React from 'react';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Empty } from 'antd';
import { MultiField as MultiFieldBase } from '@kne/react-form-plus';
import classnames from 'classnames';
import withLocale from './withLocale';
import { useIntl } from '@kne/react-intl';
import style from './style.module.scss';

const MultiField = withLocale(p => {
  const { formatMessage } = useIntl();

  const { className, addText, addIcon, removeIcon, removeText, ...others } = Object.assign(
    {},
    {
      addText: formatMessage({ id: 'addText' }),
      addIcon: <PlusOutlined />,
      removeIcon: <DeleteOutlined />,
      removeText: null,
      empty: <Empty description={false} />
    },
    p
  );
  return (
    <MultiFieldBase
      {...others}
      itemRender={(children, { id, allowRemove, onRemove }) => {
        return (
          <div key={id} className={classnames('multi-field-item', style['multi-field-item'])}>
            {children}
            <div>
              <div className={classnames(style['react-form__field-label'], 'react-form__field-label', 'multi-field-delete-label')} />
              <Button icon={removeIcon} onClick={onRemove} disabled={!allowRemove}>
                {typeof removeText === 'function' ? removeText(others.label) : removeText}
              </Button>
            </div>
          </div>
        );
      }}
    >
      {(children, { allowAdd, onAdd }) => (
        <div className={classnames(className, 'multi-field', style['multi-field'])}>
          {children}
          {allowAdd && (
            <Button className={classnames('multi-field-add-btn', style['multi-field-add-btn'])} type="dashed" onClick={onAdd} icon={addIcon}>
              {typeof addText === 'function' ? addText(others.label) : `${addText}${others.label}`}
            </Button>
          )}
        </div>
      )}
    </MultiFieldBase>
  );
});

export default MultiField;
