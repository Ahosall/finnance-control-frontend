import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid2 as Grid,
  IconButton,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import {
  ICategory,
  listCategories,
  listTransactions,
} from "../../services/api";

import {
  PaidOutlined as IncomeIcon,
  ReceiptLongOutlined as ExpenseIcon,
  FilterAltOutlined as EnableFilterIcon,
  FilterAltOffOutlined as DisableFilterIcon,
} from "@mui/icons-material";

interface IRow {
  date: Date;
  description: string;
  category: string;
  type: string;
  amount: number;
  total: number;
}

const ListTransactions = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [rows, setRows] = useState<IRow[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const createData = (
    data: {
      date: Date;
      description: string;
      categoryId: string;
      amount: number;
    },
    categories: ICategory[]
  ) => {
    const { date, description, categoryId, amount } = data;
    const category = categories.find((c) => c.id === categoryId);
    return {
      date,
      description,
      category: category ? category.name : "",
      type: category ? category.type : "",
      amount,
      total: 0,
    };
  };

  useEffect(() => {
    (async () => {
      const categoriesApi = await listCategories();
      setCategories(categoriesApi);

      const transactionsApi = await listTransactions();
      const newRows = transactionsApi
        .reverse()
        .map((transaction) => createData(transaction, categoriesApi))
        .reduce((acc: any, item, index) => {
          const previousTotal = index > 0 ? acc[index - 1].total : 0;
          const total =
            item.type === "INCOME"
              ? previousTotal + item.amount
              : previousTotal - item.amount;

          return [...acc, { ...item, total }];
        }, [])
        .reverse();
      setRows(newRows);
    })();
  }, []);

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5">Transações</Typography>
        <IconButton onClick={() => setShowFilters(!showFilters)}>
          {showFilters ? <DisableFilterIcon /> : <EnableFilterIcon />}
        </IconButton>
      </Box>

      <Card sx={{ display: showFilters ? "block" : "none", mt: 3 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={4}>
              <TextField
                variant="outlined"
                label="Pesquise data/descrição/valor"
                fullWidth
              />
            </Grid>
            <Grid size={3}>
              <TextField
                variant="outlined"
                select
                label="Categoria"
                defaultValue="dflt"
                fullWidth
              >
                <MenuItem key="dflt" value="dflt">
                  Todas
                </MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size={2}>
              <TextField
                variant="outlined"
                type="date"
                defaultValue={new Date().toISOString().slice(0, 8) + "01"}
                fullWidth
              />
            </Grid>
            <Grid size={2}>
              <TextField
                variant="outlined"
                type="date"
                defaultValue={new Date().toISOString().slice(0, 10)}
                fullWidth
              />
            </Grid>
            <Grid size={1}>
              <Button variant="contained" sx={{ height: "100%" }}>
                Filtrar
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Table sx={{ width: "100%" }}>
            <TableHead>
              <TableRow>
                <TableCell>Data</TableCell>
                <TableCell>Descrição</TableCell>
                <TableCell>Categoria</TableCell>
                <TableCell align="center">Tipo</TableCell>
                <TableCell align="right">Valor</TableCell>
                <TableCell align="right">Balança</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, idx) => (
                <TableRow
                  key={idx + "-"}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.date.toLocaleDateString()}
                  </TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell align="center">
                    {row.type === "INCOME" ? (
                      <IncomeIcon color="info" />
                    ) : (
                      <ExpenseIcon color="error" />
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(row.amount)}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: row.total < 0 ? "red" : "inherit",
                      fontWeight: row.total < 0 ? 600 : 400,
                    }}
                    align="right"
                  >
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(row.total)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ListTransactions;
