import React from "react"
import { Icon, Loader } from "react-feather"
import { WidgetSizes, WidgetTypes } from "../../constants/button-types"

type Props = {
  text?: string
  ButtonIcon?: Icon
  onClick?: (() => void) | ((e: React.MouseEvent<HTMLButtonElement>) => void)
  type?: WidgetTypes
  size: WidgetSizes
  isLoading?: boolean
  isDisabled?: boolean
  isSubmit?: boolean
  tooltip?: string
}

export default function OutlinedButton({
  text,
  ButtonIcon,
  onClick,
  size,
  type = WidgetTypes.PRIMARY,
  isLoading = false,
  isDisabled = false,
  isSubmit = false,
  tooltip,
}: Props) {
  return (
    <button
      onClick={onClick}
      type={isSubmit ? "submit" : "button"}
      disabled={isDisabled}
      className={`flex gap-2 justify-center rounded-full font-semibold transition-all items-center duration-500 border 
      ${
        size === WidgetSizes.LARGE
          ? "px-6 py-3 font-semibold"
          : size === WidgetSizes.MEDIUM
          ? "px-4 py-2 font-semibold"
          : "px-3 py-1 text-sm font-normal"
      }
      ${
        type === WidgetTypes.PRIMARY
          ? "border-primary-100 hover:bg-primary-100 hover:bg-opacity-20 text-primary-100"
          : type === WidgetTypes.SECONDARY
          ? "border-black hover:bg-black hover:bg-opacity-20 text-black"
          : type === WidgetTypes.ERROR
          ? "border-red-400 hover:bg-red-400 hover:bg-opacity-20 text-red-400"
          : ""
      }`}
      title={tooltip ? tooltip : ""}
    >
      {isLoading ? (
        <>
          <p>{text}</p>
          <div className="w-5 h-5">
            <Loader className="animate-spin w-4" />
          </div>
        </>
      ) : (
        <>
          {text}
          {ButtonIcon && (
            <div>
              <ButtonIcon className="w-4" />
            </div>
          )}
        </>
      )}
    </button>
  )
}
