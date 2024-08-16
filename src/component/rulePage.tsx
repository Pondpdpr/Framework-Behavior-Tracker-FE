"use client";

import { sendDaily, sendReminder, sendRule } from "@/api/email";
import { createRule, deleteRule, updateRule } from "@/api/rule";
import { MergeFieldOption } from "@/type/email";
import { RuleDto, RuleOption, RuleType } from "@/type/rule";
import { Button, MenuItem, Select, Stack, Switch, TextField, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

export enum CARD_STATUS {
  EDIT = "edit",
  CREATE = "create",
}

export function RulePage({
  data,
  status,
  onFinish,
  existingRule,
}: {
  data: RuleDto;
  status?: CARD_STATUS;
  onFinish: () => void;
  existingRule?: RuleType[];
}) {
  const [info, setInfo] = useState(data);
  const [cardStatus, setCardStatus] = useState(status);
  const [mergeField, setMergeField] = useState(MergeFieldOption[0].value);
  const queryClient = useQueryClient();
  const { register, handleSubmit, watch, setValue, reset } = useForm({ defaultValues: data });
  const formData = watch();

  const createMutation = useMutation({
    mutationFn: (newData: RuleDto) => createRule(newData),
    onSuccess: async () => await queryClient.refetchQueries({ queryKey: ["rule"] }),
  });
  const updateMutation = useMutation({
    mutationFn: (newData: RuleDto) => updateRule(newData),
    onSuccess: async () => await queryClient.refetchQueries({ queryKey: ["rule"] }),
  });
  const deleteMutation = useMutation({
    mutationFn: (newData: RuleDto) => deleteRule(newData),
    onSuccess: async () => await queryClient.refetchQueries({ queryKey: ["rule"] }),
  });
  const sendAllMutation = useMutation({
    mutationFn: (newData: { users?: number[] }) => sendDaily(newData),
  });
  const sendRuleMutation = useMutation({
    mutationFn: (newData: number) => sendRule(newData),
  });
  const sendReminderMutation = useMutation({
    mutationFn: (newData: { users?: number[] }) => sendReminder(newData),
  });

  useEffect(() => {
    setInfo(data);
    setCardStatus(status);
    reset(status === CARD_STATUS.CREATE ? ({ text: "", rule: RuleType.RULE_1 } as RuleDto) : data);
  }, [data, reset, status]);

  const availableRule = useMemo(() => {
    return RuleOption.filter((rule) => !existingRule?.includes(rule.value) || rule.value === info?.rule);
  }, [existingRule, info?.rule]);

  const noSwitch = [RuleType.DEFAULT, RuleType.REMINDER];
  const noRemove = [RuleType.DEFAULT, RuleType.TO_ALL, RuleType.REMINDER];
  const noSelect = [RuleType.DEFAULT, RuleType.TO_ALL, RuleType.REMINDER];
  const renderTopControl = () => {
    return (
      <Stack direction="row" spacing={2}>
        {!cardStatus ? (
          <>
            {!noSwitch.includes(info?.rule) && (
              <Switch
                checked={info?.isActive}
                onChange={() => {
                  updateMutation.mutate({ ...info, isActive: !info?.isActive });
                }}
              />
            )}
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                setCardStatus(CARD_STATUS.EDIT);
                reset(data);
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
                onFinish();
                setCardStatus(undefined);
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
                onFinish();
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

  const renderBottomControl = () => {
    return (
      <Stack direction="row" justifyContent="flex-end" spacing={2}>
        {!noRemove.includes(info?.rule) && (
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              deleteMutation.mutate({ ...info, isActive: !info?.isActive });
              onFinish();
              setCardStatus(undefined);
            }}
          >
            Remove
          </Button>
        )}
        <Button
          variant="contained"
          color="primary"
          disabled={!!cardStatus}
          onClick={() => {
            if (info?.rule === RuleType.TO_ALL) {
              sendAllMutation.mutate({});
            } else if (info?.rule === RuleType.REMINDER) {
              sendReminderMutation.mutate({});
            } else {
              sendRuleMutation.mutate(info?.id);
            }
          }}
        >
          {info?.rule === RuleType.TO_ALL ? "Send All" : "Send"}
        </Button>
      </Stack>
    );
  };

  return (
    <Stack spacing={6}>
      <Stack direction="row" sx={{ justifyContent: "space-between" }}>
        <Typography variant="h1">{info?.rule ?? "New Rule"}</Typography>
        {renderTopControl()}
      </Stack>
      <Stack spacing={2}>
        <Typography variant="body1" sx={{ width: "15%" }}>
          Condition:
        </Typography>
        {cardStatus && !noRemove.includes(info?.rule) ? (
          <Select
            defaultValue={info?.rule}
            value={formData.rule}
            onChange={(e) => setValue("rule", e.target.value as RuleType)}
          >
            {availableRule.map((rule) => (
              <MenuItem key={rule.value} value={rule.value}>
                {rule.label}
              </MenuItem>
            ))}
          </Select>
        ) : (
          <Typography variant="body2" sx={{ width: "auto" }}>
            {info?.rule}
          </Typography>
        )}
      </Stack>
      <Stack spacing={2}>
        <Typography variant="body1" sx={{ width: "15%" }}>
          Message:
        </Typography>
        {cardStatus ? (
          <Stack direction="row" spacing={2}>
            <TextField minRows={12} {...register("text", { required: true })} multiline sx={{ width: "80%" }} />
            <Stack width={"20%"} spacing={2}>
              <Select value={mergeField} onChange={(e) => setMergeField(e.target.value)}>
                {MergeFieldOption.map((field) => (
                  <MenuItem key={field.value} value={field.value}>
                    {field.label}
                  </MenuItem>
                ))}
              </Select>
              <Button
                variant="contained"
                color="primary"
                sx={{ width: "60px" }}
                onClick={() => setValue("text", formData.text.concat(mergeField))}
              >
                Add
              </Button>
            </Stack>
          </Stack>
        ) : (
          <Typography variant="body2" sx={{ width: "auto", whiteSpace: "pre-wrap" }}>
            {data?.text}
          </Typography>
        )}
      </Stack>
      {info?.rule !== RuleType.DEFAULT && renderBottomControl()}
    </Stack>
  );
}
