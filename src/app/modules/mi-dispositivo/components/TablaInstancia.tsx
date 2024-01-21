import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Checkbox, TextField, Typography } from "@mui/material";
import TableSortLabel from '@mui/material/TableSortLabel';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { visuallyHidden } from '@mui/utils';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from "sweetalert2";
import { useMiDispositivo } from "../services/useMiDispositivo";



const tableStyling = {
  //padding: "0px 0px",
  backgroundColor: '#F2F2F2',
  padding: '0.8%',
  fontSize: '10px',
  borderRight: "1px solid #A7A7A7",
  borderBottom: "1px solid #A7A7A7",
  //borderRight: "2px solid black",

};

const rowStyle = {
  borderRight: "1px solid #A7A7A7",
  borderBottom: "1px solid #A7A7A7",
  padding: '0px', margin: '0px',
  paddingLeft: '10px',
  fontFamily: 'Times New Roman',
}

function TablePaginationActions(props: any) {

  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;


  const handleFirstPageButtonClick = (event: any) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: any) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: any) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: any) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

function descendingComparator(a: any, b: any, orderBy: any) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order: any, orderBy: any) {
  // console.log("order orderBy", order, orderBy)
  return order === 'asc'
    ? (a: any, b: any) => descendingComparator(a, b, orderBy)
    : (a: any, b: any) => -descendingComparator(a, b, orderBy);
}

function stableSort(array: any, comparator: any) {

  //console.log("step 3 ", array, comparator)
  const stabilizedThis = array.map((el: any, index: any) => [el, index]);
  stabilizedThis.sort((a: any, b: any) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el: any) => el[0]);
}


//const DEFAULT_ORDER = 'asc';
const DEFAULT_ORDER = 'desc';
//const rows = 'calories';
const DEFAULT_ORDER_BY = 'ID_USUARIO';
const DEFAULT_ROWS_PER_PAGE = 5;

const EnhancedTableHead = (props: any) => {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;

  const createSortHandler = (property: any) => (event: any) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead style={{
    }}>
      <TableRow sx={{

        "& th": {
          fontSize: "12px",

        }
      }} >
        <TableCell
          sx={{
            ...tableStyling,
            width: '4%'

          }}
          align="left"
        >
          Nombre instancia
          <TableSortLabel
            active={orderBy === "ID_USUARIO"}
            direction={orderBy === "ID_USUARIO" ? order : 'asc'}
            onClick={createSortHandler("ID_USUARIO")}
          >
            {orderBy === "ID_USUARIO" ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>

        <TableCell sx={{ ...tableStyling, width: '3%', minWidth: '60px', borderLeft: "1px solid white", wordBreak: 'normal' }} align="left">
          Conectado ?
          <TableSortLabel
            active={orderBy === "NOMBRE"}
            direction={orderBy === "NOMBRE" ? order : 'asc'}
            onClick={createSortHandler("NOMBRE")}
          >

            {orderBy === "NOMBRE" ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>


        <TableCell sx={{ ...tableStyling, width: '3%', minWidth: '60px', borderLeft: "1px solid white", wordBreak: 'normal' }} align="left">
          User id
          <TableSortLabel
            active={orderBy === "NOMBRE"}
            direction={orderBy === "NOMBRE" ? order : 'asc'}
            onClick={createSortHandler("NOMBRE")}
          >
            {/*headCell.label*/}
            {orderBy === "NOMBRE" ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>
        <TableCell sx={{ ...tableStyling, width: '2%', wordBreak: 'normal' }} align="left">
          Opciones
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};



export default function TablaContacto(props: any) {

  const { loadApiDeleteInstance } = useMiDispositivo();
  const { tableData,
    handleChangeControlReload } = props;

  const [order, setOrder] = React.useState(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = React.useState(DEFAULT_ORDER_BY);
  const [selected, setSelected] = React.useState<any>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS_PER_PAGE);
  const [rows, setRows] = React.useState([]);
  React.useEffect(() => {
    if (tableData) setRows(tableData);
  }, [tableData]);

  const handleRequestSort = (event: any, property: any) => {
    const isAsc = orderBy === property && order === "desc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: any) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n: any) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const eliminarInstancia = async (instance_key: any) => {

    if (!instance_key)
      return
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres eliminar esto?',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',


    })

    if (result?.isConfirmed) {
      const response = await loadApiDeleteInstance(instance_key);
      handleChangeControlReload();

    }


  }


  return (
    <div>

      <TableContainer
        sx={{
          margin: '0px', padding: '0px', marginTop: '5px'
        }}
      >
        <Table sx={{ tableLayout: "auto", minWidth: '750px' }}>
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}

          />

          <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any, index: any) => {

                return (
                  <TableRow key={index}>

                    <TableCell
                      sx={{
                     ...rowStyle
                      }}
                      align="left"
                    >
                      {row.instance_key}
                    </TableCell>
                    <TableCell
                      sx={{
                        ...rowStyle
                         }}
                      align="left"
                    >
                      {row.phone_connected ? "true" : "false"}
                    </TableCell>

                    <TableCell
                      sx={{
                        ...rowStyle
                         }}
                      align="left"
                    >
                      {row.user?.id}
                    </TableCell>
                    <TableCell
                    sx={{
                      ...rowStyle
                       }}

                      align="left"
                    >
                      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',background:'white' }}>
                        <>
                          <Button
                            onClick={() => eliminarInstancia(row.instance_key)}
                          ><DeleteIcon

                              sx={{ color: 'black' }} />
                          </Button>
                        </>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}

          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'Todos', value: rows.length }]}
                colSpan={12}
                //colSpan={6}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                labelRowsPerPage={"Filas por página"}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'Filas por página',
                  },
                  native: true,
                }}

                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}

              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      <br />
    </div>


  );
}
