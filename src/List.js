import React from 'react';
import { Button, Divider, Empty } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import FormInfo from './FormInfo';
import InfoPage from '@kne/info-page';
import { SubList } from '@kne/react-form-plus';
import classnames from 'classnames';
import withLocale from './withLocale';
import { useIntl } from '@kne/react-intl';
import '@kne/info-page/dist/index.css';
import style from './style.module.scss';

const List = withLocale(p => {
  const { formatMessage } = useIntl();
  const { className, itemClassName, removeIcon, removeText, addText, addIcon, important, title, bordered, ...others } = Object.assign(
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
  // bordered 只控制外层 Part；子项卡片边框由 CSS 固定，移动端用 container query 收起（勿用 isMobile 开关以免闪断）
  const showBorder = !!bordered;
  return (
    <SubList
      {...others}
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
              bordered={showBorder}
              className={style['list-item-part']}
              styles={{
                header: {
                  borderBottom: 'none',
                  // 四角统一圆角（antd 默认只有上方圆角）
                  borderRadius: 'var(--radius-default, 8px)'
                },
                body: {
                  borderRadius: '0 0 var(--radius-default, 8px) var(--radius-default, 8px)'
                }
              }}
              style={{
                borderRadius: 'var(--radius-default, 8px)',
                overflow: 'hidden'
              }}
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
            className={classnames(className, itemClassName, style['list-part'])}
            title={title}
            bordered={showBorder}
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
