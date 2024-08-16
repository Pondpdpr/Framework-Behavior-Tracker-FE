"use client";
import { createTemplateQuestion, deleteTemplateQuestion, updateTemplateQuestion } from "@/api/templateQuestion";
import { BehaviorOption, BehaviorType, QuestionDto } from "@/type/question";
import {
  Button,
  Card,
  CardContent,
  Container,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useState } from "react";
import { useForm } from "react-hook-form";

export enum CARD_STATUS {
  EDIT = "edit",
  CREATE = "create",
}

export function QuestionCard({
  label,
  data,
  status,
  onFinish,
}: {
  label: string;
  data: QuestionDto;
  status?: CARD_STATUS;
  onFinish?: () => void;
}) {
  const queryClient = useQueryClient();
  const [cardStatus, setCardStatus] = useState(status);
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: data,
  });
  const formData = watch();

  const createMutation = useMutation({
    mutationFn: (newData: QuestionDto) => createTemplateQuestion(newData),
    onSuccess: async () => await queryClient.refetchQueries({ queryKey: ["template-question"] }),
  });
  const updateMutation = useMutation({
    mutationFn: (newData: QuestionDto) => updateTemplateQuestion(newData),
    onSuccess: async () => await queryClient.refetchQueries({ queryKey: ["template-question"] }),
  });
  const deleteMutation = useMutation({
    mutationFn: (newData: QuestionDto) => deleteTemplateQuestion(newData),
    onSuccess: async () => await queryClient.refetchQueries({ queryKey: ["template-question"] }),
  });

  const renderQuestionControl = () => {
    return (
      <Stack direction="row" justifyContent="flex-end" spacing={2}>
        {!cardStatus ? (
          <>
            <Switch
              checked={data.isActive}
              onChange={() => {
                updateMutation.mutate({ ...data, isActive: !data.isActive });
              }}
            />
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                deleteMutation.mutate({ ...data, isActive: !data.isActive });
              }}
            >
              Remove
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                setCardStatus(CARD_STATUS.EDIT);
              }}
            >
              Edit
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="text"
              color="error"
              sx={{ fontStyle: "italic", textDecoration: "underline" }}
              onClick={() => {
                setCardStatus(undefined);
                onFinish && onFinish();
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                handleSubmit((data) =>
                  cardStatus === CARD_STATUS.EDIT ? updateMutation.mutate(data) : createMutation.mutate(data)
                )();
                onFinish && onFinish();
                setCardStatus(undefined);
              }}
            >
              Save
            </Button>
          </>
        )}
      </Stack>
    );
  };

  return (
    <Container>
      <Card>
        <CardContent>
          <Stack spacing={4}>
            <Typography variant="body1">{label}</Typography>
            <Stack direction="row">
              <Typography variant="body1" sx={{ width: "15%" }}>
                Question:
              </Typography>
              {cardStatus ? (
                <TextField minRows={3} {...register("question", { required: true })} multiline sx={{ width: "80%" }} />
              ) : (
                <Typography variant="body2" sx={{ width: "auto" }}>
                  {data.question}
                </Typography>
              )}
            </Stack>
            <Stack direction="row">
              <Typography variant="body1" sx={{ width: "15%" }}>
                Bahavior:
              </Typography>
              {cardStatus ? (
                <Select
                  defaultValue={data.behavior}
                  value={formData.behavior}
                  onChange={(e) => setValue("behavior", e.target.value as BehaviorType)}
                >
                  {BehaviorOption.map((behavior) => (
                    <MenuItem key={behavior.value} value={behavior.value}>
                      {behavior.label}
                    </MenuItem>
                  ))}
                </Select>
              ) : (
                <Typography variant="body2" sx={{ width: "auto" }}>
                  {BehaviorOption.find((behavior) => behavior.value === data.behavior)?.label}
                </Typography>
              )}
            </Stack>
            {renderQuestionControl()}
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}
