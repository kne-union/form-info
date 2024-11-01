import React, { forwardRef } from 'react';
import InfoPage from '@kne/info-page';
import { FormAntd as ReactForm } from '@kne/react-form-antd';
import classnames from 'classnames';
import style from './style.module.scss';

const Form = forwardRef((props, ref) => {
  const { className, children, ...others } = Object.assign({}, { type: 'inner' }, props);
  return (
    <ReactForm {...others} ref={ref} className={classnames(className, style['form-outer'])}>
      <InfoPage>{children}</InfoPage>
    </ReactForm>
  );
});

export default Form;
