"use client";

import { adminLogin } from "@/api/user";
import { AdminAppBar } from "@/component/adminAppbar";
import { AdminLoginDto } from "@/type/user";
import { Button, Container, Modal, Stack, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const loginMutation = useMutation({
    mutationFn: (newData: AdminLoginDto) => adminLogin(newData),
    onSuccess: (data) => {
      if (data.isValid) setLoggedIn(true);
    },
  });

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");

  return (
    <>
      {isLoggedIn ? (
        <>
          <AdminAppBar />
          {children}
        </>
      ) : (
        <Modal open={true}>
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
              <Typography variant="h2">Please Login</Typography>
              <TextField type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <Stack direction="row" justifyContent={"flex-end"} spacing={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    loginMutation.mutate({ password });
                  }}
                >
                  Log in
                </Button>
              </Stack>
            </Stack>
          </Container>
        </Modal>
      )}
    </>
  );
}
