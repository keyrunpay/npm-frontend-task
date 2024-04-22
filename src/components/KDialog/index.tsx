"use client";
import React, { forwardRef, useRef } from "react";
import "./style.scss";

interface IProps {
  children: React.ReactNode;
  onClose: () => void;
}

export const useDialog = () => {
  const ref = useRef<HTMLDialogElement>(null);
  const onOpen = () => ref.current?.showModal();
  const onClose = () => ref.current?.close();
  return { ref, onOpen, onClose };
};

const KDialog = forwardRef<HTMLDialogElement, IProps>((props, ref) => {
  const { children, onClose } = props;
  return (
    <dialog onClose={onClose} onClick={onClose} ref={ref}>
      <div onClick={(e) => e.stopPropagation()}>
        {children}
        <button autoFocus onClick={onClose}>
          Close Modal
        </button>
      </div>
    </dialog>
  );
});

export default KDialog;
