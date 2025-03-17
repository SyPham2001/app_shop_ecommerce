// react
import { NextPage } from 'next'
import { ReactNode } from 'react'
import BlankLayout from 'src/views/layouts/BlankLayout'
import LayoutNotApp from 'src/views/layouts/LayoutNotApp'

import RegisterPage from 'src/views/pages/register'
import PaymentTypeListPage from 'src/views/pages/settings/payment-type/PaymentTypeList'

// view

type TProps = {}

const Index: NextPage<TProps> = () => {
  return <PaymentTypeListPage />
}

export default Index

// ManageSystem.guestGuard = true
