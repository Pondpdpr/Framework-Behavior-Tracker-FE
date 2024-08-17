"use client";

import { updateUser } from "@/api/user";
import { CreateUserDto, UserDto, UserFields, UserSchema } from "@/type/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Container, Modal, Stack, TextField } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export function EditEmployeeModal({
  user,
  isModalOpen,
  handleCloseModal,
}: {
  user: UserDto;
  isModalOpen: boolean;
  handleCloseModal: () => void;
}) {
  const queryClient = useQueryClient();
  const updateMutation = useMutation({
    mutationFn: (newData: UserDto) => updateUser(newData),
    onSuccess: async () => await queryClient.refetchQueries({ queryKey: ["user"] }),
  });

  const { register, handleSubmit, watch, reset } = useForm({
    defaultValues: { ...user },
    resolver: zodResolver(UserSchema),
  });
  const formData = watch();

  useEffect(() => {
    reset(user);
  }, [user]);

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
                handleSubmit((data) => updateMutation.mutate({ ...data, id: user.id }))();
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
