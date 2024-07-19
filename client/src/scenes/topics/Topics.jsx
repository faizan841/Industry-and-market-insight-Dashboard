import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useGetTopicsQuery } from "../../state/api";
import { useTheme, Box, Toolbar } from "@mui/material";
import DataGridCustomToolbar from "../../components/DataGridCustomToolbar";
import Header from "../../components/Header";

const Topics = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const { data, isLoading, error } = useGetTopicsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });

  const columns = [
    {
      field: "sector",
      headerName: "Sector",
      flex: 1,
    },
    {
      field: "topic",
      headerName: "Topic",
      flex: 1,
    },
    {
      field: "region",
      headerName: "Region",
      flex: 1,
    },

    { field: "pestle", headerName: "Pestle", flex: 1 },
    { field: "relevance", headerName: "Revelance", flex: 0.5 },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Country and Region Relevance Matrix"
        subtitle="Overview of PESTLE insights organized by geographic region, providing a clear understanding of country-specific relevance."
      />
      <Box
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={(data && data.topics) || []}
          columns={columns}
          rowCount={(data && data.total) || 0}
          rowsPerPageOptions={[20, 50, 100]}
          pagination
          pageSize={pageSize}
          paginationMode="server"
          sortingMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
        />
      </Box>
    </Box>
  );
};

export default Topics;
