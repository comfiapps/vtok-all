import {
    DataGridPro, GridOverlay as GridOverlayPro,
    GridToolbarColumnsButton as GridToolbarColumnsButtonPro,
    GridToolbarContainer as GridToolbarContainerPro,
    GridToolbarDensitySelector as GridToolbarDensitySelectorPro, GridToolbarExport as GridToolbarExportPro,
} from '@mui/x-data-grid-pro';
import {
    DataGrid, GRID_CHECKBOX_SELECTION_COL_DEF, GridOverlay,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector, GridToolbarExport,
    koKR, useGridApiRef
} from '@mui/x-data-grid';
import * as React from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {gridClasses, LinearProgress} from "@mui/material";
import {useEffect} from "react";

function CustomToolbar() {
    return (
        <GridToolbarContainer className={gridClasses.toolbarContainer}>
            <GridToolbarColumnsButton />
            <GridToolbarDensitySelector />
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}

function CustomLoadingOverlay() {
    return (
        <GridOverlay>
            <div style={{ position: 'absolute', top: 0, width: '100%' }}>
                <LinearProgress />
            </div>
        </GridOverlay>
    );
}

function CustomToolbarPro() {
    return (
        <GridToolbarContainerPro className={gridClasses.toolbarContainer}>
            <GridToolbarColumnsButtonPro />
            <GridToolbarDensitySelectorPro />
            <GridToolbarExportPro />
        </GridToolbarContainerPro>
    );
}

function CustomLoadingOverlayPro() {
    return (
        <GridOverlayPro>
            <div style={{ position: 'absolute', top: 0, width: '100%' }}>
                <LinearProgress />
            </div>
        </GridOverlayPro>
    );
}

const CustomDataGrid = (
    {
        checkboxSelection = true,
        pro,
        rows,
        filtered,
        columns,
        rowId,
        grouping,
        onCellClick,
        onCellDoubleClick,
        onSelection,
    }
) => {
    const apiRef = useGridApiRef();

    const commonProp = {
        apiRef: apiRef,
        getRowId: Boolean(rowId) && rowId,
        loading: !rows,
        rows: filtered || rows,
        columns: columns,
        pageSize: 50,
        rowsPerPageOptions: [5],
        checkboxSelection: checkboxSelection,
        onCellClick: Boolean(onCellClick) && onCellClick,
        onCellDoubleClick: Boolean(onCellDoubleClick) && onCellDoubleClick,
        onSelectionModelChange: Boolean(onSelection) && onSelection,
    }

    useEffect(() => {
        // return apiRef.current.subscribeEvent('columnResize', (params) => {
            // setMessage(`Column ${params.colDef.headerName} resized to ${params.width}px.`);
        // });
    }, [apiRef]);

    return (
        <div
            style={{
                height: `calc(100% - 120px)`,
                width: '100%',
                paddingBottom: 100,
                userSelect: "none",
                msUserSelect: "none",
            }}
        >
            <ThemeProvider theme={createTheme(koKR)}>
                {pro ?
                    <DataGridPro
                        {...commonProp}
                        components={{
                            Toolbar: CustomToolbarPro,
                            LoadingOverlay: CustomLoadingOverlayPro,
                        }}
                        initialState={{
                            pinnedColumns: {
                                left: [GRID_CHECKBOX_SELECTION_COL_DEF.field],
                                right: ['actions'],
                            },
                        }}
                        treeData={Boolean(grouping)}
                        getTreeDataPath={Boolean(grouping) && grouping}
                        defaultGroupingExpansionDepth={-1}
                    />
                    :
                    <DataGrid
                        {...commonProp}
                        components={{
                            Toolbar: CustomToolbar,
                            LoadingOverlay: CustomLoadingOverlay,
                        }}
                    />
                }
            </ThemeProvider>
        </div>
    );
}

export default CustomDataGrid;
