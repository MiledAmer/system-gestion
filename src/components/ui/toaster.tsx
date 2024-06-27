"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { CheckCircle, ShieldAlert, Info } from "lucide-react";

export function Toaster() {
  const { toasts } = useToast();
  const iconprovider = (icon: string) => {
    switch (icon) {
      case "verified":
        return <CheckCircle className="" />;
      case "error":
        return <ShieldAlert />;
      case "info":
        return <Info />;
      default:
        return "";
    }
  };
  return (
    <ToastProvider duration={3000}>
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        icon,
        ...props
      }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-2">
              {title && <ToastTitle>{title}</ToastTitle>}
              <div className="flex gap-2 items-center justify-start">
                {iconprovider(icon ? icon : "")}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
