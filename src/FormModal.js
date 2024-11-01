import React, { isValidElement } from 'react';
import { Modal, Flex } from 'antd';
import { SubmitButton, CancelButton } from '@kne/react-form-antd';
import Form from './Form';
import { useContext } from '@kne/global-context';
import omit from 'lodash/omit';

export const ModalFooter = props => {
  const { children, cancelText, cancelButtonProps, okButtonProps, okType, onOk, okText, ...others } = props;
  const defaultFooter = (
    <Flex justify="space-between" gap={8}>
      <div></div>
      <Flex gap={8}>
        <CancelButton
          {...Object.assign({}, cancelButtonProps, {
            onClick: others.onCancel
          })}
        >
          {cancelText}
        </CancelButton>
        <SubmitButton
          {...Object.assign({}, okButtonProps, {
            type: okType,
            onClick: onOk
          })}
        >
          {okText}
        </SubmitButton>
      </Flex>
    </Flex>
  );
  if (typeof children === 'function') {
    return children({ defaultFooter, props: omit(props, ['children']) });
  }
  if (isValidElement(children) || children === null) {
    return children;
  }
  return defaultFooter;
};

export const ModalForm = props => {
  const { formProps, autoClose, children, modalRender, ...others } = props;
  const formChildren = (
    <Form
      {...Object.assign({}, formProps, {
        onSubmit: async (data, ...args) => {
          const res = await formProps.onSubmit?.(data, { close: others.onCancel }, ...args);
          if (res === false) {
            return;
          }
          autoClose && others.onCancel && others.onCancel();
        }
      })}
    >
      {children}
    </Form>
  );
  return typeof modalRender === 'function'
    ? modalRender({
        formChildren,
        defaultChildren: children,
        props: omit(props, ['children'])
      })
    : formChildren;
};

const FormModal = p => {
  const { locale: contextLocale } = useContext();
  const locale = Object.assign(
    {},
    {
      提交: '提交',
      取消: '取消'
    },
    contextLocale,
    p.locale
  );
  const { formProps, okType, okButtonProps, okText, onOk, cancelButtonProps, cancelText, footer, renderModal, modalRender, autoClose, ...others } = Object.assign(
    {},
    {
      formProps: {},
      autoClose: true,
      okType: 'primary',
      okText: locale['提交'],
      cancelText: locale['取消'],
      renderModal: props => <Modal {...props} />
    },
    p,
    { locale }
  );

  return renderModal(
    Object.assign({}, others, {
      modalRender: children => (
        <ModalForm
          {...Object.assign({}, others, {
            formProps,
            autoClose,
            children,
            modalRender
          })}
        />
      ),
      footer: () => {
        return (
          <ModalFooter
            {...Object.assign({}, others, {
              children: footer,
              cancelText,
              cancelButtonProps,
              okButtonProps,
              okType,
              onOk,
              okText
            })}
          />
        );
      }
    })
  );
};

export default FormModal;
