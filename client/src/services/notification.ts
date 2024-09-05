import { toast } from "react-toastify";

const notification = {
  info: (message: string) =>
    toast.info(message, {
      position: "top-center",
      theme: "dark",
    }),

  success: (message: string) => {
    toast.success(message, {
        position: "top-center",
        theme: "dark",
    });
  },

  warning: (message: string) =>
    toast.warn(message, {
        position: "top-center",
        theme: "dark",
    }),

  error: (message: string) =>
    toast.error(message, {
        position: "top-center",
        theme: "dark",
    }),
};

export default notification;
