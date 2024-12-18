// ** React
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

//React hook form
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
// ** Mui
import { Box } from '@mui/material'
import CustomModal from 'src/components/custom-modal'
import { useTheme } from '@mui/material'
import { Button } from '@mui/material'
import CustomTextField from 'src/components/text-field'
import { Typography } from '@mui/material'
import IconifyIcon from 'src/components/Icon'
import { IconButton } from '@mui/material'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/stores'
import { createRoleAsync, updateRoleAsync } from 'src/stores/role/actions'
import Spinner from 'src/components/spinner'
import { getDetailsRole } from 'src/services/role'

interface TCreateEditRole {
  open: boolean
  onClose: () => void
  idRole?: string
  // sortBy: string
  // searchBy: string
}

const CreateEditRole = (props: TCreateEditRole) => {
  const { t } = useTranslation()
  //state
  const [loading, setLoading] = useState(false)

  const { open, onClose, idRole } = props

  const theme = useTheme()

  const dispatch: AppDispatch = useDispatch()

  const schema = yup.object().shape({
    name: yup.string().required(t('Required_field'))
  })

  const defaultValues = {
    name: ''
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: { name: string }) => {
    if (!Object.keys(errors).length) {
      if (idRole) {
        // update
        dispatch(updateRoleAsync({ name: data?.name, id: idRole }))
      } else {
        dispatch(createRoleAsync({ name: data?.name }))
      }
    }
  }
  //fetch
  const fetchDetailsRole = async (id: string) => {
    setLoading(true)
    const res = await getDetailsRole(id)
    const data = res.data
    if (data) {
      reset({
        name: data?.name
      })
    }
  }

  useEffect(() => {
    if (!open) {
      reset({
        name: ''
      })
    } else if (idRole) {
      fetchDetailsRole(idRole)
    }
  }, [open, idRole])

  return (
    <>
      <CustomModal open={open} onClose={onClose}>
        <Box
          sx={{ padding: '20px', borderRadius: '15px', backgroundColor: theme.palette.customColors.bodyBg }}
          minWidth={{ md: '400px', xs: '80vw' }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', position: 'relative', paddingBottom: '20px' }}>
            <Typography variant='h4' sx={{ fontWeight: 600 }}>
              {' '}
              {idRole ? t('Edit_role') : t('Create_role')}
            </Typography>
            <IconButton sx={{ position: 'absolute', top: '-4px', right: '-10px' }} onClick={onClose}>
              <IconifyIcon icon='material-symbols-light:close' fontSize={'30px'} />
            </IconButton>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate>
            <Box
              sx={{
                width: '100%',
                backgroundColor: theme.palette.background.paper,
                padding: '30px 20px',
                borderRadius: '15px'
              }}
            >
              <Controller
                control={control}
                rules={{
                  required: true
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomTextField
                    required
                    fullWidth
                    label={t('Name_role')}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder={t('Enter_name')}
                    error={Boolean(errors?.name)}
                    helperText={errors?.name?.message}
                  />
                )}
                name='name'
              />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2 }}>
                {!idRole ? t('Create') : t('Update')}
              </Button>
            </Box>
          </form>
        </Box>
      </CustomModal>
    </>
  )
}

export default CreateEditRole
