"use client";

import { Box, Container, Divider, Link, Stack, Typography } from "@mui/material";
import Image from "next/image";

const FAQ = [
  {
    question: "We'll be adding this soon",
    answer: "If you have any question, please contact us by clicking the link at the bottom of the page.",
  },
];

export default function Page() {
  return (
    <>
      <Box
        width={"100%"}
        sx={{
          backgroundColor: "#E5E5E5",
          display: "flex",
          justifyContent: "center",
          height: { xs: "80px", lg: "120px" },
        }}
      >
        <div style={{ margin: "24px", position: "relative", width: "100%", height: "auto" }}>
          <Image
            src={"https://behavior-tracker-prach.s3.ap-southeast-1.amazonaws.com/logo.png"}
            alt="image"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
      </Box>
      <Container
        sx={{
          minHeight: { xs: "calc(100% - 200px)", lg: "calc(100% - 240px)" },
          padding: "32px 0px 32px 0px",
        }}
      >
        <Stack useFlexGap alignContent={"center"} padding={"0px 24px 0px 24px"} spacing={4}>
          <Stack alignContent={"center"} padding={"0px 24px 0px 24px"}>
            <Typography variant="h1">FAQ</Typography>
          </Stack>
          <Stack alignContent={"center"} padding={"16px 24px 16px 24px"}>
            <Typography color={"primary"} variant="h2">
              คำถามที่พบบ่อย
            </Typography>
            <Typography variant="body2">คำตอบสำหรับคำถามที่พบบ่อยเกี่ยวกับ Frontline Tracker</Typography>
          </Stack>
          <Divider sx={{ borderWidth: "1px" }} />
          {FAQ.map((faq) => (
            <Stack key={faq.question} spacing={2} padding={"12px 0px"}>
              <Typography variant="h2">{faq.question}</Typography>
              <Typography variant="body2">{faq.answer}</Typography>
            </Stack>
          ))}
        </Stack>
      </Container>
      <Box
        width={"100%"}
        sx={{
          backgroundColor: "#E5E5E5",
          display: "flex",
          padding: "16px 24px",
        }}
      >
        <Stack alignItems={"flex-start"} spacing={1}>
          <Typography variant="body1">ติดปัญหาหรือมีข้อสงสัย หาคำตอบได้ที่:</Typography>
          <Link href="/faq" variant="body1" color="secondary" sx={{ textDecoration: "underline" }}>
            คำถามที่พบบ่อย
          </Link>
          <Link
            component={"button"}
            variant="body1"
            color="secondary"
            sx={{ textDecoration: "underline" }}
            onClick={() => window.open(process.env.NEXT_PUBLIC_CONTACT_LINK)}
          >
            ติดต่อสอบถาม
          </Link>
        </Stack>
      </Box>
    </>
  );
}
