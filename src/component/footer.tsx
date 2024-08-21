"use client";

import { Box, Link, Stack, Typography } from "@mui/material";

export function Footer() {
  return (
    <Box
      width={"100%"}
      sx={{
        backgroundColor: "#E5E5E5",
        display: "flex",
        padding: "16px 24px",
      }}
    >
      <Stack alignItems={"flex-start"} spacing={1}>
        <Typography variant="body2">ติดปัญหาหรือมีข้อสงสัย หาคำตอบได้ที่:</Typography>
        <Link href="/faq" variant="body2" color="secondary.dark" sx={{ textDecoration: "underline" }}>
          คำถามที่พบบ่อย
        </Link>
        <Link
          component={"button"}
          variant="body2"
          color="secondary.dark"
          sx={{ textDecoration: "underline" }}
          onClick={() => window.open(process.env.NEXT_PUBLIC_CONTACT_LINK)}
        >
          ติดต่อสอบถาม
        </Link>
      </Stack>
    </Box>
  );
}
