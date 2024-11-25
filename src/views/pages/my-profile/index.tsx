// ** import Next
import Image from 'next/image'
import { NextPage } from 'next'

//Mui
import { Box, Button, CssBaseline, IconButton, InputAdornment, Link, Typography, useTheme } from '@mui/material'

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

type TProps = {}

type TDefaultValue = {
  email: string
  password: string
  confirmPassword: string
}

const MyProfilePage: NextPage<TProps> = () => {
  // state
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  //theme
  const theme = useTheme()

  const schema = yup.object({
    email: yup.string().required('the field is required').matches(EMAIL_REG, 'the email is must email type'),
    password: yup
      .string()
      .required('the field is required')
      .matches(PASSWORD_REG, 'the password is contain charactor,special charactor,number'),
    confirmPassword: yup
      .string()
      .required('the field is required')
      .matches(PASSWORD_REG, 'the password is contain charactor,special charactor,number')
      .oneOf([yup.ref('password'), ''], 'the confirm is must match with password')
  })

  const defaultValues: TDefaultValue = {
    email: '',
    password: '',
    confirmPassword: ''
  }

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: { email: string; password: string }) => {
    console.log('data', data)
  }

  return (
    <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ mt: 2, width: '300px' }}>
        <Controller
          control={control}
          rules={{
            required: true
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextField
              required
              fullWidth
              label='Email *'
              onChange={onChange}
              value={value}
              onBlur={onBlur}
              error={Boolean(errors?.email)}
              placeholder='input email'
              helperText={errors?.email?.message}
            />
          )}
          name='email'
        />
      </Box>
      <Box sx={{ mt: 2, width: '300px' }}>
        <Controller
          control={control}
          rules={{
            required: true
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextField
              required
              fullWidth
              label='Password *'
              onChange={onChange}
              value={value}
              onBlur={onBlur}
              error={Boolean(errors?.password)}
              placeholder='input password'
              helperText={errors?.password?.message}
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton edge='end' onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? (
                        <Icon icon='material-symbols:visibility-outline' />
                      ) : (
                        <Icon icon='material-symbols-light:visibility-off-outline' />
                      )}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          )}
          name='password'
        />
      </Box>

      <Box sx={{ mt: 2, width: '300px' }}>
        <Controller
          control={control}
          rules={{
            required: true
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextField
              required
              fullWidth
              label={'Confirm_password'}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              placeholder={'Enter_confirm_password'}
              error={Boolean(errors?.confirmPassword)}
              helperText={errors?.confirmPassword?.message}
              type={showConfirmPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton edge='end' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                      {showConfirmPassword ? (
                        <Icon icon='material-symbols:visibility-outline' />
                      ) : (
                        <Icon icon='ic:outline-visibility-off' />
                      )}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          )}
          name='confirmPassword'
        />
      </Box>

      <Button type='submit' fullWidth variant='contained' color='primary' sx={{ mt: 3, mb: 2 }}>
        Register
      </Button>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
        <Typography>{'You_have_account'}</Typography>
        <Link
          href='/login'
          style={{
            color: theme.palette.primary.main
          }}
        >
          {'Login'}
        </Link>
      </Box>
      <Typography sx={{ textAlign: 'center', mt: 2, mb: 2 }}>{'Or'}</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
        <IconButton sx={{ color: '#497ce2' }}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            role='img'
            fontSize='1.375rem'
            className='iconify iconify--mdi'
            width='1em'
            height='1em'
            viewBox='0 0 24 24'
          >
            <path
              fill='currentColor'
              d='M12 2.04c-5.5 0-10 4.49-10 10.02c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89c1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02Z'
            ></path>
          </svg>
        </IconButton>
        <IconButton sx={{ color: theme.palette.error.main }}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            role='img'
            fontSize='1.375rem'
            className='iconify iconify--mdi'
            width='1em'
            height='1em'
            viewBox='0 0 24 24'
          >
            <path
              fill='currentColor'
              d='M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27c3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10c5.35 0 9.25-3.67 9.25-9.09c0-1.15-.15-1.81-.15-1.81Z'
            ></path>
          </svg>
        </IconButton>
      </Box>
    </form>
  )
}

export default MyProfilePage
