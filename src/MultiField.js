import React from 'react';
import {Button, Empty} from 'antd';
import {MultiField as MultiFieldBase} from '@kne/react-form-plus';
import classnames from 'classnames';
import style from './style.module.scss';

const MultiField = (props) => {
    const {className, addText, addIcon, removeIcon, removeText, ...others} = Object.assign({}, {
        addText: '添加', addIcon: null, removeIcon: null, removeText: '删除', empty: <Empty description={false}/>
    }, props);
    return <MultiFieldBase {...others} itemRender={(children, {id, index, allowRemove, onRemove}) => {
        return <div key={id} className={classnames("multi-field-item", style["multi-field-item"], {
            [style["first-item"]]: index === 0,
        })}>
            {children}
            <div>
                <div
                    className={classnames(style["react-form__field-label"], "react-form__field-label", "multi-field-delete-label")}/>
                <Button danger icon={removeIcon} onClick={onRemove} disabled={!allowRemove}>{removeText}</Button>
            </div>

        </div>
    }}>{(children, {allowAdd, onAdd}) => <div
        className={classnames(className, 'multi-field', style['multi-field'])}>
        {children}
        {allowAdd && <Button className={classnames("multi-field-add-btn", style["multi-field-add-btn"])} type="dashed"
                             onClick={onAdd} icon={addIcon}>
            {typeof addText === 'function' ? addText(others.label) : `${addText}${others.label}`}
        </Button>}
    </div>}</MultiFieldBase>
};

export default MultiField;
