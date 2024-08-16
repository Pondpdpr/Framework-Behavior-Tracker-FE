"use client";

import { createUser } from "@/api/user";
import { CreateUserDto } from "@/type/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Container, Modal, Stack, TextField, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  firstName: z.string().min(1, { message: "Required" }),
  lastName: z.string().min(1, { message: "Required" }),
  thaiFirstName: z.string().min(1, { message: "Required" }),
  thaiLastName: z.string().min(1, { message: "Required" }),
  email: z.string().min(1, { message: "Required" }),
  title: z.string().min(1, { message: "Required" }),
  department: z.string().min(1, { message: "Required" }),
  company: z.string().min(1, { message: "Required" }),
  location: z.string().min(1, { message: "Required" }),
  market: z.string().min(1, { message: "Required" }),
});

export function AddEmployeeModal({
  isModalOpen,
  handleCloseModal,
}: {
  isModalOpen: boolean;
  handleCloseModal: () => void;
}) {
  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationFn: (newData: CreateUserDto) => createUser(newData),
    onSuccess: async () => await queryClient.refetchQueries({ queryKey: ["user"] }),
  });
  const fields = [
    {
      label: "First Name",
      value: "firstName",
    },
    {
      label: "Last Name",
      value: "lastName",
    },
    {
      label: "Thai First Name",
      value: "thaiFirstName",
    },
    {
      label: "Thai Last Name",
      value: "thaiLastName",
    },
    {
      label: "Email",
      value: "email",
    },
    {
      label: "Title",
      value: "title",
    },
    {
      label: "Department",
      value: "department",
    },
    {
      label: "Company",
      value: "company",
    },
    {
      label: "Location",
      value: "location",
    },
    {
      label: "Market",
      value: "market",
    },
  ];

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      thaiFirstName: "",
      thaiLastName: "",
      email: "",
      title: "",
      department: "",
      company: "",
      location: "",
      market: "",
    },
    resolver: zodResolver(schema),
  });
  const formData = watch();
  const isVaild = useMemo(() => schema.safeParse(formData), [formData]);

  return (
    <Modal open={isModalOpen} onClose={handleCloseModal}>
      <Container
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "500px",
          bgcolor: "background.paper",
          transform: "translate(-50%, -50%)",
          padding: "24px",
          borderRadius: "6px",
        }}
      >
        <Stack spacing={2}>
          {fields.map((field) => (
            <Stack key={field.value} direction="row" spacing={2}>
              <Typography
                variant="body1"
                sx={{ width: "30%", textAlign: "right", verticalAlign: "middle", alignContent: "center" }}
              >
                {field.label}
              </Typography>
              <TextField sx={{ width: "70%" }} {...register(field.value as keyof CreateUserDto)} required />
            </Stack>
          ))}
          <Stack direction="row" justifyContent={"flex-end"} spacing={2}>
            <Button
              variant="text"
              color="error"
              sx={{ fontStyle: "italic", textDecoration: "underline" }}
              onClick={() => {
                handleCloseModal();
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                handleSubmit((data) => createMutation.mutate(data))();
                handleCloseModal();
              }}
              disabled={!schema.safeParse(formData).success}
            >
              Save
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Modal>
  );
}
