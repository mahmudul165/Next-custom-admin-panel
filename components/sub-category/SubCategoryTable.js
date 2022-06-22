import React, { useMemo, useState, useEffect } from "react";
import MaterialReactTable from "material-react-table";
import useAuth from "/hook/useAuth";
import Link from "next/link";
import dynamic from "next/dynamic";
//import { useSubCategoryQuery } from "/hook/useApi";
const Loading = dynamic(() => import("/components/common/Loading"));
function SubCategoryTable() {
  const { deleteData, Statustest } = useAuth();
  // const { data, error, isError } = useSubCategoryQuery();
  //console.log("All subcategory data ", data);

  const [remoteData, setRemoteData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(
        "https://misiapi.lamptechs.com/api/v1/subservice"
      );
      const json = await response.json();
      setRemoteData(json.data);
      setIsLoading(false);
    };
    fetchData();
  }, [remoteData]);

  const parsedData = useMemo(
    () =>
      remoteData.map((userData) => ({
        id: `${userData.id}`,
        service_category_name: userData.service_category?.name,
        sub_category_name: userData.name,
        remarks: userData.remarks,
        status: userData.status,
      })) ?? [],
    [remoteData]
  );

  const columns = useMemo(
    () => [
      {
        header: "#",
        id: "id",
      },

      {
        header: "Service category name",
        id: "service_category_name",
      },
      {
        header: "sub category name",
        id: "sub_category_name",
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
      <div className="p-4">
        {remoteData ? (
          <MaterialReactTable
            columns={columns}
            data={parsedData}
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
                      `https://misiapi.lamptechs.com/api/v1/subservice/delete`,
                      row.original.id
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

export default SubCategoryTable;
