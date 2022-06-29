import * as React from 'react';
import { createBEM } from '@zarm-design/bem';
import { CSSTransition } from 'react-transition-group';
import Mask, { MaskProps } from '../mask';
import { ConfigContext } from '../n-config-provider';
import { useLockScroll } from '../utils/hooks';
import type { BasePopupProps } from './interface';
import type { HTMLProps } from '../utils/utilityTypes';

export interface PopupProps extends BasePopupProps, HTMLProps {
  maskClassName?: string;
  maskStyle?: MaskProps['style'];
}

const Popup = React.forwardRef<HTMLDivElement, PopupProps>((props, ref) => {
  const {
    className,
    style,
    width,
    mask,
    maskClassName,
    maskStyle,
    maskType,
    direction,
    destroy,
    visible,
    lockScroll,
    animationType,
    animationDuration,
    onMaskClick,
    children,
  } = props;
  const { prefixCls, ...context } = React.useContext(ConfigContext);
  const bem = createBEM('popup', { prefixCls });
  const popupRef = React.useRef<HTMLDivElement>(null);

  useLockScroll(visible! && lockScroll!);

  const mountContainer = context.mountContainer ?? props.mountContainer;

  // React.useImperativeHandle(ref, () => popupRef.current!);

  const popupStyle = direction === 'top' ? {
    width,
    WebkitAnimationDuration: `${animationDuration}ms`,
    animationDuration: `${animationDuration}ms`,
  } : {
    WebkitTransitionDuration: `${animationDuration}ms`,
    transitionDuration: `${animationDuration}ms`,
    WebkitTransitionProperty: 'transform',
    transitionProperty: 'transform',
  }

  const transitionNames = {
    center: `${prefixCls}-fade`,
    top: `${prefixCls}-move-up`,
    right: `${prefixCls}-move-right`,
    bottom: `${prefixCls}-move-down`,
    left: `${prefixCls}-move-left`,
  };

  const transitionName = transitionNames[direction!];

  return (
    <>
      {mask && (
        <Mask
          className={maskClassName}
          style={maskStyle}
          type={maskType}
          onClick={onMaskClick}
          visible={visible}
        />
      )}
      <CSSTransition
        // nodeRef={popupRef}
        mountOnEnter
        unmountOnExit
        in={visible}
        timeout={animationDuration!}
        classNames={`${prefixCls}-fade`}
      >
        <div
          // ref={popupRef}
          className={bem('', [
            {
              [`${direction}`]: true,
            },
            className,
          ])}
          style={popupStyle}
        >
          {children}
        </div>
      </CSSTransition>
    </>
  );
});

Popup.displayName = 'Popup';

Popup.defaultProps = {
  destroy: true,
  visible: false,
  lockScroll: true,
  animationDuration: 300,
  mask: true,
  direction: 'bottom',
  animationType: 'fade',
};

export default Popup;
