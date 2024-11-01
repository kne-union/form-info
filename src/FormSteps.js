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

  const currentFormProps = Object.assign({}, stepProps.items[currentStep]?.formProps);
  const inner = (
    <Flex className={className} vertical={stepProps.direction !== 'vertical'} gap={24}>
      <Steps {...omit(stepProps, ['current', 'defaultCurrent', 'onChange'])} className={classnames(stepsClassName, style['steps'])} items={stepProps.items.map(item => omit(item, ['formProps']))} current={currentStep} />
      <div className={style['steps-form-inner']}>{stepProps.items[currentStep]?.children}</div>
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
