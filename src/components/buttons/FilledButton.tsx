import React from "react"
import { Icon, Loader } from "react-feather"
import { WidgetTypes } from "../../constants/button-types"

type Props = {
  text?: string
  ButtonIcon?: Icon
  onClick?: (() => void) | ((e: React.MouseEvent<HTMLButtonElement>) => void)
  type?: WidgetTypes
  isLoading?: boolean
  isDisabled?: boolean
  isSubmit?: boolean
}

export default function FilledButton({
  text,
  ButtonIcon,
  onClick,
  type = WidgetTypes.PRIMARY,
  isLoading = false,
  isDisabled = false,
  isSubmit = false,
}: Props) {
  return (
    <button
      onClick={onClick}
      type={isSubmit ? "submit" : "button"}
      disabled={isDisabled}
      className={`flex gap-2 px-6 py-3 rounded-full font-semibold text-neutral-0 transition-all justify-center duration-500 disabled:bg-neutral-10 disabled:border disabled:border-neutral-300 disabled:text-neutral-50 disabled:bg-none ${
        type === WidgetTypes.PRIMARY
          ? "bg-gradient-to-tl from-primary-100 via-primary-100 to-primary-50 bg-size-200 bg-pos-0 hover:bg-pos-100"
          : type === WidgetTypes.SECONDARY || type === WidgetTypes.TERTIARY
          ? "bg-neutral-5 text-primary-100 hover:bg-neutral-10"
          : ""
      }`}
    >
      {isLoading ? (
        <>
          <div className="w-5 h-5">
            <Loader className="animate-spin" />
          </div>
          <p>{text}</p>
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
