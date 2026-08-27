import React, { useMemo } from 'react';
import InfoPage from '@kne/info-page';
import { useFlexBox } from '@kne/flex-box';
import { FormInfo as FormInfoBase } from '@kne/react-form-plus';
import { useIsMobile } from '@kne/responsive-utils';
import { Row, Col } from 'antd';
import classnames from 'classnames';
import { isNestBlockType, markNestBlock, NEST_DEPTH_BEYOND } from './nestBlock';
import '@kne/info-page/dist/index.css';
import style from './style.module.scss';

/** 仅保证嵌套块整行；nestDepth 由 List 在 listRender 里写入，这里不覆盖 */
const ensureNestBlocksFullWidth = list =>
  (Array.isArray(list) ? list : []).map(item => {
    if (!isNestBlockType(item?.type) || item.props?.block === true) {
      return item;
    }
    return React.cloneElement(item, { block: true });
  });

const FormInfo = props => {
  const { className, column, list, gap, bordered, nestDepth, ...others } = Object.assign({}, { column: 2, list: [] }, props);
  const isMobile = useIsMobile();
  // 第二级起嵌套块不走 info-page bordered；样式由 SCSS 色条/子项 plain 负责
  const partBordered = typeof nestDepth === 'number' && nestDepth >= 1 ? false : bordered;
  const normalizedList = useMemo(() => ensureNestBlocksFullWidth(list), [list]);
  const isFlexBox = !isMobile && !(Number.isInteger(column) && column > 0);
  const { ref: flexBoxRef, column: flexBoxColumn } = useFlexBox(isFlexBox ? column : {});
  const rowGap = gap ?? 24;

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
          // 嵌套块整行；nest-beyond Col 保留 Row gutter 左右 padding，与同层字段（如备注）对齐
          const nestCol = isNestBlockType(children?.type);
          const nestDepth = children?.props?.nestDepth;
          const nestBeyond = nestCol && typeof nestDepth === 'number' && nestDepth >= NEST_DEPTH_BEYOND;
          return (
            <Col
              span={props.span}
              className={classnames({
                [style['nest-block-col']]: nestCol,
                [style['nest-block-col-beyond']]: nestBeyond
              })}
            >
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
    <InfoPage.Part {...others} bordered={partBordered} className={classnames(className, style['form-info'])}>
      <div ref={flexBoxRef} />
      {renderColumn()}
    </InfoPage.Part>
  );
};

export default markNestBlock(FormInfo);
