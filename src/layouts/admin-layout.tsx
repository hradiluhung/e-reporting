import React from "react"

type Props = {
  title: string
  subtitle: string
  mainAction: React.ReactNode
  configurationAction?: React.ReactNode
  children: React.ReactNode
}

export default function AdminLayout({
  title,
  subtitle,
  mainAction,
  configurationAction,
  children,
}: Props) {
  return (
    <div className="w-full px-4 py-4 md:px-8 lg:px-20 lg:py-4">
      <div className="flex flex-col items-start gap-8">
        <div className="flex gap-6 justify-between w-full flex-col lg:flex-row lg:items-center">
          <div className="text-start">
            <h1 className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-primary-100 to-secondary-50">
              {title}
            </h1>
            <p className="text-base">{subtitle}</p>
          </div>
          <div>{mainAction}</div>
        </div>
        {configurationAction && configurationAction}
        <div className="w-full">{children}</div>
      </div>
    </div>
  )
}
