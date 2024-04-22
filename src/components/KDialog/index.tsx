"use client";
import React, { forwardRef, useRef } from "react";
import "./style.scss";

interface IProps {
  children: React.ReactNode;
  size?: string;
  onClose: () => void;
}

export const useDialog = () => {
  const ref = useRef<HTMLDialogElement>(null);
  const onOpen = () => ref.current?.showModal();
  const onClose = () => ref.current?.close();
  return { ref, onOpen, onClose };
};

const KDialog = forwardRef<HTMLDialogElement, IProps>((props, ref) => {
  const { children, onClose, size = "fit-content" } = props;
  const _style = { "--size": size } as React.CSSProperties;

  return (
    <dialog style={_style} onClick={onClose} ref={ref}>
      <div className="dialog-wrapper" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </dialog>
  );
});

interface IHeaderProps {
  title: string;
  onClose: () => void;
}

export const KDialogHeader = (props: IHeaderProps) => {
  return (
    <div className="dialog-header">
      <h4>{props.title}</h4>
      <button className="unstyled" onClick={props.onClose}>
        <img src="/svg/close.svg" alt="" />
      </button>
    </div>
  );
};

interface IActionProps {
  children: React.ReactNode;
}
export const KDialogActions = (props: IActionProps) => {
  return <div className="dialog-actions">{props.children}</div>;
};

export default KDialog;
