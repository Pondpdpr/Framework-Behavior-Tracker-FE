"use client";
import { AppBar, Button, Toolbar } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";

export function AdminAppBar() {
  const router = useRouter();
  const pathname = usePathname();
  const pages = [
    {
      label: "Daily Email",
      link: "/admin/daily-email",
    },
    {
      label: "Reminder",
      link: "/admin/reminder",
    },
    {
      label: "Employee",
      link: "/admin/employee",
    },
    {
      label: "Admin Data",
      link: "/admin/data",
    },
  ];
  return (
    <AppBar position="sticky">
      <Toolbar>
        {pages.map((page) => {
          return (
            <Button
              onClick={() => router.push(page.link)}
              sx={{ width: "150px", color: pathname === page.link ? "primary.dark" : "white" }}
              key={page.label}
            >
              {page.label}
            </Button>
          );
        })}
      </Toolbar>
    </AppBar>
  );
}
