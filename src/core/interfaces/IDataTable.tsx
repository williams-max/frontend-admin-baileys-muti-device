export interface IClinicDiaryTable {
    headers: string[],
    data?: any[],
    editClinicalDiary?: any,
    deleteClinicalDiary?: any,
}   

export interface ISearchClientTable {
    headers: string[],
    data?: any[],
    goToPage?: any,
} 

export interface IDataTable {
    headers: string[],
    children: any,
    sortColumns?: boolean,
}  