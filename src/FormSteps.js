import React, { useRef } from 'react';
import { Steps as AntSteps, Flex } from 'antd';
import { useIsMobile } from '@kne/responsive-utils';
import Form from './Form';
import EmbedSteps from './Steps';
import useControlValue from '@kne/use-control-value';
import omit from 'lodash/omit';
import classnames from 'classnames';
import useStepsOrientation from './useStepsOrientation';
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
  const isMobile = useIsMobile();
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

  const { stepsOrientation, isVerticalSteps, overflowVertical, containerRef, stepsRef } = useStepsOrientation({
    direction: stepProps.direction,
    orientation: stepProps.orientation,
    items: stepProps.items
  });

  // 横排 / 移动端 / 溢出自动竖排：上下堆叠；宽屏强制竖排步骤条时可左右并排
  const stackLayout = !isVerticalSteps || isMobile || overflowVertical;

  const inner = (
    <Flex className={className} vertical={stackLayout} gap={24}>
      <div ref={containerRef} className={style['steps-nav']}>
        <div ref={stepsRef} className={style['steps-measure']}>
          <AntSteps
            {...omit(stepProps, ['current', 'defaultCurrent', 'onChange', 'direction', 'orientation'])}
            direction={stepsOrientation}
            orientation={stepsOrientation}
            className={classnames('kne-form-steps', stepsClassName, style['steps'], {
              [style['steps-vertical']]: isVerticalSteps
            })}
            items={stepItems}
            current={currentStep}
          />
        </div>
      </div>
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
            await onComplete(stepCacheRef.current);
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

/** 嵌入父 Form 的分步（校验/提交跳步/重置）；独立向导仍用 FormSteps 本身 */
FormSteps.Embed = EmbedSteps;

export default FormSteps;
