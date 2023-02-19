import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Switch from "@mui/material/Switch";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";

import { EnhancedTableHead } from "./EnhancedTableHead";
import { EnhancedTableToolbar } from "./EnhancedTableToolbar";
import { Button } from "@mui/material";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

/// main table component
export default function TableComponent({
  headCells,
  rows,
  isChecked,
  tableName,
  action = null,
  setCheckedData,
  handleModalOpen,
}) {
  const [tableData, setTableData] = React.useState(rows);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchValue, setSearchValue] = React.useState("");
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = tableData.map((n) => n.id);
      setSelected(newSelected);
      setCheckedData(selected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableData.length) : 0;

  React.useEffect(() => {
    const value = searchValue.toLowerCase();
    console.log("search",value)
    if(value==="") {

      setTableData(rows)
    }else{
      const SearchedText = tableData.filter((data) => {
        const productValue = data.calories.toLowerCase();
        
        return value=== "" ?  rows : productValue.includes(value);
      });
  
      setTableData(SearchedText);
    }
 
  }, [searchValue,rows]);
  
  console.log(searchValue);
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 5 }}>
        {/* Table Name and button functionality */}
        <EnhancedTableToolbar
          numSelected={selected.length}
          tableName={tableName}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
        />
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table
            sx={{ minWidth: 550 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            {/* Heading Cells */}
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={tableData.length}
              headCells={headCells}
              isChecked={isChecked}
            />
            <TableBody>
              {stableSort(tableData, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <>
                      {isChecked ? (
                        <TableRow
                          hover
                          onClick={(event) => handleClick(event, row.id)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.id}
                          selected={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                            />
                          </TableCell>

                          {headCells.map((cellName, id) => {
                            return (
                              <>
                                <TableCell align="right" key={id}>
                                  {row[cellName.id]}
                                  {cellName.id === "action" &&
                                    action.isAction && (
                                      <Button
                                        variant="contained"
                                        size="small"
                                        onClick={() => handleModalOpen(row)}
                                      >
                                        {action.actionName}
                                      </Button>
                                    )}
                                </TableCell>
                              </>
                            );
                          })}
                        </TableRow>
                      ) : (
                        <TableRow hover key={row.id}>
                          {headCells.map((cellName, id) => {
                            return (
                              <TableCell align="right" key={id}>
                                {row[cellName.id]}
                                {cellName.id === "action" &&
                                  action.isAction && (
                                    <Button
                                      variant="contained"
                                      size="small"
                                      onClick={() => handleModalOpen(row)}
                                    >
                                      {action.actionName}
                                    </Button>
                                  )}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      )}
                    </>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={tableData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}
