import React, { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import './PopupWrapper.css';

interface Props {
  children?: ReactNode;
  shown: boolean;
  onClose: VoidFunction;
}
export const PopupWrapper = ({ children, shown, onClose }: Props) => {
  useEffect(() => {
    if (shown) {
      document.documentElement.classList.add('--prevent-scroll');
    }
    return () => {
      document.documentElement.classList.remove('--prevent-scroll');
    };
  }, [shown]);

  useEffect(() => {
    const documentKeydownListener = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', documentKeydownListener);
    return () => {
      document.removeEventListener('keydown', documentKeydownListener);
    };
  }, [onClose]);

  return createPortal(
    <CSSTransition
      in={shown}
      mountOnEnter={true}
      unmountOnExit={true}
      timeout={300}
      classNames="popup-wrapper-animation"
    >
      <div className="popup-wrapper" onClick={onClose}>
        <div
          className="popup-wrapper__children"
          onKeyDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </CSSTransition>,
    document.getElementById('overlay') as HTMLElement
  );
};
