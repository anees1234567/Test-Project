import { createContext, useState } from "react";

import StudentList from "./components/StudentList";
import {studentListType,studentformType} from "./types"

export type contextType={
    tableData:studentListType[],
    setTableData:(params:studentListType[])=>void
    edit:studentformType|null;
    setEdit:(params:any)=>void;
    setRefetch:(params:boolean)=>void;
    refetch:boolean
 }

export const StudentContext=createContext<contextType|null>({edit:null,setEdit:()=>{},tableData:[],setTableData:()=>{},refetch:true,setRefetch:()=>{}})
function LabComponent() {
    const [tableData,setTableData]=useState<studentListType[]>([])
    const [edit,setEdit] = useState<studentformType | null>(null)
    const [refetch,setRefetch] = useState<boolean>(true)
  return (
    <StudentContext.Provider value={{tableData,setTableData,edit,setEdit,refetch,setRefetch}} >
        <StudentList/>
    </StudentContext.Provider>
  )
}

export default LabComponent
