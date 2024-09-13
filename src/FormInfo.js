import React from 'react';
import InfoPage from '@kne/info-page';
import {useFlexBox} from '@kne/flex-box';
import {FormInfo as FormInfoBase} from '@kne/react-form-plus';
import {Row, Col} from 'antd';
import classnames from 'classnames';
import style from './style.module.scss';

const FormInfo = (props) => {
    const {className, column, list, gap, ...others} = Object.assign({}, {column: 2, list: []}, props);
    const isFlexBox = !(Number.isInteger(column) && column > 0);
    const {ref: flexBoxRef, column: flexBoxColumn} = useFlexBox(isFlexBox ? column : {});
    const renderInner = (column, notLayout) => {
        return <FormInfoBase list={list} column={column} className={classnames({
            [style["column-not-layout"]]: notLayout
        })} itemRender={(children, props) => {
            if (props.hidden) {
                return <div style={{display: 'none'}}>{children}</div>
            }
            return <Col span={props.span}>{children}</Col>;
        }}>{(children) => {
            return <Row gutter={[gap || 24, 0]}>
                {children}
            </Row>
        }}</FormInfoBase>
    };

    const renderColumn = () => {
        if (!isFlexBox) {
            return renderInner(column);
        }
        if (flexBoxColumn) {
            return renderInner(flexBoxColumn.col);
        }

        return renderInner(2, true);
    };

    return <InfoPage.Part {...others} className={classnames(className, style['form-info'])}>
        <div ref={flexBoxRef}/>
        {renderColumn()}
    </InfoPage.Part>
};

export default FormInfo;
