import { WidgetTypes } from "@/constants/button-types"
import { toast } from "react-toastify"

export const showToast = (message: string, type: WidgetTypes) => {
  switch (type) {
    case WidgetTypes.SUCCESS:
      return toast.success(message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    case WidgetTypes.WARNING:
      return toast.warning(message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })

    case WidgetTypes.ERROR:
      return toast.error(message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    default:
      break
  }
}
