// react
import { NextPage } from 'next'
import { ReactNode } from 'react'
import BlankLayout from 'src/views/layouts/BlankLayout'
import LayoutNotApp from 'src/views/layouts/LayoutNotApp'
import MyProfilePage from 'src/views/pages/my-profile'

// view

type TProps = {}

const MyProfile: NextPage<TProps> = () => {
  return <MyProfilePage />
}
MyProfile.getLayout = (page: ReactNode) => <LayoutNotApp>{page}</LayoutNotApp>
export default MyProfile
