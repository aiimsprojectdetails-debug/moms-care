import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

/* ==========================================
   Export Data to Excel
========================================== */

export const exportToExcel = (
  data,
  fileName,
  sheetName = "Sheet1"
) => {

  if (!data || data.length === 0) {
    alert("No data available to export.");
    return;
  }

  const worksheet = XLSX.utils.json_to_sheet(data);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    sheetName
  );

  const excelBuffer = XLSX.write(
    workbook,
    {
      bookType: "xlsx",
      type: "array",
    }
  );

  const file = new Blob(
    [excelBuffer],
    {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    }
  );

  saveAs(
    file,
    `${fileName}.xlsx`
  );

};