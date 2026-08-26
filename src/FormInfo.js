import React, { useMemo } from 'react';
import InfoPage from '@kne/info-page';
import { useFlexBox } from '@kne/flex-box';
import { FormInfo as FormInfoBase } from '@kne/react-form-plus';
import { useIsMobile } from '@kne/responsive-utils';
import { Row, Col } from 'antd';
import classnames from 'classnames';
import { isNestBlockElement, markNestBlock } from './nestBlock';
import '@kne/info-page/dist/index.css';
import style from './style.module.scss';

/** List / TableList / FormInfo / Steps 等嵌套模块强制整行，避免与字段并排把深层挤扁 */
const ensureNestBlocksFullWidth = list =>
  (Array.isArray(list) ? list : []).map(item => {
    if (!isNestBlockElement(item) || item.props?.block === true) {
      return item;
    }
    return React.cloneElement(item, { block: true });
  });

const FormInfo = props => {
  const { className, column, list, gap, ...others } = Object.assign({}, { column: 2, list: [] }, props);
  const isMobile = useIsMobile();
  const normalizedList = useMemo(() => ensureNestBlocksFullWidth(list), [list]);
  const isFlexBox = !isMobile && !(Number.isInteger(column) && column > 0);
  const { ref: flexBoxRef, column: flexBoxColumn } = useFlexBox(isFlexBox ? column : {});
  const rowGap = gap || 24;

  const renderInner = (column, notLayout) => {
    return (
      <FormInfoBase
        list={normalizedList}
        column={column}
        className={classnames({
          [style['column-not-layout']]: notLayout
        })}
        itemRender={(children, props) => {
          if (props.hidden) {
            return <div style={{ display: 'none' }}>{children}</div>;
          }
          return (
            <Col span={props.span} className={props.span === 24 ? style['nest-block-col'] : undefined}>
              {children}
            </Col>
          );
        }}
      >
        {children => {
          return <Row gutter={[rowGap, 0]}>{children}</Row>;
        }}
      </FormInfoBase>
    );
  };

  const renderColumn = () => {
    if (isMobile) {
      return renderInner(1);
    }
    if (!isFlexBox) {
      return renderInner(column);
    }
    if (flexBoxColumn) {
      return renderInner(flexBoxColumn.col);
    }

    return renderInner(2, true);
  };

  return (
    <InfoPage.Part {...others} className={classnames(className, style['form-info'])}>
      <div ref={flexBoxRef} />
      {renderColumn()}
    </InfoPage.Part>
  );
};

export default markNestBlock(FormInfo);
