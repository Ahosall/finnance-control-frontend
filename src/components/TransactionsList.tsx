import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

import {
  PaidOutlined as IncomeIcon,
  ReceiptLongOutlined as ExpenseIcon,
} from "@mui/icons-material";

import { TTransactionWithBalance } from "../services/transactions.service";

interface Props {
  transactions: TTransactionWithBalance[];
}

const TransactionsList = ({ transactions }: Props) => {
  const navigate = useNavigate();

  const toViewPage = (id: string) => navigate(`/transactions/${id}/`);

  return (
    <Table sx={{ width: "100%" }}>
      <TableHead>
        <TableRow>
          <TableCell>Data</TableCell>
          <TableCell>Descrição</TableCell>
          <TableCell>Categoria</TableCell>
          <TableCell align="center">Tipo</TableCell>
          <TableCell align="right">Valor</TableCell>
          <TableCell align="right">Saldo</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {transactions.map((row, idx) => (
          <TableRow
            key={idx + "-"}
            sx={{
              "&:last-child td, &:last-child th": { border: 0 },
              cursor: "pointer",
            }}
            onClick={() => toViewPage(row.id)}
            hover
          >
            <TableCell component="th" scope="row">
              {new Date(row.date).toLocaleDateString()}
            </TableCell>
            <TableCell>{row.description}</TableCell>
            <TableCell>{row.category.name}</TableCell>
            <TableCell align="center">
              {row.category.type === "INCOME" ? (
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
                color: row.balance < 0 ? "red" : "inherit",
                fontWeight: row.balance < 0 ? 600 : 400,
              }}
              align="right"
            >
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(row.balance)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TransactionsList;
