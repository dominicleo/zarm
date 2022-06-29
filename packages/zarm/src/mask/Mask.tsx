import * as React from 'react';
import { createBEM } from '@zarm-design/bem';
import { CSSTransition } from 'react-transition-group';
import { ConfigContext } from '../n-config-provider';
import type { HTMLProps, NativeAttrs } from '../utils/utilityTypes';
import type { BaseMaskProps } from './interface';

export interface MaskCssVars {
  '--background-color'?: React.CSSProperties['backgroundColor'];
  '--zindex'?: React.CSSProperties['zIndex'];
  '--filter'?: string;
}

export type MaskProps = NativeAttrs<
  React.HTMLAttributes<HTMLDivElement>,
  BaseMaskProps & HTMLProps<MaskCssVars>
>;

const Mask = React.forwardRef<HTMLDivElement, MaskProps>((props, ref) => {
  const { className, visible = false, type, duration, children, ...rest } = props;
  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('mask', { prefixCls });

  return (
    <CSSTransition
      mountOnEnter
      unmountOnExit
      in={visible}
      timeout={duration!}
      classNames={`${prefixCls}-fade`}
    >
      <div {...rest} ref={ref} className={bem([{ [`${type}`]: true }, className])}>
        {children}
      </div>
    </CSSTransition>
  );
});

Mask.defaultProps = {
  type: 'normal',
  duration: 300,
}

export default Mask;
