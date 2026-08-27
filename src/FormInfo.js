import React, { useMemo } from 'react';
import InfoPage from '@kne/info-page';
import { useFlexBox } from '@kne/flex-box';
import { FormInfo as FormInfoBase } from '@kne/react-form-plus';
import { useIsMobile } from '@kne/responsive-utils';
import { Row, Col } from 'antd';
import classnames from 'classnames';
import { isNestBlockElement, isNestBlockType, markNestBlock, NEST_DEPTH_BEYOND } from './nestBlock';
import '@kne/info-page/dist/index.css';
import style from './style.module.scss';

/** 仅保证嵌套块整行；nestDepth 由 List 在 listRender 里写入，这里不覆盖 */
const ensureNestBlocksFullWidth = list =>
  (Array.isArray(list) ? list : []).map(item => {
    if (!isNestBlockElement(item) || item.props?.block === true) {
      return item;
    }
    return React.cloneElement(item, { block: true });
  });

const FormInfo = props => {
  const { className, column, list, gap, bordered, nestDepth, ...others } = Object.assign({}, { column: 2, list: [] }, props);
  const isMobile = useIsMobile();
  // 嵌套块（nestDepth >= 1）内部样式固定，不受外层 bordered 开关影响
  const partBordered = typeof nestDepth === 'number' && nestDepth >= 1 ? true : bordered;
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
          // 嵌套块整行；第 5 级起按 nestDepth 清 gutter（不依赖 :has 直选，SchemaRenderer 路径同样生效）
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
