import React, { useRef } from 'react';
import { Steps, Flex } from 'antd';
import Form from './Form';
import useControlValue from '@kne/use-control-value';
import omit from 'lodash/omit';
import classnames from 'classnames';
import style from './style.module.scss';

const FormSteps = p => {
  const { className, stepsClassName, autoStep, onComplete, children, ...stepProps } = Object.assign(
    {},
    {
      autoStep: true,
      defaultCurrent: 0,
      items: [],
      onComplete: () => {}
    },
    p
  );
  const [currentStep, onStepChange] = useControlValue(stepProps, {
    value: 'current',
    defaultValue: 'defaultCurrent'
  });

  const stepCacheRef = useRef([]);

  const isLastStep = currentStep === stepProps.items.length - 1;

  const currentFormProps = Object.assign({}, stepProps.items[currentStep]?.formProps, {
    data: Object.assign({}, stepProps.items[currentStep]?.formProps?.data, stepCacheRef.current[currentStep]?.formData)
  });

  const stepItems = stepProps.items.map(item => {
    const currentItem = omit(item, ['formProps']);
    if (typeof currentItem.children === 'function') {
      return Object.assign({}, currentItem, {
        children: currentItem.children({
          isLastStep,
          currentStep,
          onStepChange,
          getStepCache: () => {
            return stepCacheRef.current;
          }
        })
      });
    }
    return currentItem;
  });

  const inner = (
    <Flex className={className} vertical={stepProps.direction !== 'vertical' || stepProps.orientation !== 'vertical'} gap={24}>
      <Steps {...omit(stepProps, ['current', 'defaultCurrent', 'onChange'])} className={classnames(stepsClassName, style['steps'])} items={stepItems} current={currentStep} />
      <div className={style['steps-form-inner']}>{stepItems[currentStep]?.children}</div>
    </Flex>
  );
  return (
    <Form
      {...Object.assign({}, currentFormProps, {
        onSubmit: async (data, ...args) => {
          if (!stepCacheRef.current[currentStep]) {
            stepCacheRef.current[currentStep] = {};
          }
          stepCacheRef.current[currentStep].formData = data;
          const res = await currentFormProps.onSubmit?.(
            data,
            {
              currentStep,
              onStepChange,
              stepCache: stepCacheRef.current,
              getStepCache: () => {
                return stepCacheRef.current;
              },
              isLastStep
            },
            ...args
          );
          stepCacheRef.current[currentStep].submitData = res;

          if (autoStep && res !== false && !isLastStep) {
            onStepChange(currentStep + 1);
            return res;
          }
          if (autoStep && res !== false) {
            onComplete(stepCacheRef.current);
            return res;
          }

          return res;
        }
      })}
      key={currentStep}
    >
      {typeof children === 'function'
        ? children({
            children: inner,
            isLastStep,
            currentStep,
            onStepChange,
            getStepCache: () => {
              return stepCacheRef.current;
            }
          })
        : inner}
    </Form>
  );
};

export default FormSteps;
