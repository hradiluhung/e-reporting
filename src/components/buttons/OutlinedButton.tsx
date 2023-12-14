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

export default function OutlinedButton({
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
      className={`flex gap-2 px-6 py-2 rounded-full font-semibold text-neutral-0 transition-all duration-500 border-2 ${
        type === WidgetTypes.PRIMARY
          ? "border-primary-100 hover:bg-primary-50 text-primary-100"
          : type === WidgetTypes.SECONDARY
          ? "border-secondary-100 hover:bg-secondary-50 text-secondary-100"
          : ""
      }`}
    >
      {isLoading ? (
        <div className="w-5 h-5">
          <Loader />
        </div>
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
