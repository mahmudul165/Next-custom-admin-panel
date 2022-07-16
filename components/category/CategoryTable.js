import React, { useEffect, useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import useAuth from "/hook/useAuth";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useCategoryQuery } from "../../hook/useApi";
const Loading = dynamic(() => import("/components/common/Loading"));

function CategoryTable() {
  const { deleteData, Statustest, token, apiRootUrl, apiEndpoint } = useAuth();
  const { data, error, isError } = useCategoryQuery();

  const columns = useMemo(
    () => [
      {
        header: "#",
        id: "id",
      },

      {
        header: "Service category name",
        id: "name",
      },
      {
        header: "Remarks",
        id: "remarks",
      },
      {
        header: "Status",
        id: "status",
      },
    ],
    []
  );
  return (
    <>
      {" "}
      <div className="p-4">
        {data ? (
          <MaterialReactTable
            columns={columns}
            data={data.data}
            // state={{
            //   isLoading
            // }}
            initialState={{
              showGlobalFilter: true,
              pagination: { pageSize: 5 },
            }}
            positionGlobalFilter="left"
            muiSearchTextFieldProps={{
              variant: "outlined",
              size: "small",
              placeholder: "Search your data",
              label: "Search",
              InputLabelProps: { shrink: true },
            }}
            muiTableBodyRowProps={({ row }) => ({
              sx: {
                backgroundColor:
                  row.index % 2 === 0 ? "rgba(52, 54, 245, 0.08) " : " ",
                //hover:bg-gray-200
              },
            })}
            muiTableBodyCellProps={{
              sx: { border: "none" },
              //align: "center",
            }}
            // muiTableContainerProps={{ sx: { maxHeight: 400 } }}
            muiTablePaperProps={{
              sx: {
                // maxWidth: "800px",
                //m: "auto",
              },
            }}
            muiTableContainerProps={{
              sx: {
                // maxHeight: "500px",
              },
            }}
            //state={{ showSkeletons: true }}
            positionPagination="both"
            // row actions

            enableRowActions
            positionActionsColumn="last"
            renderRowActions={({ row }) => (
              <div
                style={{
                  display: "flex",
                  flexWrap: "nowrap",
                  gap: "0.5rem",
                }}
              >
                <button
                  className="text-purple-800 hover:underline"
                  onClick={() => {
                    console.log("View Profile", row.original);
                  }}
                >
                  Edit
                </button>

                <button
                  className="text-purple-800 hover:underline"
                  onClick={() =>
                    deleteData(
                      `${apiRootUrl}${apiEndpoint?.service?.delete}/${row?.original?.id}`
                    )
                  }
                >
                  Delete
                </button>
              </div>
            )}
          />
        ) : (
          <>
            <Loading />
          </>
        )}
      </div>
    </>
  );
}

export default CategoryTable;
