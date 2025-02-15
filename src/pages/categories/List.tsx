import {
  Box,
  IconButton,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import {
  PaidOutlined as IncomeIcon,
  ReceiptLongOutlined as ExpenseIcon,
  EditOutlined as EditIcon,
} from "@mui/icons-material";
import { useCategories } from "../../hooks/categories.hook";
import { useAuth } from "../../hooks/auth.hook";
import CategoriesService from "../../services/categories.service";

const ListCategories = () => {
  const { token } = useAuth();
  const { categories } = useCategories();

  const showOnDashboard = async (categoryId: string, state: boolean) => {
    if (!token) return;

    const categoriesApi = new CategoriesService(token);
    await categoriesApi.updateCategory(categoryId, { showOnDashboard: state });
  };

  return (
    <Box>
      <Typography variant="h5">Categorias</Typography>
      <TableContainer component={Paper} sx={{ my: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell align="center">Categoria</TableCell>
              <TableCell align="center">Dashboard</TableCell>
              <TableCell align="center">Criada em</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow
                key={category.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{category.name}</TableCell>
                <TableCell align="center">
                  {category.type === "INCOME" ? (
                    <IncomeIcon color="info" />
                  ) : (
                    <ExpenseIcon color="error" />
                  )}
                </TableCell>
                <TableCell align="center">
                  <Switch
                    size="small"
                    defaultChecked={category.showOnDashboard}
                    onChange={(e) =>
                      showOnDashboard(category.id, e.target.checked)
                    }
                  />
                </TableCell>
                <TableCell align="center">
                  {new Date(category.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell align="center">
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ListCategories;
