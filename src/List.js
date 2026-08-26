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
import { markNestBlock } from './nestBlock';

const List = withLocale(p => {
  const { formatMessage } = useIntl();
  const {
    className,
    itemClassName,
    removeIcon,
    removeText,
    addText,
    addIcon,
    important,
    title,
    bordered,
    styles: partStyles,
    style: partStyle,
    ...others
  } = Object.assign(
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
  // 以 InfoPage.Part（外层 list-part）的 bordered 区分两种子项样式：
  // - Part bordered：子项无描边、表头全圆角、body 无左右 padding
  // - Part 非 bordered：子项有描边、表头仅上圆角（下边直角）、body 保留左右 padding
  const showBorder = !!bordered;
  return (
    <SubList
      {...others}
      listRender={({ id, allowRemove, onRemove, index, groupArgs, title: itemTitle, ...props }) => {
        // 无 itemTitle：不展示标题文案（不做「列表 1」之类默认值）
        // 子项始终保留 header（即使用户设了 minLength 导致不可删）：占位 title 避免 InfoPage 打上 no-title
        const hasItemTitle = itemTitle != null && itemTitle !== '';
        const titleNode = hasItemTitle ? itemTitle : <span className={style['list-item-title-placeholder']} aria-hidden="true" />;

        return (
          <div
            key={id}
            className={classnames(style['list-item'], {
              [style['is-important']]: important
            })}
          >
            <FormInfo
              {...props}
              title={titleNode}
              // 子项不走 InfoPage.Part 的 bordered（会带 24px padding 把 header 顶开）；
              // 描边/圆角只由外层 Part.bordered → in-bordered / plain 的 CSS 控制
              bordered={false}
              className={classnames(style['list-item-part'], {
                [style['list-item-part-no-title']]: !hasItemTitle,
                [style['list-item-part-in-bordered']]: showBorder,
                [style['list-item-part-plain']]: !showBorder
              })}
              styles={{
                header: {
                  borderBottom: 'none',
                  borderRadius: showBorder ? 'var(--radius-default, 8px)' : 'var(--radius-default, 8px) var(--radius-default, 8px) 0 0'
                },
                body: showBorder
                  ? undefined
                  : {
                      borderRadius: '0 0 var(--radius-default, 8px) var(--radius-default, 8px)'
                    }
              }}
              style={{
                borderRadius: 'var(--radius-default, 8px)',
                overflow: 'hidden',
                padding: 0
              }}
              gap={16}
              extra={
                <Button type="link" danger className="btn-no-padding" icon={removeIcon} disabled={!allowRemove} onClick={onRemove}>
                  {removeText}
                </Button>
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
            styles={partStyles}
            style={partStyle}
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

export default markNestBlock(List);
