


import jsPDF from "jspdf";
import "jspdf-autotable";
import { getStringFechaInicial } from "./DateFormat";

export const printCustomPDF = (rows: any, columns: any, titleHeader: string, namefilePdf: string) => {

  //const titleHeader = (`REPORTE DE CANTIDADES PREPARADAS- ${title}`).toUpperCase()


  const pdf: any = new jsPDF("p", "pt", "a4");
  /* const columns = [
     "Producto",
     "Cantidad Solicidata",
     "Cantidad Preparada",
     "Turno",
     "Observacion"
   ];*/
  var rowsX = [];



  for (let i = 0; i < rows.length; i++) {

    var temp = []
    var rowAux = rows[i]
    //codigo nuevo
    /*for (var key in rowAux) {

      temp.push(rowAux[key])

    }*/
    for (let x = 0; x < columns.length; x++) {
      temp.push(rowAux[columns[x].nameRow])
    }

    /*var temp = [
      //nombreSucursalTabla,
      rows[i].producto,
      rows[i].cant_solicitada,
      rows[i].cant_preparada,
      rows[i].turno,
      rows[i].observacion,

    ];*/
    rowsX.push(temp);
  }

  const columnsHead = []
  for (let x = 0; x < columns.length; x++) {
    columnsHead.push(columns[x].name)
  }


  pdf.setFontSize(11)
  pdf.text(titleHeader, 40, 40);
  // pdf.text(20, 40,titleHeader);

  pdf.autoTable(columnsHead, rowsX, {
    startY: 65,
    theme: "grid",
    styles: {
      font: "times",
      halign: "center",
      cellPadding: 3.5,
      lineWidth: 0.5,
      lineColor: [0, 0, 0],
      textColor: [0, 0, 0]
    },
    headStyles: {
      textColor: [0, 0, 0],
      fontStyle: "normal",
      lineWidth: 0.5,
      lineColor: [0, 0, 0],
      fillColor: [166, 204, 247]
    },
    alternateRowStyles: {
      fillColor: [212, 212, 212],
      textColor: [0, 0, 0],
      lineWidth: 0.5,
      lineColor: [0, 0, 0]
    },
    rowStyles: {
      lineWidth: 0.5,
      lineColor: [0, 0, 0]
    },
    tableLineColor: [0, 0, 0]
  });

  const outPut = namefilePdf + "-" + getStringFechaInicial()
  pdf.save(outPut);
};

