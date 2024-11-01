import React from 'react';
import { Button, Divider, Empty } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import FormInfo from './FormInfo';
import InfoPage from '@kne/info-page';
import { SubList } from '@kne/react-form-plus';
import classnames from 'classnames';
import style from './style.module.scss';
import { useContext } from '@kne/global-context';

const List = p => {
  const { locale: contextLocale } = useContext();
  const locale = Object.assign(
    {},
    {
      添加: '添加',
      删除: '删除'
    },
    contextLocale,
    p.locale
  );
  const { className, itemClassName, removeIcon, removeText, addText, addIcon, important, title, ...others } = Object.assign(
    {},
    {
      addText: locale['添加'],
      addIcon: <PlusOutlined />,
      removeText: locale['删除'],
      removeIcon: <DeleteOutlined />,
      empty: <Empty description={false} />
    },
    p,
    { locale }
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
              allowAdd && (
                <Button className={style['extra-btn']} icon={addIcon} onClick={onAdd}>
                  {addText}
                </Button>
              )
            }
          >
            {children}
          </InfoPage.Part>
        );
      }}
    </SubList>
  );
};

export default List;
