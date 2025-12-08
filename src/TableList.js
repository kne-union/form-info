import React from 'react';
import InfoPage from '@kne/info-page';
import { Empty, Row, Col, Button } from 'antd';
import { TableList as TableListBase } from '@kne/react-form-plus';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useIntl } from '@kne/react-intl';
import withLocale from './withLocale';
import classnames from 'classnames';
import style from './style.module.scss';

const TableList = withLocale(p => {
  const { formatMessage } = useIntl();
  const { className, addIcon, addText, removeIcon, removeText, title, ...others } = Object.assign(
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
  return (
    <TableListBase
      {...others}
      headerRender={(children, { width }) => {
        return (
          <Row
            className={style['table-list-header']}
            wrap={false}
            style={{
              '--col-width': width
            }}
          >
            {children}
            <Col className={style['table-options']}></Col>
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
        return (
          <Col className={style['table-list-field']} flex={1}>
            {children}
          </Col>
        );
      }}
      listRender={(children, { id, width, onRemove, allowRemove }) => {
        return (
          <Row
            key={id}
            wrap={false}
            align="top"
            style={{
              '--col-width': width
            }}
          >
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
      {(children, { onAdd, allowAdd }) => {
        return (
          <InfoPage.Part
            title={title}
            className={classnames(className, style['table-list'])}
            extra={
              allowAdd && (
                <Button className={style['extra-btn']} icon={addIcon} onClick={onAdd}>
                  {addText}
                </Button>
              )
            }
          >
            <div className={style['table-list-inner']}>{children}</div>
          </InfoPage.Part>
        );
      }}
    </TableListBase>
  );
});

export default TableList;
