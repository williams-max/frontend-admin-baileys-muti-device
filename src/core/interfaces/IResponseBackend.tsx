/*import { IAgenda } from "../../app/modules/calendar/interfaces/IAgenda";
import { ICalendar } from "../../app/modules/calendar/interfaces/ICalendar";
import { IClient } from "../../app/modules/client/interfaces/IClient";
import { IGender } from "../../app/modules/client/interfaces/IGender";
import { IClinicalDiary } from '../../app/modules/clinical-diary/interfaces/IClinicalDiary';
import { IDocument } from "../../app/modules/clinical-diary/interfaces/IDocument";
import { IMedicalHistory } from '../../app/modules/clinical-diary/interfaces/IMedicalHistory';
import { IClinicServiceCategory, IClinicServiceAndCategory } from '../../app/modules/tariff/interfaces/IClinicServiceCategory';
import { IClinicServiceSubCategory, IClinicServiceAndSubCategory } from '../../app/modules/tariff/interfaces/IClinicServiceSubCategory';
import { IRole, IUser } from "../../app/modules/users/interfaces/IUser";
*/
type ResponseHttp = 'success';
type ResponseHttpSave = 'OK';

export interface ISaveUpdateDelete {
    response: string | null;
    status: string | null;
    id: string | null;
    logg: string | null;
}

export interface ResponseBackendClient {
    currentPage: null | string;
  //  response: IClient[];
    status: ResponseHttp;
    total: string;
    totalPages: string | null;
}

export interface ResponseBackendGender {
    currentPage: null | string;
  
  //  response: IGender[];
   // status: ResponseHttp;
    total: string;
    totalPages: string | null;
}
export interface ResponseBackendAgenda {
    currentPage: null | string;
    //response: IAgenda[];
    status: ResponseHttp;
    total: string;
    totalPages: string | null;
}
export interface ResponseBackendCalendar{
    currentPage: null | string;
   // response: ICalendar[];
    status: ResponseHttp;
    total: string;
    totalPages: string | null;
}

export interface ResponseBackendClinicalDiary {
    currentPage: null | string;
   // response: IClinicalDiary[];
    status: ResponseHttp;
    total: string;
    totalPages: string | null;
}
export interface ResponseBackendMedicalHistory {
    currentPage: null | string;
   // response: IMedicalHistory[];
    status: ResponseHttp;
    total: string;
    totalPages: string | null;
}

export interface ResponseBackendDocument {
    currentPage: null | string;
   // response: IDocument[];
    status: ResponseHttp;
    total: string;
    totalPages: string | null;
}

export interface ResponseBackendUser {
    currentPage: null | string;
    //response: IUser[];
    status: ResponseHttp;
    total: string;
    totalPages: string | null;
}

export interface ResponseBackendRole {
    currentPage: null | string;
    //response: IRole[];
    status: ResponseHttp;
    total: string;
    totalPages: string | null;
}

export interface ResponseBackendSaveUpdateDelete {
    response: ResponseHttpSave;
    status: ResponseHttp;
    id: string | null;
    logg: string | null;
}

export interface ResponseBackendClinicServiceCategory {
    currentPage: null | string;
    //response: IClinicServiceCategory[];
    status: ResponseHttp;
    total: string;
    totalPages: string | null;
}

export interface ResponseBackendClinicServiceSubCategory {
    currentPage: null | string;
   // response: IClinicServiceSubCategory[];
    status: ResponseHttp;
    total: string;
    totalPages: string | null;
}

export interface ResponseBackendClinicService {
    currentPage: null | string;
   // response: IClinicServiceAndCategory[];
    status: ResponseHttp;
    total: string;
    totalPages: string | null;
}
