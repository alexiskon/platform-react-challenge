import React, { useEffect, useRef } from "react";
import { Toast } from 'primereact/toast';
import { ErrorToastProps } from "./ErrorToast.types";

const GeneralToast: React.FC<ErrorToastProps> = ({ message }) => {
    
  const toast = useRef<Toast>(null);

  useEffect(() => {
    if (message) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: message,
        life: 3000,
      });
    }
  }, [message]);

  return <Toast ref={toast} />;
};

export default GeneralToast;