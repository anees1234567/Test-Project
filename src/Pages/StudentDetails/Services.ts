import { ENDPOINTS, Instance } from "../../../constants";
import { ResponseType } from "../../Types/serviceTypes";
import { studentListType } from "./types";

async function getAllStudents(): Promise<ResponseType<studentListType[]>> {
    const result = await Instance.get(ENDPOINTS.GET_ALL_STUDENTS);
    return result.data;
}

export { getAllStudents };