import React from 'react';
import {Button, Divider, Empty} from 'antd';
import FormInfo from './FormInfo';
import InfoPage from "@kne/info-page";
import {SubList} from '@kne/react-form-plus';
import classnames from 'classnames';
import style from './style.module.scss';

const List = (props) => {
    const {className, removeIcon, removeText, addText, addIcon, important, ...others} = Object.assign({}, {
        addText: '添加', addIcon: null, removeText: '删除', removeIcon: null, empty: <Empty description={false}/>
    }, props);
    return <SubList {...others} className={classnames(className, style["list-part"])}
                    listRender={({id, allowRemove, onRemove, index, groupArgs, ...props}) => {
                        return <div key={id} className={classnames(style["list-item"], {
                            [style["is-important"]]: important,
                        })}>
                            <FormInfo {...props} className={style["list-item-part"]} gap={16}
                                      extra={allowRemove &&
                                          <Button type="link" danger className="btn-no-padding" icon={removeIcon}
                                                  onClick={onRemove}>{removeText}</Button>}/>
                            <Divider/>
                        </div>
                    }}>{(children, {allowAdd, onAdd, isUnshift, ...others}) => {
        return <InfoPage.Part {...others} extra={allowAdd &&
            <Button className={style['extra-btn']} icon={addIcon} onClick={onAdd}>{addText}</Button>}>
            {children}
        </InfoPage.Part>
    }}</SubList>
};

export default List;
