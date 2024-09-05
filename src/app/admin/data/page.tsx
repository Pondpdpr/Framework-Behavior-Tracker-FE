"use client";
import { getFile } from "@/api/export";
import { Button, Container, MenuItem, Select, Stack } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const ExportOptions = [
  {
    label: "Responses CheckBox",
    value: "response-checkbox",
  },
  {
    label: "Responses",
    value: "response",
  },
  {
    label: "Users",
    value: "user",
  },
];

export default function Page() {
  const [exportOption, setExportOptions] = useState("response");

  const getMutation = useMutation({
    mutationFn: (path: string) => getFile(path),
  });

  return (
    <Container sx={{ padding: "24px" }}>
      <Stack alignItems={"flex-end"} spacing={2}>
        <Select value={exportOption} fullWidth onChange={(e) => setExportOptions(e.target.value)}>
          {ExportOptions.map((exportOption) => (
            <MenuItem key={exportOption.value} value={exportOption.value}>
              {exportOption.label}
            </MenuItem>
          ))}
        </Select>
        <Button variant="contained" color="primary" onClick={() => getMutation.mutate(exportOption)}>
          Export
        </Button>
      </Stack>
    </Container>
  );
}
