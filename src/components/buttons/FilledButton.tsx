import React from "react"
import { Icon, Loader } from "react-feather"
import { ButtonTypes } from "./button-types"

type Props = {
  text?: string
  ButtonIcon?: Icon
  onClick?: (() => void) | ((e: React.MouseEvent<HTMLButtonElement>) => void)
  type?: ButtonTypes
  isLoading?: boolean
  isDisabled?: boolean
  isSubmit?: boolean
}

export default function FilledButton({
  text,
  ButtonIcon,
  onClick,
  type = ButtonTypes.PRIMARY,
  isLoading = false,
  isDisabled = false,
  isSubmit = false,
}: Props) {
  return (
    <button
      onClick={onClick}
      type={isSubmit ? "submit" : "button"}
      disabled={isDisabled}
      className={`flex gap-2 px-6 py-2 rounded-full font-semibold text-neutral-0 transition-all duration-500 ${
        type === ButtonTypes.PRIMARY
          ? "bg-gradient-to-tl from-primary-100 via-primary-100 to-primary-50 bg-size-200 bg-pos-0 hover:bg-pos-100"
          : type === ButtonTypes.SECONDARY || type === ButtonTypes.TERTIARY
          ? "bg-neutral-5 text-primary-100"
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
