/** 标记为「占满整行」的嵌套模块（List / TableList / FormInfo / Steps） */
export const KNE_FORM_INFO_NEST_BLOCK = '__kneFormInfoNestBlock';

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
  // withLocale / forwardRef 包装
  if (type.type?.[KNE_FORM_INFO_NEST_BLOCK] || type.render?.[KNE_FORM_INFO_NEST_BLOCK]) {
    return true;
  }
  return false;
};

export const isNestBlockElement = element => {
  if (!element || typeof element !== 'object' || !element.type) {
    return false;
  }
  if (element.props?.block === true) {
    return true;
  }
  return isNestBlockType(element.type);
};
