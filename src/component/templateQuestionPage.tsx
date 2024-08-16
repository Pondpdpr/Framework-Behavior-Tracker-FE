"use client";

import { getTemplateQuestion } from "@/api/templateQuestion";
import { CARD_STATUS, QuestionCard } from "@/component/questionCard";
import { BehaviorType, QuestionDto } from "@/type/question";
import { Button, Container, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
export default function TemplateQuestionPage() {
  const { data: questions } = useQuery({
    queryKey: ["template-question"],
    queryFn: getTemplateQuestion,
  });

  const [isCreating, setCreating] = useState(false);

  return (
    <Container sx={{ py: "50px", display: "flex", flexDirection: "column", gap: "8px" }}>
      <Stack spacing={7} alignItems={"flex-end"}>
        {questions?.map((question, index) => (
          <QuestionCard key={question?.id} label={`Question ${index}`} data={question} />
        ))}
        {isCreating ? (
          <QuestionCard
            label={`Question ${questions?.length}`}
            data={{ behavior: BehaviorType.ACTIVE_MINDFUL_LISTENING } as QuestionDto}
            onFinish={() => setCreating(false)}
            status={CARD_STATUS.CREATE}
          />
        ) : (
          <Button variant="contained" color="primary" sx={{ width: "60px" }} onClick={() => setCreating(true)}>
            Add
          </Button>
        )}
      </Stack>
    </Container>
  );
}
