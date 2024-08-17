"use client";

import { createUser } from "@/api/user";
import { CreateUserDto, UserFields, UserSchema } from "@/type/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Container, Modal, Stack, TextField } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

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

  const { register, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      thaiFirstName: "",
      thaiLastName: "",
      email: "",
      gender: "",
      group: "",
      position: "",
      directSuperior: "",
      location: "",
      dealership: "",
      phone: "",
    },
    resolver: zodResolver(UserSchema),
  });
  const formData = watch();

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
          {UserFields.map((field) => (
            <Stack key={field.value} direction="row" spacing={2}>
              <TextField
                label={field.label}
                fullWidth
                {...register(field.value as keyof CreateUserDto)}
                required={field.required}
              />
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
                reset({
                  firstName: "",
                  lastName: "",
                  thaiFirstName: "",
                  thaiLastName: "",
                  email: "",
                  gender: "",
                  group: "",
                  position: "",
                  directSuperior: "",
                  location: "",
                  dealership: "",
                  phone: "",
                });
                handleCloseModal();
              }}
              disabled={!UserSchema.safeParse(formData).success}
            >
              Save
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Modal>
  );
}
