"use client";
import TemplateEmailPage from "@/component/templateEmailPage";
import TemplateQuestionPage from "@/component/templateQuestionPage";
import { AppBar, Button, Toolbar } from "@mui/material";
import { useState } from "react";

export default function Page() {
  const [tab, setTab] = useState("question");
  const pages = [
    {
      label: "Form Template",
      state: "question",
    },
    {
      label: "Daily Message",
      state: "email",
    },
  ];
  return (
    <>
      <AppBar position="sticky" color="secondary" elevation={0}>
        <Toolbar>
          {pages.map((page) => {
            return (
              <Button
                onClick={() => setTab(page.state)}
                sx={{ width: "150px", color: tab === page.state ? "secondary.dark" : "white" }}
                key={page.label}
              >
                {page.label}
              </Button>
            );
          })}
        </Toolbar>
      </AppBar>
      {tab === "question" ? <TemplateQuestionPage /> : <TemplateEmailPage />}
    </>
  );
}
