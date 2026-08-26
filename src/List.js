import React from 'react';
import { Button, Divider, Empty, Tag } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import FormInfo from './FormInfo';
import InfoPage from '@kne/info-page';
import { SubList } from '@kne/react-form-plus';
import classnames from 'classnames';
import withLocale from './withLocale';
import { useIntl } from '@kne/react-intl';
import '@kne/info-page/dist/index.css';
import style from './style.module.scss';
import { markNestBlock, decorateNestBlocks, NEST_DEPTH_BEYOND } from './nestBlock';

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
    nestDepth: nestDepthProp,
    nestParentTitles: _nestParentTitles,
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

  // 只信 props.nestDepth（由上层 List decorateNestBlocks 写入）；根 List 为 0
  const nestDepth = typeof nestDepthProp === 'number' ? nestDepthProp : 0;
  const showBorder = !!bordered;
  // 第 5 级起：同宽、无缩进
  const isNestBeyond = nestDepth >= NEST_DEPTH_BEYOND;
  // 仅第 5 级保留左侧色条；第 6 级及更深不画左边框
  const showNestRail = nestDepth === NEST_DEPTH_BEYOND;
  // 等级展示：depth 0 = 第 1 级
  const nestLevel = nestDepth + 1;

  const partTitle = isNestBeyond ? (
    <span className={style['nest-beyond-title']}>
      <Tag className={style['nest-parent-tag']}>{formatMessage({ id: 'nestLevel' }, { level: nestLevel })}</Tag>
      <span className={style['nest-beyond-title-text']}>{title}</span>
    </span>
  ) : (
    title
  );

  return (
    <SubList
      {...others}
      listRender={({ id, allowRemove, onRemove, index, groupArgs, title: itemTitle, list: itemList, ...props }) => {
        const hasItemTitle = itemTitle != null && itemTitle !== '';
        const titleNode = hasItemTitle ? itemTitle : <span className={style['list-item-title-placeholder']} aria-hidden="true" />;
        // 子嵌套 List 深度 = 当前 + 1（显式写入 props，不依赖 Context）
        const nestedList = decorateNestBlocks(itemList, nestDepth + 1);

        return (
          <div
            key={id}
            className={classnames(style['list-item'], {
              [style['is-important']]: important
            })}
          >
            <FormInfo
              {...props}
              list={nestedList}
              title={titleNode}
              bordered={false}
              className={classnames(style['list-item-part'], {
                [style['list-item-part-no-title']]: !hasItemTitle,
                [style['list-item-part-in-bordered']]: showBorder,
                [style['list-item-part-plain']]: !showBorder,
                [style['list-item-part-beyond']]: isNestBeyond
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
                overflow: isNestBeyond ? 'visible' : 'hidden',
                padding: 0
              }}
              gap={isNestBeyond ? 0 : 16}
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
            className={classnames(className, itemClassName, style['list-part'], {
              [style['nest-beyond']]: isNestBeyond,
              [style['nest-beyond-rail']]: showNestRail
            })}
            title={partTitle}
            bordered={isNestBeyond ? false : showBorder}
            styles={partStyles}
            style={partStyle}
            data-nest-beyond={isNestBeyond ? 'true' : undefined}
            data-nest-rail={showNestRail ? 'true' : undefined}
            data-nest-depth={String(nestDepth)}
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
