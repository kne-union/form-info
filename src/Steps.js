import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Flex, Steps as AntSteps } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import InfoPage from '@kne/info-page';
import { useFormContext } from '@kne/react-form-antd';
import { useIsMobile } from '@kne/responsive-utils';
import useControlValue from '@kne/use-control-value';
import classnames from 'classnames';
import omit from 'lodash/omit';
import { useIntl } from '@kne/react-intl';
import FormInfo from './FormInfo';
import withLocale from './withLocale';
import { markNestBlock } from './nestBlock';
import style from './style.module.scss';

const collectFieldNames = (item = {}) => {
  if (Array.isArray(item.fieldNames) && item.fieldNames.length) {
    return item.fieldNames.filter(Boolean);
  }
  return (item.list || []).map(field => field?.props?.name).filter(Boolean);
};

/** 校验指定字段，全部 PASS 才返回 true */
export const validateFieldsByName = (openApi, names = []) => {
  if (!openApi?.validateField || !openApi?.emitter || !names.length) {
    return Promise.resolve(true);
  }

  return Promise.all(
    names.map(
      name =>
        new Promise(resolve => {
          const field = openApi.getField?.({ name });
          if (!field?.id) {
            resolve(true);
            return;
          }

          let settled = false;
          let subscription;
          const finish = pass => {
            if (settled) {
              return;
            }
            settled = true;
            subscription?.remove?.();
            clearTimeout(timer);
            resolve(!!pass);
          };

          subscription = openApi.emitter.addListener(`form-field:validate:complete:${field.id}`, ({ validate } = {}) => {
            finish(validate?.status === 'PASS');
          });

          openApi.validateField({ name });

          const timer = setTimeout(() => {
            const latest = openApi.getField?.({ name });
            finish(latest?.isPass === true || latest?.validate?.status === 'PASS');
          }, 2000);
        })
    )
  ).then(results => results.every(Boolean));
};

const findFirstErrorStepIndex = (items, errors) => {
  const errorNames = new Set((errors || []).map(item => item?.name).filter(Boolean));
  if (!errorNames.size) {
    return -1;
  }
  return items.findIndex(step => collectFieldNames(step).some(name => errorNames.has(name)));
};

/**
 * 嵌入父级 Form 的分步区域（不自建 Form）。
 * - 下一步：校验当前步字段
 * - 父表单提交失败：跳到首个出错步骤
 * - 父表单重置：回到第 0 步
 * 独立向导请继续用 FormSteps（自带 Form，行为不变）。
 */
const Steps = withLocale(p => {
  const { formatMessage } = useIntl();
  const {
    className,
    stepsClassName,
    title,
    subtitle,
    bordered,
    items = [],
    showActions = true,
    prevText,
    nextText,
    prevIcon,
    nextIcon,
    ...stepProps
  } = Object.assign(
    {},
    {
      defaultCurrent: 0,
      prevText: formatMessage({ id: 'prev' }),
      nextText: formatMessage({ id: 'next' }),
      prevIcon: <LeftOutlined />,
      nextIcon: <RightOutlined />
    },
    p
  );

  const isMobile = useIsMobile();
  const { openApi } = useFormContext() || {};
  const rootRef = useRef(null);
  const [nextLoading, setNextLoading] = useState(false);
  const [currentStep, onStepChange] = useControlValue(stepProps, {
    value: 'current',
    defaultValue: 'defaultCurrent'
  });

  const stepsDirection = isMobile ? 'vertical' : stepProps.direction || stepProps.orientation;
  const isVerticalSteps = stepsDirection === 'vertical';
  const isLastStep = currentStep >= items.length - 1;

  const jumpToErrorStep = useCallback(
    errors => {
      const index = findFirstErrorStepIndex(items, errors);
      if (index < 0) {
        return;
      }
      onStepChange(index);
      requestAnimationFrame(() => {
        rootRef.current?.scrollIntoView?.({ behavior: 'smooth', block: 'nearest' });
      });
    },
    [items, onStepChange]
  );

  useEffect(() => {
    const emitter = openApi?.emitter;
    if (!emitter?.addListener) {
      return undefined;
    }

    const onSubmitError = errors => jumpToErrorStep(errors);
    const onSubmitComplete = ({ isPass, errors } = {}) => {
      if (!isPass) {
        jumpToErrorStep(errors);
      }
    };
    const onReset = () => onStepChange(0);

    const errorSub = emitter.addListener('form:submit:error', onSubmitError);
    const completeSub = emitter.addListener('form:submit:complete', onSubmitComplete);
    const resetSub = emitter.addListener('form:reset', onReset);
    return () => {
      errorSub?.remove?.();
      completeSub?.remove?.();
      resetSub?.remove?.();
    };
  }, [openApi, jumpToErrorStep, onStepChange]);

  const handleNext = useCallback(async () => {
    if (nextLoading || isLastStep) {
      return;
    }
    setNextLoading(true);
    try {
      const pass = await validateFieldsByName(openApi, collectFieldNames(items[currentStep]));
      if (pass) {
        onStepChange(Math.min(items.length - 1, currentStep + 1));
      }
    } finally {
      setNextLoading(false);
    }
  }, [currentStep, isLastStep, items, nextLoading, onStepChange, openApi]);

  const handlePrev = useCallback(() => {
    onStepChange(Math.max(0, currentStep - 1));
  }, [currentStep, onStepChange]);

  if (!items.length) {
    return null;
  }

  return (
    <div ref={rootRef} className={classnames(className, style['steps-embed'])}>
      <InfoPage.Part title={title} subtitle={subtitle} bordered={bordered}>
        <Flex vertical gap={24}>
          <AntSteps
            {...omit(stepProps, ['current', 'defaultCurrent', 'onChange', 'direction', 'orientation', 'items'])}
            current={currentStep}
            direction={stepsDirection}
            orientation={stepsDirection}
            className={classnames('kne-form-steps', stepsClassName, style['steps'], {
              [style['steps-vertical']]: isVerticalSteps
            })}
            items={items.map((item, index) => ({
              title: item.title || formatMessage({ id: 'untitledStep' }, { index: index + 1 })
            }))}
          />

          {items.map((item, index) => (
            <div key={item.key || item.id || index} className={style['steps-embed-panel']} style={index === currentStep ? undefined : { display: 'none' }} aria-hidden={index !== currentStep}>
              {item.children != null ? item.children : <FormInfo column={item.column} gap={item.gap} list={item.list || []} />}
            </div>
          ))}

          {showActions ? (
            <Flex className={style['steps-actions']} justify="space-between" align="center" gap={8} wrap="wrap">
              <div className={style['steps-actions-side']}>
                {currentStep > 0 ? (
                  <Button type="link" size="small" icon={prevIcon} onClick={handlePrev}>
                    {prevText}
                  </Button>
                ) : null}
              </div>
              <div className={style['steps-actions-side']}>
                {!isLastStep ? (
                  <Button type="link" size="small" icon={nextIcon} iconPosition="end" loading={nextLoading} onClick={handleNext}>
                    {nextText}
                  </Button>
                ) : null}
              </div>
            </Flex>
          ) : null}
        </Flex>
      </InfoPage.Part>
    </div>
  );
});

export default markNestBlock(Steps);
