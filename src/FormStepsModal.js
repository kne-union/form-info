import React, { createContext, useContext } from 'react';
import FormModal, { ModalFooter } from './FormModal';
import FormSteps from './FormSteps';
import merge from 'lodash/merge';
import classnames from 'classnames';
import style from './style.module.scss';

const childrenContext = createContext({});
const { Provider } = childrenContext;
const useChildrenContext = () => {
  return useContext(childrenContext);
};

const StepChildren = () => {
  const { stepChildren } = useChildrenContext();
  return stepChildren;
};

const StepFormFooter = p => {
  const { completeText, nextText, ...props } = Object.assign({}, p);

  const { isLastStep } = useChildrenContext();
  return <ModalFooter {...props} okText={isLastStep ? completeText : nextText} />;
};

const FormStepsModal = p => {
  const locale = Object.assign(
    {},
    {
      完成: '完成',
      下一步: '下一步'
    },
    p.locale
  );
  const { modalProps, completeText, nextText, className, ...others } = merge(
    {},
    {
      autoStep: true,
      modalProps: {
        autoClose: true
      },
      completeText: locale['完成'],
      nextText: locale['下一步']
    },
    p,
    { locale }
  );
  return (
    <FormModal
      {...modalProps}
      modalRender={({ defaultChildren }) => {
        return (
          <FormSteps
            {...Object.assign({}, others, {
              items: others.items.map(item => {
                return Object.assign({}, item, {
                  formProps: Object.assign({}, item.formProps, {
                    onSubmit: (data, context, ...args) => {
                      return item.formProps?.onSubmit?.(
                        data,
                        Object.assign({}, context, {
                          close: modalProps.onCancel
                        }),
                        ...args
                      );
                    }
                  })
                });
              })
            })}
            className={classnames(className, style['steps-modal'])}
            onComplete={async data => {
              const res = await others.onComplete?.(data);
              modalProps.autoClose && res !== false && modalProps.onCancel?.();
            }}
          >
            {({ children: stepChildren, ...props }) => <Provider value={{ stepChildren, ...props }}>{defaultChildren}</Provider>}
          </FormSteps>
        );
      }}
      footer={({ props }) => {
        return <StepFormFooter {...props} completeText={completeText} nextText={nextText} />;
      }}
    >
      <StepChildren />
    </FormModal>
  );
};

export default FormStepsModal;
