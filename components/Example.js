import React, { useEffect, useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";

const Example = () => {
  const [remoteData, setRemoteData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const json = await response.json();
      setRemoteData(json);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const parsedData = useMemo(
    () =>
      remoteData.map((userData) => ({
        name: userData.name,
        username: userData.username,
        email: userData.email,
        address: userData.address.street,
        city: userData.address.city,
        zipcode: userData.address.zipcode,
      })) ?? [],
    [remoteData]
  );

  const columns = useMemo(
    () => [
      {
        header: "Name",
        id: "name",
      },
      {
        header: "Username",
        id: "username",
      },
      {
        header: "Email",
        id: "email",
      },
      {
        header: "Address",
        id: "address",
      },
      {
        header: "City",
        id: "city",
      },
      {
        header: "Zip Code",
        id: "zipcode",
      },
    ],
    []
  );

  return (
    <>
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
          size: "medium",
          placeholder: "Search your data",
          label: "Search",
          InputLabelProps: { shrink: true },
        }}
        muiTableBodyRowProps={({ row }) => ({
          sx: {
            backgroundColor:
              row.index % 2 === 0 ? "rgba(52, 54, 245, 0.08)" : "",
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
      />
    </>
  );
};

export default Example;
