import { Button, Container, Modal, Stack, Typography } from "@mui/material";

export function DeleteEmployeeModal({
  isModalOpen,
  handleCloseModal,
  onSubmit,
}: {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  onSubmit: () => void;
}) {
  return (
    <Modal open={isModalOpen} onClose={handleCloseModal}>
      <Container
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "500px",
          bgcolor: "background.paper",
          transform: "translate(-50%, -50%)",
          padding: "24px",
          borderRadius: "6px",
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h1">Remove selected participants</Typography>
          <Stack direction="row" justifyContent={"flex-end"} spacing={2}>
            <Button
              variant="text"
              color="secondary"
              sx={{ fontStyle: "italic", textDecoration: "underline" }}
              onClick={() => {
                handleCloseModal();
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                onSubmit();
                handleCloseModal();
              }}
            >
              Remove
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Modal>
  );
}
