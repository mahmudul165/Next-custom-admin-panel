import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { usePatientListQuery } from "../hook/useApi";

export default function FreeSolo() {
  const { data: patientList } = usePatientListQuery();
  return (
    <Stack>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={patientList?.data?.map((option) => option.id)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search patient id"
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
          />
        )}
      />
    </Stack>
  );
}
