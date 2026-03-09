"use client";

import { forwardRef, type ComponentProps } from "react";

/**
 * Drop-in <form> replacement that submits on Cmd/Ctrl+Enter.
 */
const Form = forwardRef<HTMLFormElement, ComponentProps<"form">>(
  ({ onKeyDown, ...props }, ref) => {
    function handleKeyDown(e: React.KeyboardEvent<HTMLFormElement>) {
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        e.currentTarget.requestSubmit();
      }
      onKeyDown?.(e);
    }

    return <form ref={ref} onKeyDown={handleKeyDown} {...props} />;
  }
);
Form.displayName = "Form";

export { Form };
