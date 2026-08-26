import React, { useMemo, useRef, useState, useLayoutEffect } from 'react';
import InfoPage from '@kne/info-page';
import { Empty, Row, Col, Button } from 'antd';
import { TableList as TableListBase, FieldList, SubList } from '@kne/react-form-plus';
import TableView, { isRenderMobileActive, resolveRenderMobile } from '@kne/table-view';
import { useIsMobile } from '@kne/responsive-utils';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useIntl } from '@kne/react-intl';
import withLocale from './withLocale';
import classnames from 'classnames';
import '@kne/info-page/dist/index.css';
import '@kne/table-view/dist/index.css';
import style from './style.module.scss';
import { markNestBlock } from './nestBlock';

/** 亚像素/边框舍入不算溢出，避免无意义浮动 */
const isHorizontallyOverflowing = el => el && el.scrollWidth - el.clientWidth > 8;

const buildColumns = (list, { removeText }) => {
  const fieldList = Array.isArray(list) ? list : [];
  return [
    ...fieldList
      .filter(item => item?.props?.display !== false && !item?.props?.hidden)
      .map(item => ({
        name: item.props.name,
        title: item.props.label,
        render: value => value
      })),
    {
      name: '__options__',
      type: 'options',
      title: removeText || '',
      width: 100,
      render: value => value
    }
  ];
};

const TableList = withLocale(p => {
  const { formatMessage } = useIntl();
  const {
    className,
    addIcon,
    addText,
    removeIcon,
    removeText,
    title,
    bordered,
    renderMobile = true,
    list,
    styles: partStyles,
    style: partStyle,
    ...others
  } = Object.assign(
    {},
    {
      empty: <Empty description={false} className={style['table-list-empty']} />,
      addIcon: <PlusOutlined />,
      addText: formatMessage({ id: 'addText' }),
      removeIcon: <DeleteOutlined />,
      removeText: formatMessage({ id: 'deleteText' })
    },
    p
  );

  const isMobile = useIsMobile();
  const useMobileRender = isRenderMobileActive(renderMobile, isMobile);
  const resolvedRenderMobile = useMemo(() => resolveRenderMobile(renderMobile), [renderMobile]);
  const columns = useMemo(() => buildColumns(list, { removeText }), [list, removeText]);
  const fieldCount = useMemo(() => (Array.isArray(list) ? list : []).filter(item => item?.props?.display !== false && !item?.props?.hidden).length, [list]);
  const innerRef = useRef(null);
  const [isOverflow, setIsOverflow] = useState(false);

  useLayoutEffect(() => {
    if (useMobileRender) {
      setIsOverflow(false);
      return;
    }
    const el = innerRef.current;
    if (!el) {
      return;
    }
    const update = () => setIsOverflow(isHorizontallyOverflowing(el));
    update();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(update) : null;
    ro?.observe(el);
    const mo = typeof MutationObserver !== 'undefined' ? new MutationObserver(update) : null;
    mo?.observe(el, { childList: true, subtree: true, characterData: true });
    window.addEventListener('resize', update);
    return () => {
      ro?.disconnect();
      mo?.disconnect();
      window.removeEventListener('resize', update);
    };
  }, [useMobileRender, list, columns]);

  const renderPart = (children, { onAdd, allowAdd }, extraClassName) => (
    <InfoPage.Part
      title={title}
      className={classnames(className, style['table-list'], extraClassName)}
      bordered={bordered}
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

  const renderDesktop = () => (
    <TableListBase
      {...others}
      list={list}
      headerRender={children => {
        return (
          <Row className={style['table-list-header']} wrap={false}>
            {children}
            <Col className={classnames(style['table-options'], style['table-options-header'])} />
          </Row>
        );
      }}
      headerItemRender={(children, { id, isReq }) => {
        return (
          <Col
            className={classnames({
              [style['is-req']]: isReq
            })}
            key={id}
          >
            {children}
          </Col>
        );
      }}
      itemRender={children => {
        return <Col className={style['table-list-field']}>{children}</Col>;
      }}
      listRender={(children, { id, onRemove, allowRemove }) => {
        return (
          <Row key={id} wrap={false} align="top">
            {children}
            <Col className={style['table-options']}>
              <Button type="link" onClick={onRemove} danger disabled={!allowRemove} icon={removeIcon}>
                {removeText}
              </Button>
            </Col>
          </Row>
        );
      }}
    >
      {(children, controls) =>
        renderPart(
          <div
            ref={innerRef}
            className={classnames(style['table-list-inner'], {
              [style['is-overflow']]: isOverflow
            })}
            style={{
              '--table-list-field-count': Math.max(fieldCount, 1)
            }}
          >
            {children}
          </div>,
          controls
        )
      }
    </TableListBase>
  );

  const renderMobileList = () => (
    <SubList
      {...others}
      list={list}
      listRender={({ id, list: rowList, groupArgs, onRemove, allowRemove }) => {
        return (
          <div key={id} className={classnames(style['table-list-mobile-card'], 'info-page-table-mobile-card')}>
            <div className={style['table-list-mobile-card-body']}>
              <FieldList
                list={rowList}
                groupArgs={groupArgs}
                itemRender={(children, targetProps) => {
                  if (targetProps.hidden) {
                    return <div style={{ display: 'none' }}>{children}</div>;
                  }
                  return <div className={style['table-list-mobile-field']}>{children}</div>;
                }}
              />
            </div>
            <div className={style['table-list-mobile-actions']}>
              <Button type="link" onClick={onRemove} danger disabled={!allowRemove} icon={removeIcon}>
                {removeText}
              </Button>
            </div>
          </div>
        );
      }}
    >
      {(children, controls) => renderPart(<div className={classnames(style['table-list-mobile-list'], 'info-page-table-mobile-card-list')}>{children}</div>, controls, style['is-mobile'])}
    </SubList>
  );

  // 交给 TableView + useIsMobile（viewport/container）决定是否走移动端；勿在外层提前关掉
  const tableViewRenderMobile = renderMobile === false ? false : typeof resolvedRenderMobile === 'function' ? resolvedRenderMobile : renderMobile === true || resolvedRenderMobile === true ? () => renderMobileList() : false;

  return <TableView columns={columns} dataSource={[]} empty={null} className={style['table-list-view']} renderMobile={tableViewRenderMobile} render={() => renderDesktop()} />;
});

export default markNestBlock(TableList);
