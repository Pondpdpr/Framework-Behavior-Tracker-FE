"use client";

import { Footer } from "@/component/footer";
import { Box, Container, Divider, Stack, Typography } from "@mui/material";
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
        <Stack useFlexGap alignContent={"center"} spacing={4}>
          <Typography variant="h1" paddingX={2}>
            FAQ
          </Typography>
          <Stack alignContent={"center"} paddingX={2}>
            <Typography color={"primary"} variant="h2">
              คำถามที่พบบ่อย
            </Typography>
            <Typography variant="body2">คำตอบสำหรับคำถามที่พบบ่อยเกี่ยวกับ Frontline Tracker</Typography>
          </Stack>
          <Divider sx={{ borderWidth: "1px" }} />
          {FAQ.map((faq) => (
            <Stack key={faq.question} spacing={2} paddingX={2}>
              <Typography variant="h2">{faq.question}</Typography>
              <Typography variant="body2">{faq.answer}</Typography>
            </Stack>
          ))}
        </Stack>
      </Container>
      <Footer />
    </>
  );
}
