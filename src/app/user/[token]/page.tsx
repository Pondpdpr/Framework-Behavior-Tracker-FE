"use client";

import { createResponse, getForm } from "@/api/form";
import { ResponseDto } from "@/type/form";
import { ScubaDiving, ThumbUp } from "@mui/icons-material";
import { Box, Button, Container, Divider, Link, Radio, Stack, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function Page() {
  const params = useParams();
  const queryClient = useQueryClient();
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["form"],
    queryFn: async () => await getForm(params.token as string),
    retry: false,
  });
  const [answers, setAnswers] = useState<ResponseDto>({ answers: [] });
  const [submitted, setSubmitted] = useState(false);

  const createMutation = useMutation({
    mutationFn: (newData: ResponseDto) => createResponse(params.token as string, newData),
    onSuccess: async () => await queryClient.refetchQueries({ queryKey: ["rule"] }),
  });

  const today = useMemo(() => {
    return (
      data && new Date(data?.form?.date).toLocaleDateString("th-TH", { weekday: "long", day: "numeric", month: "long" })
    );
  }, [data]);

  const errorCode = useMemo(() => {
    console.log(error?.message);
    return error?.message;
  }, [error]);

  useEffect(() => {
    const initialAnswers =
      data && data.form?.questions.map((question) => ({ questionId: question.id, answer: undefined }));
    initialAnswers && setAnswers({ answers: initialAnswers });
  }, [data]);

  const onClick = (questionId: number, action: boolean) => {
    const newAnswers = answers.answers?.map((answer) => {
      if (answer.questionId === questionId) {
        return { ...answer, answer: action };
      }
      return { ...answer };
    });
    setAnswers({ answers: newAnswers });
  };

  const resetAnswer = () => {
    const newAnswers = answers.answers?.map((answer) => {
      return { ...answer, answer: undefined };
    });
    setAnswers({ answers: newAnswers });
  };

  const renderForm = () => (
    <Stack useFlexGap alignContent={"center"} spacing={2}>
      <Stack alignContent={"center"} padding={"0px 24px 0px 24px"} spacing={1}>
        <Typography variant="h1">Frontline Tracker</Typography>
        <Typography variant="body2">{today}</Typography>
      </Stack>
      <Stack alignContent={"center"} padding={"0px 24px 0px 24px"} spacing={1}>
        <Typography color={"primary"} variant="h2">
          {"สวัสดี " + data?.user?.thaiFirstName}
        </Typography>
        <Typography variant="body2">เช็คสิ่งที่ทำในวันนี้ แล้วส่งฟอร์มเมื่อเลิกงาน</Typography>
      </Stack>
      <Divider sx={{ borderWidth: "1px" }} />
      <Stack spacing={2} paddingX={4}>
        <Stack spacing={2}>
          <Stack direction="row" spacing={5} height={"24px"}>
            <Box width={"60%"} />
            <Stack direction="row" justifyContent={"space-between"} width="40%">
              <ThumbUp sx={{ width: "45%", color: "#145DFB" }} />
              <ScubaDiving sx={{ width: "45%" }} />
            </Stack>
          </Stack>
          <Stack direction="row" spacing={5}>
            <Box width={"60%"} />
            <Stack direction="row" justifyContent={"space-between"} width="40%">
              <Typography variant="body1" color={"primary"} width={"45%"} sx={{ textAlign: "center" }}>
                {`I've got it`}
              </Typography>
              <Typography variant="body1" width={"45%"} sx={{ textAlign: "center" }}>
                {`Deeper dive, please`}
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row" spacing={5}>
            <Box width={"60%"} />
            <Stack direction="row" justifyContent={"space-between"} width="40%">
              <Divider sx={{ width: "45%", borderColor: "#145DFB" }} />
              <Divider sx={{ width: "45%" }} />
            </Stack>
          </Stack>
        </Stack>
        <Stack spacing={2}>
          {data?.form?.questions.map((question) => (
            <>
              <Stack key={question.id} direction="row" spacing={5} sx={{ alignItems: "center" }}>
                <Typography variant="body1" width={"60%"} sx={{ verticalAlign: "middle" }}>
                  {question.question}
                </Typography>
                <Stack direction="row" justifyContent={"space-between"} width="40%">
                  <Radio
                    sx={{ width: "45%", color: "primary.main" }}
                    checked={answers.answers?.find((answer) => answer.questionId === question.id)?.answer === true}
                    onClick={() => onClick(question.id, true)}
                  />
                  <Radio
                    sx={{
                      width: "45%",
                      "&.Mui-checked": {
                        color: "secondary.dark",
                      },
                    }}
                    checked={answers.answers?.find((answer) => answer.questionId === question.id)?.answer === false}
                    onClick={() => onClick(question.id, false)}
                  />
                </Stack>
              </Stack>
            </>
          ))}
        </Stack>
      </Stack>
      <Stack direction="row" justifyContent="flex-end" spacing={2} padding={"0px 24px 0px 24px"}>
        <Button variant="text" color="secondary" sx={{ textDecoration: "underline" }} onClick={() => resetAnswer()}>
          ล้างฟอร์ม
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={!!answers.answers?.find((answer) => answer.answer === undefined)}
          onClick={() => {
            createMutation.mutate(answers);
            setSubmitted(true);
          }}
        >
          ส่ง
        </Button>
      </Stack>
    </Stack>
  );
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
          padding: "32px 0px 24px 0px",
        }}
      >
        {!isLoading &&
          (!submitted ? (
            error ? (
              <Typography variant="h1" sx={{ textAlign: "center" }}>
                {errorCode === "500" ? "Invalid form token" : "ฟอร์มนี้หมดอายุแล้ว กรุณาเปิดฟอร์มล่าสุดในเมลของท่าน"}
              </Typography>
            ) : (
              renderForm()
            )
          ) : (
            <Typography variant="h1" sx={{ textAlign: "center" }}>
              ส่งฟอร์มเรียบร้อย
            </Typography>
          ))}
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
