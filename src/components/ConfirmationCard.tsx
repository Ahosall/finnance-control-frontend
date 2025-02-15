import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Modal,
  Typography,
} from "@mui/material";

interface Props {
  title: string;
  message: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleAction: any;
  loading: boolean;
}

const ConfirmationCard = (props: Props) => {
  const { title, message, open, setOpen, handleAction, loading } = props;

  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        justifyItems: "center",
        alignContent: "center",
      }}
    >
      <Card sx={{ width: "370px" }}>
        <CardContent>
          <Typography variant="h5">{title}</Typography>
          <Typography sx={{ mt: 2 }}>{message}</Typography>
        </CardContent>
        <CardActions
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="contained"
            size="small"
            color="error"
            onClick={handleClose}
          >
            Não
          </Button>
          <Button
            variant="contained"
            size="small"
            color="success"
            loading={loading}
            onClick={handleAction}
          >
            Sim
          </Button>
        </CardActions>
      </Card>
    </Modal>
  );
};

export default ConfirmationCard;
