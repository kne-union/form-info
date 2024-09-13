import React from 'react';
import InfoPage from '@kne/info-page';
import {Empty, Row, Col, Button} from 'antd';
import {TableList as TableListBase} from '@kne/react-form-plus';
import classnames from 'classnames';
import style from './style.module.scss';

const TableList = (props) => {
    const {className, addIcon, addText, removeIcon, removeText, ...others} = Object.assign({}, {
        empty: <Empty description={false}/>, addIcon: null, addText: '添加', removeIcon: null, removeText: '删除'
    }, props);
    return <TableListBase {...others} headerRender={(children, {width}) => {
        return <Row className={style['table-list-header']} wrap={false} style={{
            "--col-width": width,
        }}>
            {children}
            <Col className={style['table-options']}></Col>
        </Row>
    }} headerItemRender={(children, {id, isReq}) => {
        return <Col className={classnames({
            [style["is-req"]]: isReq
        })} key={id}>{children}</Col>
    }} itemRender={(children) => {
        return <Col className={style['table-list-field']} flex={1}>{children}</Col>;
    }} listRender={(children, {id, width, onRemove, allowRemove}) => {
        return <Row key={id} wrap={false} align="top" style={{
            "--col-width": width,
        }}>
            {children}
            <Col className={style['table-options']}>
                <Button type="link" onClick={onRemove} danger disabled={!allowRemove}
                        icon={removeIcon}>{removeText}</Button>
            </Col>
        </Row>
    }}>{(children, {onAdd, allowAdd, ...others}) => {
        return <InfoPage.Part {...props} className={classnames(className, style["table-list"])} extra={allowAdd &&
            <Button className={style['extra-btn']} icon={addIcon} onClick={onAdd}>{addText}</Button>}>
            <div className={style['table-list-inner']}>
                {children}
            </div>
        </InfoPage.Part>
    }}</TableListBase>
};

export default TableList;
