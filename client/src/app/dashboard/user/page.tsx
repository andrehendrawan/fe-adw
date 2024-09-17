"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Pagination,
  Select,
  MenuItem,
  Typography,
  Box,
  Container,
  Link,
  IconButton,
  Breadcrumbs,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import SortIcon from "@mui/icons-material/Sort";
import FilterListIcon from "@mui/icons-material/FilterList";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import { AppDispatch, RootState } from "@/store";
import { fetchUsers } from "@/store/thunks/userThunks";
import { selectUsers, selectUserTotal } from "@/store/selectors/userSelectors";
import {
  setPage,
  setPageSize,
  setSearchTerm,
  setSortField,
  setSortOrder,
  setFilterAge,
  resetFilters,
} from "@/store/slices/userSlice";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector(selectUsers);
  const total = useSelector(selectUserTotal);
  const {
    status,
    error,
    page,
    pageSize,
    searchTerm,
    sortField,
    sortOrder,
    filterAge,
  } = useSelector((state: RootState) => state.user);
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch, page, pageSize, searchTerm, sortField, sortOrder, filterAge]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    dispatch(setSearchTerm(localSearchTerm));
  };

  const handleRefresh = () => {
    dispatch(resetFilters());
    setLocalSearchTerm("");
    dispatch(fetchUsers());
  };

  const handleSort = () => {
    if (!sortField) {
      dispatch(setSortField("username"));
      dispatch(setSortOrder("asc"));
    } else if (sortOrder === "asc") {
      dispatch(setSortOrder("desc"));
    } else {
      dispatch(setSortField(""));
      dispatch(setSortOrder("asc"));
    }
  };

  const handleFilter = () => {
    const age = prompt("Enter age to filter:");
    if (age !== null) {
      dispatch(setFilterAge(age));
    }
  };

  const handleAddNewUser = () => {
    router.push("/dashboard/forms");
  };

  if (status === "loading") {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (status === "failed") {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ display: "flex", bgcolor: "white" }}>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Container maxWidth="lg">
          <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
            <Link href="#" sx={{ display: "flex", alignItems: "center" }}>
              <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Dashboard
            </Link>
            <Typography color="text.primary">User</Typography>
          </Breadcrumbs>

          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ color: "black" }}
          >
            User List
          </Typography>

          <Box sx={{ mb: 2, display: "flex", alignItems: "center" }}>
            <TextField
              placeholder="Search"
              variant="outlined"
              size="small"
              value={localSearchTerm}
              onChange={handleSearch}
              onKeyPress={(e) => e.key === "Enter" && handleSearchSubmit()}
              sx={{ mr: 1, flexGrow: 1 }}
            />
            <Button
              variant="contained"
              onClick={handleSearchSubmit}
              sx={{ mr: 1 }}
            >
              Search
            </Button>
            <IconButton onClick={handleRefresh} sx={{ mr: 1 }}>
              <RefreshIcon />
            </IconButton>
            <IconButton onClick={handleSort} sx={{ mr: 1 }}>
              <SortIcon />
            </IconButton>
            <IconButton onClick={handleFilter} sx={{ mr: 1 }}>
              <FilterListIcon />
            </IconButton>
            {isMobile ? (
              <IconButton
                color="inherit"
                onClick={handleAddNewUser}
                sx={{ bgcolor: "orange", "&:hover": { bgcolor: "darkorange" } }}
              >
                <AddIcon />
              </IconButton>
            ) : (
              <Button
                variant="contained"
                color="warning"
                startIcon={<AddIcon />}
                onClick={handleAddNewUser}
                sx={{ bgcolor: "orange", "&:hover": { bgcolor: "darkorange" } }}
              >
                Add New User
              </Button>
            )}
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Aksi</TableCell>
                  <TableCell>User</TableCell>
                  <TableCell>Password</TableCell>
                  <TableCell>Usia</TableCell>
                  <TableCell>Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      {isMobile ? (
                        <>
                          <IconButton
                            size="small"
                            color="primary"
                            component={Link}
                            href={`/dashboard/user/${user.id}`}
                            sx={{ mb: 1 }}
                          >
                            <VisibilityIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="secondary"
                            component={Link}
                            href={`/dashboard/forms/edit/${user.id}`}
                          >
                            <EditIcon />
                          </IconButton>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="contained"
                            size="small"
                            component={Link}
                            href={`/dashboard/user/${user.id}`}
                            sx={{ mr: 1 }}
                          >
                            LIHAT
                          </Button>
                          <Button
                            variant="contained"
                            size="small"
                            color="secondary"
                            component={Link}
                            href={`/dashboard/forms/edit/${user.id}`}
                          >
                            EDIT
                          </Button>
                        </>
                      )}
                    </TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.password}</TableCell>
                    <TableCell>{user.age}</TableCell>
                    <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="body2" color="black">
              Showing {(page - 1) * pageSize + 1} to{" "}
              {Math.min(page * pageSize, total)} of {total} rows
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Select
                value={pageSize}
                onChange={(e) => dispatch(setPageSize(Number(e.target.value)))}
                size="small"
                sx={{ mr: 1 }}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
              <Typography variant="body2" color="black">
                records per page
              </Typography>
            </Box>
            <Pagination
              count={Math.ceil(total / pageSize)}
              page={page}
              onChange={(_, newPage) => dispatch(setPage(newPage))}
              shape="rounded"
            />
          </Box>

          <Box component="footer" sx={{ mt: 8, textAlign: "center" }}>
            <Link href="#" sx={{ mr: 2 }}>
              Privacy Policy
            </Link>
            <Link href="#" sx={{ mr: 2 }}>
              Licensing
            </Link>
            <Link href="#" sx={{ mr: 2 }}>
              Contact
            </Link>
            <Typography variant="body2" color="text.secondary">
              Copyright PT Anggada Duta Wisesa © 2019-2023 | iProc v.1.0. All
              rights reserved. | New Theme
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
