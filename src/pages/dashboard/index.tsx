// react
import { NextPage } from 'next'
import { ReactNode } from 'react'
import BlankLayout from 'src/views/layouts/BlankLayout'
import LayoutNotApp from 'src/views/layouts/LayoutNotApp'

import RegisterPage from 'src/views/pages/register'

// view

type TProps = {}

const DashBoard: NextPage<TProps> = () => {
  return <RegisterPage />
}

export default DashBoard

// ManageSystem.guestGuard = true
