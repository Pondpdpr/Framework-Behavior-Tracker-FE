"use client";

import { getRule } from "@/api/rule";
import { RuleDto, RuleType } from "@/type/rule";
import {
  Box,
  Button,
  Container,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { CARD_STATUS, RulePage } from "./rulePage";
export default function TemplateEmailPage() {
  const { data: rules } = useQuery({
    queryKey: ["rule"],
    queryFn: () => getRule({ isReminder: false }),
  });

  const [currentRule, setCurrentRule] = useState<RuleType | undefined>(RuleType.DEFAULT);
  const [isCreating, setCreating] = useState(false);

  const existingRule = useMemo(() => {
    return rules?.map((rule) => rule?.rule);
  }, [rules]);

  return (
    <Stack direction="row" minHeight={"calc(100% - 128px)"}>
      <Box color={"secondary.dark"} sx={{ width: "200px", backgroundColor: "secondary.light" }}>
        <List disablePadding sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <ListItem
            sx={{
              backgroundColor: `${currentRule === RuleType.DEFAULT && "#f0f0f0"}`,
              color: currentRule === RuleType.DEFAULT ? "secondary.dark" : "white",
            }}
          >
            <ListItemButton
              onClick={() => {
                setCreating(false);
                setCurrentRule(RuleType.DEFAULT);
              }}
            >
              <ListItemText primary="Default" sx={{ textAlign: "center" }} />
            </ListItemButton>
          </ListItem>
          {rules?.map(
            (rule) =>
              rule?.rule !== RuleType.DEFAULT &&
              rule?.rule !== RuleType.TO_ALL && (
                <ListItem
                  key={rule?.id}
                  sx={{
                    backgroundColor: `${currentRule === rule?.rule && "#f0f0f0"}`,
                    color: currentRule === rule?.rule ? "secondary.dark" : "white",
                  }}
                >
                  <ListItemButton
                    onClick={() => {
                      setCreating(false);
                      setCurrentRule(rule?.rule);
                    }}
                  >
                    <ListItemText primary={rule?.rule} sx={{ textAlign: "center" }} />
                  </ListItemButton>
                </ListItem>
              )
          )}
          {!isCreating && (
            <Button
              variant="contained"
              color="primary"
              sx={{ width: "80px", margin: "10px" }}
              onClick={() => {
                setCurrentRule(undefined);
                setCreating(true);
              }}
            >
              <Typography variant="button" sx={{ textAlign: "center" }}>
                Add
              </Typography>
            </Button>
          )}
        </List>
      </Box>
      <Container sx={{ padding: "40px 0px 40px 0px" }}>
        <Stack spacing={4}>
          {isCreating ? (
            <RulePage
              data={{} as RuleDto}
              status={CARD_STATUS.CREATE}
              onFinish={() => {
                setCurrentRule(RuleType.DEFAULT);
                setCreating(false);
              }}
              existingRule={existingRule}
            />
          ) : (
            currentRule &&
            rules && (
              <>
                <RulePage
                  data={rules?.find((rule) => rule.rule === currentRule) as RuleDto}
                  existingRule={existingRule}
                  onFinish={() => {
                    setCurrentRule(RuleType.DEFAULT);
                    setCreating(false);
                  }}
                />

                {currentRule === RuleType.DEFAULT && (
                  <>
                    <Divider />
                    <RulePage
                      onFinish={() => {
                        setCurrentRule(RuleType.DEFAULT);
                        setCreating(false);
                      }}
                      data={rules?.find((rule) => rule.rule === RuleType.TO_ALL) as RuleDto}
                    />
                  </>
                )}
              </>
            )
          )}
        </Stack>
      </Container>
    </Stack>
  );
}
