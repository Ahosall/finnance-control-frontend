import { Card, CardContent, Typography } from "@mui/material";

interface Props {
  name: string;
  total: number;
}

const Category = ({ name, total }: Props) => {
  return (
    <Card sx={{ width: "100%" }}>
      <CardContent>
        <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
          {name}
        </Typography>
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
