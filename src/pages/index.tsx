'use client'
import { Box, Typography, useTheme } from '@mui/material'
import axios from 'axios'
import Head from 'next/head'
import { useEffect } from 'react'
import CustomTextField from 'src/components/text-field'
import { useSettings } from 'src/hooks/useSettings'

export default function Home() {
  const theme = useTheme()
  const { settings } = useSettings()
  // console.log('theme', { theme, settings })

  // const fetchApiUser = async () => {
  //   const response = await fetch('https://jsonplaceholder.typicode.com/users')
  //   const data = await response.json()
  //   console.log(data)
  // }
  // const fetchApiUser = async () => {
  //   await axios.get('http://localhost:3001/api/users?limit=10&page=1&order=created%20asc').then(res => {
  //     console.log('res')
  //   })
  // }
  // useEffect(() => {
  //   fetchApiUser()
  // }, [])
  return (
    <Box>
      <Head>
        <title>Ecommerce Shop</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1>Hello world!</h1>
      <Typography>Hello Word Update</Typography>
      <Box>
        <CustomTextField id='outlined-multiline-flexible' label='Multiline' />
      </Box>
    </Box>
  )
}
