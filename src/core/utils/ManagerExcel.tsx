


import jsPDF from "jspdf";
import "jspdf-autotable";
import { getStringFechaInicial } from "./DateFormat";

import FileSaver from "file-saver";

import XLSX from "xlsx";

export const exportToCustomCSV = (rows: any, columns: any, titleHeader: string, namefileExcel: string) => {

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const fileName = namefileExcel

  function customersData() {
    const custs = [];


    for (let i = 0; i < rows.length; i++) {

      var rowAux = rows[i]
      var obj: any = {}


      for (let f = 0; f < columns.length; f++) {


        obj[columns[f].name] = rowAux[`${columns[f].nameRow}`]




      }
      custs[i] = obj;
      // custs.push({ obj })
      /*custs[i] = {
        Sucursal: nombreSucursalTabla,
        Categoria: rows[i].CATEGORIA,
        SubCategoria: rows[i].SUBCATEGORIA1,
        Producto: rows[i].SUBCATEGORIA2,
        Detalle: rows[i].DETALLE,
        "P.Modificado": rows[i].MODIFICADO == 1 ? "SI" : "NO",
        FechaDeEntrega: formatDateString(rows[i].FECHA_ENTREGA_PEDIDO)
      };*/
    }
    return custs;
  }




  const wscols = []
  for (let f = 0; f < columns.length; f++) {


    //   obj1[columns[f].name]=rowAux[`${columns[f].nameRow}`]

    //        obj1[columns[f].name]=Math.max(...rows.map((customer: any) => customer[`${columns[f].nameRow}`].length)) 

    // wscols.push(obj1)
    //add default
    wscols.push({
      wch: Math.max(...rows.map((customer: any) => {
    
        if (customer[`${columns[f].nameRow}`]) {
          if (columns[f].widthCol) {

            return customer[`${columns[f].nameRow}`]?.length + columns[f].widthCol
          } else {
            return customer[`${columns[f].nameRow}`]?.length
          }
        }
        else {
          if (columns[f].widthCol) {
            return columns[f].widthCol
          } else {
            return 10 //por default
          }

        }
      }
      ))
    })
    // wscols.push({ wch: Math.max(...rows.map((customer: any) => customer[`${columns[f].nameRow}`]?.length  )) })
  }



  /*const wscols = [
     {
       wch: Math.max(...rows.map((customer:any) => customer.Sucursal.length))
     },
    { wch: Math.max(...rows.map((customer: any) => customer.CATEGORIA.length)) },
    { wch: Math.max(...rows.map((customer: any) => customer.SUBCATEGORIA1.length)) },
    { wch: Math.max(...rows.map((customer: any) => customer.SUBCATEGORIA2.length)) },
    { wch: Math.max(...rows.map((customer: any) => customer.DETALLE.length)) },
    { wch: Math.max(...rows.map((customer: any) => customer.MODIFICADO.length)) + 10 },
    { wch: Math.max(...rows.map((customer:any) => customer.FechaDeEntrega.length)) },
  
  ];*/

  //const csvData = customers
  const csvData = [...customersData()]


  //const fileName = "testExcel"

  console.log("csvData ", csvData)
  /*const ws = XLSX.utils.json_to_sheet(Heading, {
    header: ["firstName", "lastName", "email", "address", "postcode"],
    skipHeader: true,
    origin: 0 //ok
  });*/
  var ws = XLSX.utils.aoa_to_sheet([
    // ["OneCloud"],
    [titleHeader]
  ]);
  ws["!cols"] = wscols;
  /*ws["A1"].l = {
    Target: "https://sheetjs.com",
    Tooltip: "Find us @ SheetJS.com!"
  };*/
  //ONLY Data Added here
  XLSX.utils.sheet_add_json(ws, csvData, {
    /*Categoria: rows[i].CATEGORIA,
     SubCategoria: "Subcategoria",
     Producto: "Producto",
     Detalle: "Detalle",
     PModificado: "P.Modifcado",
     FechaDeEntrega: "Fecha de entrega"*/
    // header: ["Sucursal", "Categoria", "SubCategoria", "Producto","Detalle","PModificado","FechaDeEntrega"],
    skipHeader: false,
    origin: "A6" //ok -1
  });
  const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(data, fileName +getStringFechaInicial()+ fileExtension);
};

