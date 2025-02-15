import { Card, CardContent, Grid2 as Grid, Typography } from "@mui/material";

import {
  PaidOutlined as IncomeIcon,
  ReceiptLongOutlined as ExpenseIcon,
} from "@mui/icons-material";

interface Props {
  name: string;
  total: number;
  type: "INCOME" | "EXPENSE";
}

const Category = ({ name, total, type }: Props) => {
  return (
    <Card sx={{ width: "100%" }}>
      <CardContent>
        <Grid container flexWrap="nowrap" spacing={1}>
          <Grid size={2}>
            {type === "INCOME" ? (
              <IncomeIcon color="info" />
            ) : (
              <ExpenseIcon color="error" />
            )}
          </Grid>
          <Grid size="auto">
            <Typography
              gutterBottom
              sx={{ color: "text.secondary", fontSize: 14 }}
            >
              {name}
            </Typography>
          </Grid>
        </Grid>
        <Typography sx={{ fontWeight: 500, fontSize: 32 }} component="div">
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(total)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Category;
