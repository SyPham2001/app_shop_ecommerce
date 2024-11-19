//**React */
import React from 'react'

//** Mui Import */
import { IconButton } from '@mui/material'

//**Components */
import IconifyIcon from 'src/components/Icon'

//**Hooks */
import { useSettings } from 'src/hooks/useSettings'

//**Types */
import { Mode } from 'src/types/layouts'

type TProps = {}

const ModeToggle = (props: TProps) => {
  const { settings, saveSettings } = useSettings()

  const handleModeChange = (mode: Mode) => {
    saveSettings({ ...settings, mode })
  }
  const handleToggleMode = () => {
    if (settings.mode === 'dark') {
      handleModeChange('light')
    } else {
      handleModeChange('dark')
    }
  }
  return (
    <IconButton color='inherit' onClick={handleToggleMode}>
      <IconifyIcon icon={settings.mode === 'light' ? 'material-symbols:dark-mode-outline' : 'iconamoon:mode-light'} />
    </IconButton>
  )
}

export default ModeToggle
