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

export default function FilledButton({
  text,
  ButtonIcon,
  onClick,
  type = WidgetTypes.PRIMARY,
  size,
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
      className={`flex gap-2 rounded-full text-neutral-0 transition-all justify-center items-center duration-500 ${
        type === WidgetTypes.PRIMARY
          ? "bg-gradient-to-tl from-primary-100 via-primary-100 to-primary-50 bg-size-200 bg-pos-0 hover:bg-pos-100"
          : type === WidgetTypes.SECONDARY
          ? "bg-neutral-5 text-primary-100 hover:bg-neutral-10"
          : type === WidgetTypes.ERROR
          ? "bg-gradient-to-tl from-red-500 via-red-500 to-red-400 bg-size-200 bg-pos-0 hover:bg-pos-100"
          : ""
      } ${
        size === WidgetSizes.LARGE
          ? "px-6 py-3 font-semibold"
          : size === WidgetSizes.MEDIUM
          ? "px-4 py-2 font-semibold"
          : "px-3 py-1 text-sm font-normal"
      }`}
      title={tooltip ? tooltip : ""}
    >
      {isLoading ? (
        <>
          {text && <p>{text}</p>}
          <div>
            <Loader className="animate-spin w-4" />
          </div>
        </>
      ) : (
        <>
          {text && <p>{text}</p>}
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
