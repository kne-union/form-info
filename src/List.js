import React from 'react';
import { Button, Divider, Empty } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import FormInfo from './FormInfo';
import InfoPage from '@kne/info-page';
import { SubList } from '@kne/react-form-plus';
import classnames from 'classnames';
import withLocale from './withLocale';
import { useIntl } from '@kne/react-intl';
import style from './style.module.scss';

const List = withLocale(p => {
  const { formatMessage } = useIntl();
  const { className, itemClassName, removeIcon, removeText, addText, addIcon, important, title, ...others } = Object.assign(
    {},
    {
      addText: formatMessage({ id: 'addText' }),
      addIcon: <PlusOutlined />,
      removeText: formatMessage({ id: 'deleteText' }),
      removeIcon: <DeleteOutlined />,
      empty: <Empty description={false} />
    },
    p
  );
  return (
    <SubList
      {...others}
      className={classnames(className, style['list-part'])}
      listRender={({ id, allowRemove, onRemove, index, groupArgs, ...props }) => {
        return (
          <div
            key={id}
            className={classnames(style['list-item'], {
              [style['is-important']]: important
            })}
          >
            <FormInfo
              {...props}
              className={style['list-item-part']}
              gap={16}
              extra={
                allowRemove && (
                  <Button type="link" danger className="btn-no-padding" icon={removeIcon} onClick={onRemove}>
                    {removeText}
                  </Button>
                )
              }
            />
            <Divider />
          </div>
        );
      }}
    >
      {(children, { allowAdd, onAdd }) => {
        return (
          <InfoPage.Part
            className={itemClassName}
            title={title}
            extra={
              <div className={style['extra-container']}>
                {allowAdd && (
                  <Button className={style['extra-btn']} icon={addIcon} onClick={onAdd}>
                    {addText}
                  </Button>
                )}
              </div>
            }
          >
            {children}
          </InfoPage.Part>
        );
      }}
    </SubList>
  );
});

export default List;
