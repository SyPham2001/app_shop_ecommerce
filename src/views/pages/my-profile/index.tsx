// ** import Next
import Image from 'next/image'
import { NextPage } from 'next'

//Mui
import {
  Avatar,
  Box,
  Button,
  Card,
  CssBaseline,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Typography,
  useTheme
} from '@mui/material'

// form
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// components
import Icon from 'src/components/Icon'
import CustomTextField from 'src/components/text-field'

// config
import { EMAIL_REG, PASSWORD_REG } from 'src/configs/regex'
import { useState } from 'react'

// Image
import RegisterDark from '../../../../public/images/register-dark.png'
import RegisterLight from '../../../../public/images/register-light.png'
import IconifyIcon from 'src/components/Icon'
import { useTranslation } from 'react-i18next'
import WrapperFileUpload from 'src/components/wrapper-file-upload'
import { useAuth } from 'src/hooks/useAuth'

type TProps = {}

type TDefaultValue = {
  email: string
  address: string
  city: string
  phoneNumber: string
  role: string
  fullName: string
}

const MyProfilePage: NextPage<TProps> = () => {
  // State
  const [loading, setLoading] = useState(false)
  const [avatar, setAvatar] = useState('')
  const [optionRoles, setOptionRoles] = useState<{ label: string; value: string }[]>([])
  const [isDisabledRole, setIsDisabledRole] = useState(false)
  const [optionCities, setOptionCities] = useState<{ label: string; value: string }[]>([])
  const { user } = useAuth()

  //theme
  const theme = useTheme()

  //translate
  const { t } = useTranslation()

  const schema = yup.object({
    email: yup.string().required('the field is required').matches(EMAIL_REG, 'the email is must email type'),
    fullName: yup.string().notRequired(),
    phoneNumber: yup.string().required(t('Required_field')).min(9, 'The phone number is min 9 number'),
    role: isDisabledRole ? yup.string().notRequired() : yup.string().required(t('Required_field')),
    city: yup.string().notRequired(),
    address: yup.string().notRequired()
  })

  const defaultValues: TDefaultValue = {
    email: '',
    address: '',
    city: '',
    phoneNumber: '',
    role: '',
    fullName: ''
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: any) => {
    console.log('data', data)
  }
  const handleUploadAvatar = (file: File) => {}

  return (
    <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid
          container
          item
          md={6}
          xs={12}
          sx={{ backgroundColor: theme.palette.background.paper, borderRadius: '15px', py: 5, px: 4 }}
        >
          <Box
            sx={{
              height: '100%',
              width: '100%'
            }}
          >
            <Grid container spacing={4}>
              <Grid item md={12} xs={12}>
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    gap: 2
                  }}
                >
                  <Avatar sx={{ width: 100, height: 100 }}>
                    {/* {user?.avatar ? (
                  <Image
                    src={user?.avatar || ''}
                    alt='avatar'
                    style={{
                      height: 'auto',
                      width: 'auto'
                    }}
                  />
                ) : ( */}
                    <IconifyIcon icon='ph:user-thin' />
                    {/* )} */}
                  </Avatar>
                  <WrapperFileUpload
                    uploadFunc={handleUploadAvatar}
                    objectAcceptFile={{
                      'image/jpeg': ['.jpg', '.jpeg'],
                      'image/png': ['.png']
                    }}
                  >
                    <Button variant='outlined' sx={{ width: 'auto', display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Icon icon='ph:camera-thin'></Icon>
                      {avatar ? t('Change_avatar') : t('Upload_avatar')}
                    </Button>
                  </WrapperFileUpload>
                </Box>
              </Grid>
              <Grid item md={6} xs={12}>
                <Controller
                  control={control}
                  rules={{
                    required: true
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextField
                      required
                      fullWidth
                      label={t('Email')}
                      onChange={onChange}
                      value={value}
                      onBlur={onBlur}
                      error={Boolean(errors?.email)}
                      placeholder={t('Enter_your_email')}
                      helperText={errors?.email?.message}
                    />
                  )}
                  name='email'
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <Controller
                  control={control}
                  rules={{
                    required: true
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextField
                      required
                      autoFocus
                      fullWidth
                      disabled
                      label={t('Role')}
                      onChange={onChange}
                      value={value}
                      onBlur={onBlur}
                      error={Boolean(errors?.role)}
                      placeholder={t('Enter_your_role')}
                      helperText={errors?.role?.message}
                    />
                  )}
                  name='role'
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid container item md={6} xs={12} mt={{ md: 0, xs: 5 }}>
          <Box
            sx={{
              height: '100%',
              width: '100%',
              backgroundColor: theme.palette.background.paper,
              borderRadius: '15px',
              py: 5,
              px: 4
            }}
            marginLeft={{
              md: 5,
              xs: 0
            }}
          >
            <Grid container spacing={4}>
              <Grid item md={6} xs={12}>
                <Controller
                  control={control}
                  rules={{
                    required: true
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextField
                      fullWidth
                      label={t('Full_name')}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      placeholder={t('Enter_your_full_name')}
                    />
                  )}
                  name='fullName'
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextField
                      fullWidth
                      label={t('Address')}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      placeholder={t('Enter_your_address')}
                    />
                  )}
                  name='address'
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextField
                      fullWidth
                      onChange={onChange}
                      label={t('City')}
                      onBlur={onBlur}
                      value={value}
                      placeholder={t('Enter_your_city')}
                    />
                  )}
                  name='city'
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextField
                      fullWidth
                      label={t('Phone_number')}
                      onChange={onChange}
                      value={value}
                      onBlur={onBlur}
                      error={Boolean(errors?.phoneNumber)}
                      placeholder={t('Enter_your_phone')}
                      helperText={errors?.phoneNumber?.message}
                    />
                  )}
                  name='phoneNumber'
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'flex-end' }}>
        <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2 }}>
          {t('Update')}
        </Button>
      </Box>
    </form>
  )
}

export default MyProfilePage
