"use client";

import { AdminAppBar } from "@/component/adminAppbar";
import { Button, Container, Modal, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");

  const verifyAndLogIn = () => {
    if (password === process.env.NEXT_PUBLIC_PASSWORD) setLoggedIn(true);
  };

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
                    verifyAndLogIn();
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
