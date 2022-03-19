import { Box } from "@mui/material";
import { DataGrid, DataGridProps } from "@mui/x-data-grid";
import React from "react";

interface ModuleDatagridProps extends DataGridProps {
  onSelectedRowChange?: any;
}

const ModuleDatagrid = (props: ModuleDatagridProps) => {
  return (
    <Box sx={{ display: "flex", height: 400, mb: (t) => t.spacing(2) }}>
      <div style={{ flexGrow: 1 }}>
        <DataGrid
          disableColumnMenu
          hideFooterSelectedRowCount
          onSelectionModelChange={(r) => {
            if (props.onSelectedRowChange) {
              if (r && r.length > 0) {
                props.onSelectedRowChange(r[0]);
              } else {
                props.onSelectedRowChange(null);
              }
            }
          }}
          hideFooterPagination
          {...props}
        />
      </div>
    </Box>
  );
};

export { ModuleDatagrid };
