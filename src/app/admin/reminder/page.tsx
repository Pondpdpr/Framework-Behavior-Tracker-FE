"use client";

import { getRule } from "@/api/rule";
import { RulePage } from "@/component/rulePage";
import { RuleDto } from "@/type/rule";
import { Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

export default function Page() {
  const { data: rules } = useQuery({
    queryKey: ["rule"],
    queryFn: () => getRule({ isReminder: true }),
  });

  return (
    <Container sx={{ padding: "40px 0px 40px 0px" }}>
      <RulePage data={rules ? rules[0] : ({} as RuleDto)} onFinish={() => {}} />
    </Container>
  );
}
