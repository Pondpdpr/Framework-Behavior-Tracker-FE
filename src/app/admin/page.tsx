import { Typography } from "@mui/material";

export default function Page() {
  return (
    <Typography
      sx={{ fontSize: "80px", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
      align="center"
    >{`Welcome to Framework's Behavior Tracker`}</Typography>
  );
}
