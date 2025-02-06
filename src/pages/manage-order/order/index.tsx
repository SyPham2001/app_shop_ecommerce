// react
import { NextPage } from 'next'
import { ReactNode } from 'react'
import { PERMISSIONS } from 'src/configs/permission'
import BlankLayout from 'src/views/layouts/BlankLayout'
import LayoutNotApp from 'src/views/layouts/LayoutNotApp'

import RegisterPage from 'src/views/pages/register'

// view

type TProps = {} 

const Order: NextPage<TProps> = () => {
  return <h1>Order</h1>
}
Order.permission = [PERMISSIONS.MANAGE_ORDER.ORDER.VIEW]

export default Order

// ManageSystem.guestGuard = true
