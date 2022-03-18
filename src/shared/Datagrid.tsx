import { DataGrid, DataGridProps } from "@mui/x-data-grid";
import React, { MutableRefObject, useRef } from "react";

interface ModuleDatagridProps extends DataGridProps {
  onSelectedRowChange?: any;
}

const ModuleDatagrid = (props: ModuleDatagridProps) => {
  // const [selectedRow, setSelectedRow] = React.useState<string | null>(null);
  // const ref = useRef();
  return (
    <>
      {/* {selectedRow} */}
      <DataGrid
        disableColumnMenu
        // ref={ref}
        hideFooterSelectedRowCount
        onSelectionModelChange={(r, p) => {
          // setSelectedRow(r.length ? r[0].toString() : null);
          // console.log(r, ref.current?.getSelectedRows());
          if (props.onSelectedRowChange) {
            props.onSelectedRowChange(r);
          }
        }}
        hideFooterPagination
        {...props}
      />
    </>
  );
};

export { ModuleDatagrid };
