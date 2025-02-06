// react
import { NextPage } from 'next'
import { PERMISSIONS } from 'src/configs/permission'

//page
import RoleListPage from 'src/views/pages/system/role/RoleList'

// view

type TProps = {}

const Role: NextPage<TProps> = () => {
  return <RoleListPage/>
}

Role.permission = [PERMISSIONS.SYSTEM.ROLE.VIEW]
export default Role

// ManageSystem.guestGuard = true
