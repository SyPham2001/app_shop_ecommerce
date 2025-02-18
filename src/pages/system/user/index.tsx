// ** Import Next
import { NextPage } from 'next'

//** Config */
import { PERMISSIONS } from 'src/configs/permission'

//** Page */
import UserListPage from 'src/views/pages/system/user/UserList'

type TProps = {}

const User: NextPage<TProps> = () => {
  return <UserListPage />
}
User.permission = [PERMISSIONS.SYSTEM.USER.VIEW]

export default User

// ManageSystem.guestGuard = true
