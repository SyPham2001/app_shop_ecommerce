// ** import Next
import Image from 'next/image'
import { NextPage } from 'next'

//Mui
import { Box, Button, Grid, useTheme } from '@mui/material'

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

import { deleteRoleAsync, getAllRolesAsync, updateRoleAsync } from 'src/stores/role/actions'
import CustomDataGrid from 'src/components/custom-data-grid'
import { GridColDef, GridRowClassNameParams, GridSortModel } from '@mui/x-data-grid'
import { PAGE_SIZE_OPTION } from 'src/configs/gridConfig'
import GridEdit from 'src/components/grid-edit'
import GridDelete from 'src/components/grid-delete'
import InputSearch from 'src/components/input-search'
import GridCreate from 'src/components/grid-create'
import CreateEditRole from './components/CreateEditRole'
import Spinner from 'src/components/spinner'
import ConfirmationDialog from 'src/components/confirmation-dialog'
import IconifyIcon from 'src/components/Icon'
import { OBJECT_TYPE_ERROR_ROLE } from 'src/configs/role'
import TablePermission from './components/TablePermission'
import { deleteRole, getDetailsRole } from 'src/services/role'
import { hexToRGBA } from 'src/utils/hex-to-rgba'
import { getAllValueOfObject } from 'src/utils'
import { PERMISSIONS } from 'src/configs/permission'
import { usePermission } from 'src/hooks/usePermission'

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
  const [permissionSelected, setPermissionSelected] = useState<string[]>([])
  const [selectedRow, setSelectedRow] = useState({
    id: '',
    name: ''
  })
  const [isDisablePermission, setIsDisabledPermission] = useState(false)

  //PERMISSIONS
  const { VIEW, CREATE, UPDATE, DELETE } = usePermission('SYSTEM.ROLE', ['CREATE', 'VIEW', 'UPDATE', 'DELETE'])

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
    messageErrorDelete,
    typeError
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

  const handleUpdateRole = () => {
    dispatch(updateRoleAsync({ name: selectedRow.name, id: selectedRow.id, permissions: permissionSelected }))
  }

  const handleCloseConfirmDeleteRole = () => {
    setOpenDeleteRole({
      open: false,
      id: ''
    })
  }

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
  const handleDeleteRole = () => {
    dispatch(deleteRoleAsync(openDeleteRole.id))
  }

  const fetchDeleteRole = async (id: string) => {
    const res = await deleteRole(id)
    return res?.data
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
            {!row?.permissions?.some((per: string) => ['ADMIN.GRANTED', 'BASIC.PUBLIC']?.includes(per)) ? (
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

  //fetch api
  const handleGetDetailsRole = async (id: string) => {
    setLoading(true)
    await getDetailsRole(id)
      .then(res => {
        if (res?.data) {
          if (res?.data.permissions.includes(PERMISSIONS.ADMIN)) {
            setIsDisabledPermission(true)
            setPermissionSelected(getAllValueOfObject(PERMISSIONS, [PERMISSIONS.ADMIN, PERMISSIONS.BASIC]))
          } else if (res?.data.permissions.includes(PERMISSIONS.BASIC)) {
            setIsDisabledPermission(true)
            setPermissionSelected((PERMISSIONS as any)?.DASHBOARD)
          } else {
            setIsDisabledPermission(false)
            setPermissionSelected(res?.data?.permissions || [])
          }
        }
        setLoading(false)
      })
      .catch(e => {
        setLoading(false)
      })
  }

  useEffect(() => {
    handleGetListRoles()
  }, [sortBy, searchBy])

  useEffect(() => {
    if (selectedRow.id) {
      handleGetDetailsRole(selectedRow.id)
    }
  }, [selectedRow])

  useEffect(() => {
    if (isSuccessCreateEdit) {
      if (!openCreateEdit.id) {
        toast.success(t('Create_role_success'))
      } else {
        toast.success(t('Update_role_success'))
      }
      handleGetListRoles()
      handleCloseCreateEdit()
      dispatch(resetInitialState())
    } else if (isErrorCreateEdit && messageErrorCreateEdit && typeError) {
      const errorConfig = OBJECT_TYPE_ERROR_ROLE[typeError]
      if (errorConfig) {
        toast.error(t(errorConfig))
      } else {
        if (openCreateEdit.id) {
          toast.error(t('Update_role_error'))
        } else {
          toast.error(t('Create_role_error'))
        }
      }

      dispatch(resetInitialState())
    }
  }, [isSuccessCreateEdit, isErrorCreateEdit, messageErrorCreateEdit])

  useEffect(() => {
    if (isSuccessDelete) {
      toast.success(t('Delete_role_success'))
      handleGetListRoles()
      dispatch(resetInitialState())
      handleCloseConfirmDeleteRole()
    } else if (isErrorDelete && messageErrorDelete) {
      toast.error(t('Delete_role_error'))
      dispatch(resetInitialState())
    }
  }, [isSuccessDelete, isErrorDelete, messageErrorDelete])

  return (
    <>
      {loading && <Spinner />}
      <ConfirmationDialog
        open={openDeleteRole.open}
        handleClose={handleCloseConfirmDeleteRole}
        handleCancel={handleCloseConfirmDeleteRole}
        handleConfirm={handleDeleteRole}
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
          <Grid item md={4} xs={12}>
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
                sx={{
                  '.row-selected': {
                    backgroundColor: `${hexToRGBA(theme.palette.primary.main, 0.08)} !important`,
                    color: `${theme.palette.primary.main} !important`
                  }
                }}
                getRowClassName={(row: GridRowClassNameParams) => {
                  return row.id === selectedRow.id ? 'row-selected' : ''
                }}
                sortingOrder={['desc', 'asc']}
                sortingMode='server'
                onSortModelChange={handleSort}
                columns={columns}
                pageSizeOptions={[5]}
                getRowId={row => row._id}
                disableRowSelectionOnClick
                // slots={{
                //   // pagination: PaginationComponent
                // }}
                onRowClick={row => {
                  setSelectedRow({ id: String(row.id), name: row?.row?.name })
                  // setOpenCreateEdit({
                  //   open: false,
                  //   id: String(row.id)
                  // })
                }}
                disableColumnFilter
                disableColumnMenu
              />
            </Box>
          </Grid>
          <Grid
            item
            md={8}
            xs={12}
            sx={{ maxHeight: '100%' }}
            paddingLeft={{ md: '40px', xs: '0' }}
            paddingTop={{ md: '0px', xs: '20px' }}
          >
            {selectedRow?.id && (
              <>
                <Box sx={{ height: 'calc(100% - 40px)' }}>
                  <TablePermission
                    setPermissionSelected={setPermissionSelected}
                    permissionSelected={permissionSelected}
                    disabled={isDisablePermission}
                  />
                </Box>
              </>
            )}
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
              <Button disabled={isDisablePermission} variant='contained' sx={{ mt: 3 }} onClick={handleUpdateRole}>
                {t('Update')}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default RoleListPage
