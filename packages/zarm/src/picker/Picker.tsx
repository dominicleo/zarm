import * as React from 'react';
import { createBEM } from '@zarm-design/bem';
import PickerView, { PickerViewInstance } from '../picker-view';
import type { BasePickerProps } from './interface';
import { ConfigContext } from '../n-config-provider';
import type { HTMLProps } from '../utils/utilityTypes';
import PickerContainer from './Container';

export type PickerProps = BasePickerProps &
  HTMLProps<{
    '--header-height': React.CSSProperties['height'];
    '--header-font-size': React.CSSProperties['fontSize'];
    '--header-background-color': React.CSSProperties['backgroundColor'];
    '--header-title-text-color': React.CSSProperties['color'];
    '--header-submit-text-color': React.CSSProperties['color'];
    '--header-cancel-text-color': React.CSSProperties['color'];
    '--cotnent-background-color': React.CSSProperties['backgroundColor'];
    '--cotnent-padding': React.CSSProperties['padding'];
    '--cotnent-mask-start-background-color': React.CSSProperties['backgroundColor'];
    '--cotnent-mask-end-background-color': React.CSSProperties['backgroundColor'];
    '--wheel-item-rows': number;
    '--wheel-item-height': React.CSSProperties['height'];
    '--wheel-item-font-size': React.CSSProperties['fontSize'];
    '--wheel-item-text-color': React.CSSProperties['color'];
    '--wheel-item-disabled-text-color': React.CSSProperties['color'];
    '--wheel-item-selected-background-color': React.CSSProperties['backgroundColor'];
    '--wheel-item-selected-border-radius': React.CSSProperties['borderRadius'];
  }>;

const Picker = React.forwardRef<HTMLDivElement, PickerProps>((props, ref) => {
  const {
    className,
    title,
    confirmText,
    cancelText,
    value,
    defaultValue,
    dataSource,
    valueMember,
    cols,
    itemRender,
    maskClosable,
    mountContainer,
    forceRender,
    destroy,
    onChange,
    onConfirm,
    onCancel,
    visible,
  } = props;
  const { prefixCls, locale } = React.useContext(ConfigContext);
  const bem = createBEM('picker', { prefixCls });
  const pickerViewRef = React.useRef<PickerViewInstance>(null);

  const handleConfirm = () => {
    onConfirm?.(pickerViewRef.current?.value!, pickerViewRef.current?.dataSource!);
  };

  return (
    <PickerContainer
      title={title}
      confirmText={confirmText}
      cancelText={cancelText}
      visible={visible}
      maskClosable={maskClosable}
      forceRender={forceRender}
      destroy={destroy}
      mountContainer={mountContainer}
      onConfirm={handleConfirm}
      onCancel={onCancel}
      onClose={onCancel}
    >
      <PickerView
        ref={pickerViewRef}
        value={value}
        defaultValue={defaultValue}
        dataSource={dataSource}
        cols={cols}
        valueMember={valueMember}
        itemRender={itemRender}
        onChange={onChange}
      />
    </PickerContainer>
  );
});

Picker.defaultProps = {
  dataSource: [],
  valueMember: 'value',
  cols: Infinity,
  maskClosable: true,
  itemRender: (data) => data.label,
  destroy: false,
};

export default Picker;
