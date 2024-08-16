"use client";
import { sendDaily, sendReminder } from "@/api/email";
import { deleteUser, getUser, updateUser } from "@/api/user";
import { AddEmployeeModal } from "@/component/addEmployeeModal";
import { DeleteEmployeeModal } from "@/component/deleteEmployeeModal";
import { EmailActivityStatusOption, UserDto } from "@/type/user";
import {
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  RowSelectionState,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";

export default function Page() {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
  });
  const updateMutation = useMutation({
    mutationFn: (newData: UserDto) => updateUser(newData),
    onSuccess: async () => await queryClient.refetchQueries({ queryKey: ["user"] }),
  });
  const deleteMutation = useMutation({
    mutationFn: (newData: number[]) => deleteUser(newData),
    onSuccess: async () => await queryClient.refetchQueries({ queryKey: ["user"] }),
  });
  const sendAllMutation = useMutation({
    mutationFn: (newData: { users?: number[] }) => sendDaily(newData),
  });
  const sendReminderMutation = useMutation({
    mutationFn: (newData: { users?: number[] }) => sendReminder(newData),
  });

  const columns = useMemo<Array<ColumnDef<UserDto>>>(
    () => [
      {
        header: "Daily",
        accessorKey: "dailyEmailActivityStatus",
        footer: (props) => props.column.id,
        enableGlobalFilter: false,
      },
      {
        header: "Reminder",
        accessorKey: "reminderEmailActivityStatus",
        footer: (props) => props.column.id,
        enableGlobalFilter: false,
      },
      {
        header: "ID",
        accessorKey: "id",
        footer: (props) => props.column.id,
      },
      {
        header: "Full Name",
        id: "fullName",
        accessorFn: (row) => `${row.firstName} ${row.lastName}`,
        footer: (props) => props.column.id,
      },
      {
        header: "Email",
        accessorKey: "email",
        footer: (props) => props.column.id,
      },
      {
        header: "Title",
        accessorKey: "title",
        footer: (props) => props.column.id,
        enableGlobalFilter: false,
      },
      {
        header: "Company",
        accessorKey: "company",
        footer: (props) => props.column.id,
        enableGlobalFilter: false,
      },
      {
        header: "Location",
        accessorKey: "location",
        footer: (props) => props.column.id,
        enableGlobalFilter: false,
      },
      {
        header: "Market",
        accessorKey: "market",
        footer: (props) => props.column.id,
        enableGlobalFilter: false,
      },
    ],
    []
  );

  const rows = useMemo<Array<UserDto>>(() => (data ? data : []), [data]);

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const table = useReactTable({
    data: rows,
    columns,
    state: {
      rowSelection,
      columnFilters,
      globalFilter,
    },
    getRowId: (originalRow) => originalRow?.id.toString(),
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableRowSelection: true,
  });

  const onDeleteUser = useMemo(() => {
    return () => {
      deleteMutation.mutate(table.getSelectedRowModel().flatRows.map((row) => +row.id));
    };
  }, [deleteMutation, table]);

  return (
    <Stack padding={4} spacing={4}>
      <AddEmployeeModal isModalOpen={isCreateModalOpen} handleCloseModal={() => setCreateModalOpen(false)} />
      <DeleteEmployeeModal
        isModalOpen={isDeleteModalOpen}
        handleCloseModal={() => setDeleteModalOpen(false)}
        onSubmit={() => onDeleteUser()}
      />
      <Stack direction="row" justifyContent={"space-between"}>
        <Stack direction="row" spacing={4}>
          <Button
            variant="contained"
            disabled={Object.keys(rowSelection).length === 0}
            onClick={() => {
              sendAllMutation.mutate({ users: table.getSelectedRowModel().flatRows.map((row) => +row.id) });
            }}
          >
            Send Daily
          </Button>
          <Button
            variant="contained"
            disabled={Object.keys(rowSelection).length === 0}
            onClick={() => {
              sendReminderMutation.mutate({ users: table.getSelectedRowModel().flatRows.map((row) => +row.id) });
            }}
          >
            Send Reminder
          </Button>
        </Stack>
        <Stack direction="row" spacing={4}>
          <Button
            variant="contained"
            color="error"
            disabled={Object.keys(rowSelection).length === 0}
            onClick={() => setDeleteModalOpen(true)}
          >
            Remove
          </Button>
          <Button variant="contained" onClick={() => setCreateModalOpen(true)}>
            Add
          </Button>
        </Stack>
      </Stack>
      <Stack direction="row" spacing={4}>
        <FormControl sx={{ width: "20%" }}>
          <InputLabel id="select-daily">Daily</InputLabel>
          <Select
            labelId="select-daily"
            label="Daily"
            defaultValue={"all"}
            onChange={(e) =>
              table
                .getColumn("dailyEmailActivityStatus")
                ?.setFilterValue(e.target.value == "all" ? undefined : e.target.value)
            }
            value={table.getColumn("dailyEmailActivityStatus")?.getFilterValue() ?? "all"}
          >
            {EmailActivityStatusOption.map((status) => (
              <MenuItem key={status.value} value={status.value}>
                {status.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ width: "20%" }}>
          <InputLabel id="select-reminder">Reminder</InputLabel>
          <Select
            labelId="select-reminder"
            label="Reminder"
            defaultValue={"all"}
            onChange={(e) =>
              table
                .getColumn("reminderEmailActivityStatus")
                ?.setFilterValue(e.target.value == "all" ? undefined : e.target.value)
            }
            value={table.getColumn("reminderEmailActivityStatus")?.getFilterValue() ?? "all"}
          >
            {EmailActivityStatusOption.map((status) => (
              <MenuItem key={status.value} value={status.value}>
                {status.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Search"
          sx={{ width: "20%" }}
          onChange={(e) => table.setGlobalFilter(e.target.value)}
          value={globalFilter}
        />
        <TextField
          label="Company"
          sx={{ width: "20%" }}
          onChange={(e) => table.getColumn("company")?.setFilterValue(e.target.value)}
          value={table.getColumn("company")?.getFilterValue()}
        />
        <TextField
          label="Location"
          sx={{ width: "20%" }}
          onChange={(e) => table.getColumn("location")?.setFilterValue(e.target.value)}
          value={table.getColumn("location")?.getFilterValue()}
        />
        <TextField
          label="Market"
          sx={{ width: "20%" }}
          onChange={(e) => table.getColumn("market")?.setFilterValue(e.target.value)}
          value={table.getColumn("market")?.getFilterValue()}
        />
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                <TableCell sx={{ width: "40px" }} />
                {headerGroup.headers.map((header) => {
                  return (
                    <TableCell key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <Typography variant="h2">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </Typography>
                      )}
                    </TableCell>
                  );
                })}
                <TableCell sx={{ width: "40px" }} />
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => {
              return (
                <TableRow key={row.id} sx={{ backgroundColor: `${row.getIsSelected() && "#d3eafd"}` }}>
                  <TableCell>
                    <Checkbox onChange={row.getToggleSelectedHandler()} checked={row.getIsSelected()} />
                  </TableCell>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    );
                  })}
                  <TableCell>
                    <Switch
                      checked={row.original.isActive}
                      onChange={() => {
                        updateMutation.mutate({ ...row.original, isActive: !row.original.isActive });
                      }}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
