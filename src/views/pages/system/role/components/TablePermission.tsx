import * as React from 'react'
import Box from '@mui/material/Box'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import CustomDataGrid from 'src/components/custom-data-grid'
import { useSelector } from 'react-redux'
import { RootState } from 'src/stores'

const TablePermission = () => {
  //Redux
  const { roles } = useSelector((state: RootState) => state.role)

  return (
    <h1>Aaaa</h1>
    // <Box sx={{ height: 400, width: '100%' }}>
    //   <CustomDataGrid
    //     rows={rows}
    //     columns={columns}
    //     initialState={{
    //       pagination: {
    //         paginationModel: {
    //           pageSize: 5
    //         }
    //       }
    //     }}
    //     pageSizeOptions={[5]}
    //     checkboxSelection
    //     disableRowSelectionOnClick
    //   />
    // </Box>
  )
}
export default TablePermission
