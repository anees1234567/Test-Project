import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import {  useEffect, useMemo, useState } from "react";

import { searchParamsType, studentformType,studentListType } from "../types";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CustomFormField } from "../../../uitilities/CustomComponents/Customformfields";
import CustomTableBody from "../../../uitilities/CustomComponents/CustomTableBody";
import { useMutation } from "react-query";
import debounce from "../../../uitilities/Debounce/Debounce";

// import TaskAltIcon from "@mui/icons-material/TaskAlt";
function StudentListPage(){
  const navigateTo = useNavigate();
  const {control}=useForm()
  const theme = useTheme();
 const [searchParams,setSearchParams]=useState<searchParamsType>({
    pageNumber:0,
    pageSize:10,
    filter:{
        searchText:""
    }
 })


  const handleSearch = (e:any) => {
    const {  value } = e.target;
    setSearchParams({
      ...searchParams,
      filter:{
        searchText:value
      },
    });
  };

const onChange = debounce(handleSearch, 500);


  const handleChangePage = (_: unknown, pageNumber: number) => {
    setSearchParams({
      ...searchParams,
      pageNumber,
    });
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const pageSize = parseInt(event.target.value, 10);
    setSearchParams({
      ...searchParams,
      pageSize,
    });
  };

  useEffect(() => {
    fetchList(searchParams)
  }, [searchParams]);
  return (
    <div className="px-3 pt-4">
      <Paper className="flex flex-col gap-2">
        <TableContainer className="min-h-[80dvh] max-h-[80vh] relative ">
          <div className="px-4 py-2 border-b">
            <Typography variant="h6">Registered students</Typography>
          </div>
          <form className="py-4 px-2 grid grid-cols-4 gap-2">
            <CustomFormField
              control={control}
              element="input"
              fieldProps={{ label: "Search name" }}
              name="searchText"
              rules={{ required: false, onChange }}
            />
          </form>
          <Table size="small" aria-label="simple table" className="border-b">
            <TableHead
              sx={{
                backgroundColor: theme.palette.background.paper,
              }}
              className="sticky w-full top-0 bg-inherit z-50"
            >
              <TableRow>
                {heading.map((title, index) =>
                      <TableCell key={`${title}${index}`}>
                        <strong>{title}</strong>
                      </TableCell>
                )}
              </TableRow>
            </TableHead>
            <CustomTableBody
              alert={"No records"}
              dataLoading={isLoading}
              isData={list.length > 0}
              totalSpan={{ col: heading.length, row: 4 }}>
              {list.map((row, index) => (
                <TableRow>
                  <TableCell align="center">
                    <span>{index + 1}</span>
                  </TableCell>
                 

                </TableRow>
              ))}
            </CustomTableBody>
          </Table>
        </TableContainer>
        <div className="border-t">
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data?.response?.count || 0}
            rowsPerPage={searchParams.pageSize}
            page={searchParams.pageNumber}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </Paper>
    </div>
  );
};

export default StudentListPage;



const heading = [
  "SL NO",
  "PAYMENT",
  "EMR NO",
  "DOCTOR",
  "PATIENT NAME",
  "EMIRATES ID",
  "PAYMENT TYPE",
  "INSURANCE TYPE",
  "INSURANCE NAME",
];
