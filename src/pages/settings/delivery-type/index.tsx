// react
import { NextPage } from 'next'
import { ReactNode } from 'react'
import BlankLayout from 'src/views/layouts/BlankLayout'
import LayoutNotApp from 'src/views/layouts/LayoutNotApp'

import RegisterPage from 'src/views/pages/register'
import DeliveryTypeListPage from 'src/views/pages/settings/delivery-type/DeliveryTypeList'

// view

type TProps = {}

const Index: NextPage<TProps> = () => {
  return <DeliveryTypeListPage />
}

export default Index

// ManageSystem.guestGuard = true
