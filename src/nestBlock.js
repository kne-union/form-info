import React from 'react';

/** 标记为「占满整行」的嵌套模块（List / TableList / FormInfo / Steps） */
export const KNE_FORM_INFO_NEST_BLOCK = '__kneFormInfoNestBlock';

/**
 * 嵌套深度：根 List = 第 1 级 = depth 0。
 * 第 5 级起（depth >= 4）走 nest-beyond；仅第 5 级画左侧色条。
 */
export const NEST_DEPTH_BEYOND = 4;

export const markNestBlock = Component => {
  if (Component) {
    Component[KNE_FORM_INFO_NEST_BLOCK] = true;
  }
  return Component;
};

export const isNestBlockType = type => {
  if (!type) {
    return false;
  }
  if (type[KNE_FORM_INFO_NEST_BLOCK]) {
    return true;
  }
  if (type.type?.[KNE_FORM_INFO_NEST_BLOCK] || type.render?.[KNE_FORM_INFO_NEST_BLOCK]) {
    return true;
  }
  return false;
};

export const isNestBlockElement = element => {
  if (!element || typeof element !== 'object' || !element.type) {
    return false;
  }
  // 勿把字段的 layout `block`（如 TextArea block）当成嵌套块，否则会误写 nestDepth 到 DOM
  return isNestBlockType(element.type);
};

/**
 * 给 list 内嵌套模块打上 block + nestDepth（只靠 props）
 * @param {Array} list
 * @param {number} nestDepth 子模块深度
 */
export const decorateNestBlocks = (list, nestDepth) =>
  (Array.isArray(list) ? list : []).map(item => {
    if (!item || typeof item !== 'object' || !isNestBlockType(item.type)) {
      return item;
    }
    return React.cloneElement(item, {
      block: true,
      nestDepth
    });
  });
