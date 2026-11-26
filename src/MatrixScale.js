import React from 'react';
import InfoPage from '@kne/info-page';
import { RadioGroup, useFormIsMobile } from '@kne/react-form-antd';
import classnames from 'classnames';
import '@kne/info-page/dist/index.css';
import style from './style.module.scss';
import { markNestBlock } from './nestBlock';

/**
 * 每一行都是同一个 field，其余 props 透传给它：
 * - columns：每格一个 field，值写到 `${name}.${row.name}.${column.name}`
 * - options：选项组类 field（RadioGroup / CheckboxGroup），选项作列，值写到 `${name}.${row.name}`
 * - 都不传：每行一个 field（如 Rate），值写到 `${name}.${row.name}`
 */
const MatrixScale = p => {
  const { className, title, bordered, name, rows, columns, options, rowTitle, field: FieldComponent, styles: partStyles, style: partStyle, block, nestDepth, ...fieldProps } = Object.assign({}, { rows: [], field: RadioGroup }, p);
  const isMobile = useFormIsMobile();
  const isCells = Array.isArray(columns);
  const isChoice = !isCells && Array.isArray(options);
  const headers = isCells ? columns.map(column => ({ key: column.name, label: column.label })) : isChoice ? options.map(option => ({ key: option.value, label: option.label })) : [];
  const isReq = typeof fieldProps.rule === 'string' && fieldProps.rule.split(' ').indexOf('REQ') > -1;

  return (
    <InfoPage.Part
      title={title}
      bordered={bordered}
      styles={partStyles}
      style={partStyle}
      className={classnames(className, style['matrix-scale'], {
        [style['is-mobile']]: isMobile,
        [style['is-choice']]: isChoice
      })}
    >
      <div className={style['matrix-scale-inner']} style={{ '--matrix-scale-option-count': Math.max(headers.length, 1) }}>
        {!isMobile && (headers.length > 0 || rowTitle) && (
          <div className={style['matrix-scale-header']}>
            <div className={style['matrix-scale-row-title']}>{rowTitle}</div>
            {headers.map(header => (
              <div key={header.key} className={style['matrix-scale-option-title']}>
                {header.label}
              </div>
            ))}
          </div>
        )}
        {rows.map(row =>
          isCells ? (
            <div key={row.name} className={classnames(style['matrix-scale-row'], style['is-cells'])}>
              <div className={classnames(style['matrix-scale-row-label'], { [style['is-req']]: isReq })}>{row.label}</div>
              {columns.map(column => (
                <div key={column.name} className={style['matrix-scale-cell']}>
                  <FieldComponent {...fieldProps} name={`${name}.${row.name}.${column.name}`} label={column.label} labelHidden={!isMobile} />
                </div>
              ))}
            </div>
          ) : (
            <div key={row.name} className={style['matrix-scale-row']}>
              <FieldComponent {...fieldProps} {...(isChoice ? { options } : {})} name={`${name}.${row.name}`} label={row.label} />
            </div>
          )
        )}
      </div>
    </InfoPage.Part>
  );
};

export default markNestBlock(MatrixScale);
