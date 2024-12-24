// ** import Next
import Image from 'next/image'
import { NextPage } from 'next'

//Mui
import { Box, Grid, useTheme } from '@mui/material'

// form

// components

// config

import { useEffect, useState } from 'react'

// Image

import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from 'src/stores'
import toast from 'react-hot-toast'

import { useTranslation } from 'react-i18next'
import { resetInitialState } from 'src/stores/role'
import { useRouter } from 'next/router'

import { deleteRoleAsync, getAllRolesAsync } from 'src/stores/role/actions'
import TablePermission from './components/TablePermission'
import CustomDataGrid from 'src/components/custom-data-grid'
import { GridColDef, GridSortModel } from '@mui/x-data-grid'
import CustomPagination from 'src/components/custom-pagination'
import { PAGE_SIZE_OPTION } from 'src/configs/gridConfig'
import GridEdit from 'src/components/grid-edit'
import GridDelete from 'src/components/grid-delete'
import InputSearch from 'src/components/input-search'
import GridCreate from 'src/components/grid-create'
import CreateEditRole from './components/CreateEditRole'
import Spinner from 'src/components/spinner'
import ConfirmationDialog from 'src/components/confirmation-dialog'
import IconifyIcon from 'src/components/Icon'

type TProps = {}

const RoleListPage: NextPage<TProps> = () => {
  //state
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTION[0])
  const [openCreateEdit, setOpenCreateEdit] = useState({
    open: false,
    id: ''
  })
  const [openDeleteRole, setOpenDeleteRole] = useState({
    open: false,
    id: ''
  })
  const [sortBy, setSortBy] = useState('created asc')
  const [searchBy, setSearchBy] = useState('')
  const [loading, setLoading] = useState(false)

  //redux
  const dispatch: AppDispatch = useDispatch()
  const {
    roles,
    isSuccessCreateEdit,
    isErrorCreateEdit,
    isLoading,
    messageErrorCreateEdit,
    isErrorDelete,
    isSuccessDelete,
    messageErrorDelete
  } = useSelector((state: RootState) => state.role)

  //router
  const router = useRouter()

  //theme
  const theme = useTheme()

  //translate
  const { t } = useTranslation()

  const handleGetListRoles = () => {
    dispatch(getAllRolesAsync({ params: { limit: -1, page: -1, search: searchBy, order: sortBy } }))
  }

  const handleCloseConfirmDeleteRole = () => {
    setOpenDeleteRole({
      open: false,
      id: ''
    })
  }

  // const handleOnChangePagination = (page: number, pageSize: number) => {}

  const handleSort = (sort: GridSortModel) => {
    // const sortField = sort[0]
    const sortOption = sort[0]
    setSortBy(`${sortOption.field} ${sortOption.sort}`)
  }
  const handleCloseCreateEdit = () => {
    setOpenCreateEdit({
      open: false,
      id: ''
    })
  }

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: t('Name'),
      flex: 1
    },
    {
      field: 'action',
      headerName: t('Actions'),
      width: 150,
      sortable: false,
      align: 'left',
      renderCell: params => {
        const { row } = params
        return (
          <Box sx={{ width: '100%' }}>
            {!row?.permissions?.some((per : string) => ['ADMIN.GRANTED', 'BASIC.PUBLIC']?.includes(per)) ? (
              <>
                <GridEdit
                  onClick={() =>
                    setOpenCreateEdit({
                      open: true,
                      id: String(params.id)
                    })
                  }
                />
                <GridDelete
                  onClick={() =>
                    setOpenDeleteRole({
                      open: true,
                      id: String(params.id)
                    })
                  }
                />
              </>
            ) : (
              <IconifyIcon icon='material-symbols-light:lock-outline' fontSize={30} />
            )}
          </Box>
        )
      }
    }
  ]

  // const PaginationComponent = () => {
  //   return (
  //     <CustomPagination
  //       // onChangePagination={handleOnChangePagination}
  //       pageSizeOptions={PAGE_SIZE_OPTION}
  //       pageSize={pageSize}
  //       page={page}
  //       rowLength={roles.total}
  //     />
  //   )
  // }

  useEffect(() => {
    handleGetListRoles()
  }, [sortBy, searchBy])

  useEffect(() => {
    if (isSuccessCreateEdit) {
      if (openCreateEdit.id) {
        toast.success(t('update-role-success'))
      } else {
        toast.success(t('create-role-success'))
      }
      handleGetListRoles()
      handleCloseCreateEdit()
      dispatch(resetInitialState())
    } else if (isErrorCreateEdit && messageErrorCreateEdit) {
      toast.error(t(messageErrorCreateEdit))
      dispatch(resetInitialState())
    }
  }, [isSuccessCreateEdit, isErrorCreateEdit, messageErrorCreateEdit])

  useEffect(() => {
    if (isSuccessDelete) {
      toast.success(t('delete-role-success'))
      handleGetListRoles()
      dispatch(resetInitialState())
    } else if (isErrorDelete && messageErrorDelete) {
      toast.error(t(messageErrorDelete))
      dispatch(resetInitialState())
    }
  }, [isSuccessDelete, isErrorDelete, messageErrorDelete])

  return (
    <>
      <ConfirmationDialog
        open={openDeleteRole.open}
        handleClose={handleCloseConfirmDeleteRole}
        // handleCancel={handleCloseConfirmDeleteRole}
        // handleConfirm={handleDeleteRole}
        title={t('Title_delete_role')}
        description={t('Confirm_delete_role')}
      />
      <CreateEditRole open={openCreateEdit.open} onClose={handleCloseCreateEdit} idRole={openCreateEdit.id} />
      {isLoading && <Spinner />}
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          display: 'flex',
          alignItems: 'center',
          padding: '20px',
          height: '100%',
          width: '100%',
          borderRadius: '15px'
        }}
      >
        <Grid container sx={{ height: '100%', width: '100%' }}>
          <Grid item md={5} xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
              <Box sx={{ width: '200px' }}>
                <InputSearch value={searchBy} onChange={(value: string) => setSearchBy(value)} />
              </Box>
              <GridCreate
                onClick={() => {
                  setOpenCreateEdit({
                    open: true,
                    id: ''
                  })
                }}
              />
            </Box>
            <Box sx={{ maxHeight: '100%' }}>
              <CustomDataGrid
                autoHeight
                hideFooter
                rows={roles.data}
                sortingOrder={['desc', 'asc']}
                sortingMode='server'
                onSortModelChange={handleSort}
                columns={columns}
                pageSizeOptions={[5]}
                checkboxSelection
                getRowId={row => row._id}
                disableRowSelectionOnClick
                // slots={{
                //   // pagination: PaginationComponent
                // }}
                disableColumnFilter
                disableColumnMenu
              />
            </Box>
          </Grid>
          <Grid
            item
            md={7}
            xs={12}
            sx={{ maxHeight: '100%' }}
            paddingLeft={{ md: '40px', xs: '0' }}
            paddingTop={{ md: '0px', xs: '20px' }}
          >
            List Permission
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default RoleListPage
