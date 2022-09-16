import * as React from 'react';
import { createBEM } from '@zarm-design/bem';
import isEqual from 'lodash/isEqual';
import Wheel from '../wheel';
import { isCascader } from '../utils/validate';
import parseProps from './utils/parseProps';
import type { BasePickerViewProps } from './interface';
import type { WheelValue } from '../wheel/interface';
import { ConfigContext } from '../n-config-provider';
import type { HTMLProps } from '../utils/utilityTypes';

export type PickerViewProps = BasePickerViewProps &
  HTMLProps<{
    '--background-color': React.CSSProperties['backgroundColor'];
    '--padding': React.CSSProperties['padding'];
    '--mask-start-background-color': React.CSSProperties['backgroundColor'];
    '--mask-end-background-color': React.CSSProperties['backgroundColor'];
    '--wheel-item-rows': number;
    '--wheel-item-height': React.CSSProperties['height'];
    '--wheel-item-font-size': React.CSSProperties['fontSize'];
    '--wheel-item-text-color': React.CSSProperties['color'];
    '--wheel-item-disabled-text-color': React.CSSProperties['color'];
    '--wheel-item-selected-background-color': React.CSSProperties['backgroundColor'];
    '--wheel-item-selected-border-radius': React.CSSProperties['borderRadius'];
  }>;

export type PickerViewInstance = Pick<PickerViewProps, 'value' | 'dataSource'>;

const PickerView = React.forwardRef<PickerViewInstance, PickerViewProps>((props, ref) => {
  const { className, style, valueMember, cols, itemRender, disabled, stopScroll, onChange } = props;
  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('picker-view', { prefixCls });
  const [innerValue, setInnerValue] = React.useState(parseProps.getSource(props).value);

  React.useEffect(() => {
    if (props.value === undefined) return;
    if (isEqual(props.value, innerValue)) return;
    setInnerValue(parseProps.getSource(props).value);
  }, [props.value]);

  const { dataSource, objValue } = React.useMemo(
    () => parseProps.getSource({ ...props, value: innerValue }),
    [valueMember, cols, innerValue, props.dataSource],
  );

  React.useImperativeHandle(ref, () => ({ value: innerValue, dataSource: objValue }));

  const onValueChange = (selected: WheelValue, level: number) => {
    const value = innerValue.slice();
    if (isCascader({ dataSource: props.dataSource })) {
      value.length = level + 1;
    }
    value[level] = selected;
    const next = parseProps.getSource({ ...props, value });
    setInnerValue(next.value);
    onChange?.(next.value, next.objValue);
  };

  return (
    <div className={bem([className])} style={style}>
      <div className={bem('content')}>
        {dataSource.map((item, index) => (
          <Wheel
            key={+index}
            dataSource={item}
            value={innerValue?.[index]}
            valueMember={props.valueMember}
            itemRender={itemRender}
            disabled={disabled}
            onChange={(selected: WheelValue) => onValueChange(selected, index)}
            stopScroll={stopScroll}
          />
        ))}
      </div>
      <div className={bem('mask', [{ top: true }])} />
      <div className={bem('mask', [{ bottom: true }])} />
    </div>
  );
});

PickerView.defaultProps = {
  defaultValue: [],
  dataSource: [],
  cols: Infinity,
  valueMember: 'value',
  itemRender: (data) => data.label,
  disabled: false,
};

export default PickerView;
