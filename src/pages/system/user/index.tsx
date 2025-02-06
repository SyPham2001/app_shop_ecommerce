// react
import { NextPage } from 'next'
import { ReactNode } from 'react'
import { PERMISSIONS } from 'src/configs/permission'
import BlankLayout from 'src/views/layouts/BlankLayout'
import LayoutNotApp from 'src/views/layouts/LayoutNotApp'

import RegisterPage from 'src/views/pages/register'

// view

type TProps = {}

const User: NextPage<TProps> = () => {
  return <h1>User</h1>
}
User.permission = [PERMISSIONS.SYSTEM.USER.VIEW]

export default User

// ManageSystem.guestGuard = true
