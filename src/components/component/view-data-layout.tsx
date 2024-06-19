import React from 'react'
import ViewDataSideBar from './view-data-side-bar'
import ViewDataAppBar from './view-data-app-bar'

export default function ViewDataLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>)  {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <ViewDataSideBar />
      <div className="flex flex-col">
        <ViewDataAppBar />
        {children}
      </div>
    </div>
  )
}
