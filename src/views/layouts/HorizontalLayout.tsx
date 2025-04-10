// react
import * as React from 'react'

// next
import { NextPage } from 'next'

// mui
import { styled } from '@mui/material/styles'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Badge from '@mui/material/Badge'
import { Button, IconButton } from '@mui/material'

// component
import IconifyIcon from 'src/components/Icon'
import ModeToggle from './components/mode-toggle'
import UserDropDown from './components/user-dropdown'
import LanguageDropDown from './components/language-dropdown'
import { useAuth } from 'src/hooks/useAuth'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { ROUTE_CONFIG } from 'src/configs/route'

const drawerWidth: number = 240

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

type TProps = {
  open: boolean
  toggleDrawer: () => void
  isHideMenu?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor:
    theme.palette.mode === 'light' ? theme.palette.customColors.lightPaperBg : theme.palette.customColors.darkPaperBg,
  color: theme.palette.primary.main,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

const HorizontalLayout: NextPage<TProps> = ({ open, toggleDrawer, isHideMenu }) => {
  const { user } = useAuth()

  const router = useRouter()

  const { t } = useTranslation()

  const handleNavigateLogin = () => {
    if (router.asPath !== '/') {
      router.replace({
        pathname: '/login',
        query: { returnUrl: router.asPath }
      })
    } else {
      router.replace('/login')
    }
  }

  return (
    <AppBar position='absolute' open={open}>
      <Toolbar
        sx={{
          pr: '30px',
          margin: '0 20px'
        }}
      >
        {!isHideMenu && (
          <IconButton
            edge='start'
            color='inherit'
            aria-label='open drawer'
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              padding: '10px',
              ...(open && { display: 'none' })
            }}
          >
            <IconifyIcon icon='ic:outline-menu' />
          </IconButton>
        )}

<Typography
          component='h1'
          variant='h6'
          color='primary'
          noWrap
          sx={{ flexGrow: 1, fontWeight: '600', cursor: 'pointer' }}
        >
          <Link style={{ color: 'inherit' }} href={ROUTE_CONFIG.HOME}>
            {t('Home Page')}
          </Link>
        </Typography>
        <LanguageDropDown />
        <ModeToggle />
        {user ? (
          <UserDropDown />
        ) : (
          <Button variant='contained' sx={{ ml: 2, width: 'auto' }} onClick={handleNavigateLogin}>
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default HorizontalLayout
