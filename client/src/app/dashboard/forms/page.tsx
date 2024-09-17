"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Snackbar,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { styled } from "@mui/system";
import { User } from "@/app/types/interface";
import { useRouter } from "next/navigation";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

const EnhancedForm: React.FC = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    defaultValues: {
      firstName: "",
      lastName: "",
      age: 0,
      gender: "",
    },
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const onSubmit = async (data: User) => {
    try {
      const response = await axios.post(
        "https://dummyjson.com/users/add",
        data
      );

      console.log(response.data);
      setSnackbarMessage("User added successfully!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);

      router.push("/dashboard/user");
    } catch (error) {
      console.error("Error:", error);
      setSnackbarMessage("Failed to add user. Please try again.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        bgcolor: "white",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <StyledPaper elevation={3} sx={{ width: "100%" }}>
        <Typography variant="h4" gutterBottom>
          Add New User
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="firstName"
                control={control}
                rules={{ required: "First name is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="First Name"
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="lastName"
                control={control}
                rules={{ required: "Last name is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Last Name"
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="age"
                control={control}
                rules={{
                  required: "Age is required",
                  min: { value: 18, message: "Age must be at least 18" },
                  max: { value: 100, message: "Age must be at most 100" },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Usia"
                    type="number"
                    error={!!errors.age}
                    helperText={errors.age?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!errors.gender}>
                <InputLabel id="gender-label">Jenis Kelamin</InputLabel>
                <Controller
                  name="gender"
                  control={control}
                  rules={{ required: "Gender is required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      labelId="gender-label"
                      label="Jenis Kelamin"
                    >
                      <MenuItem value="male">Laki-laki</MenuItem>
                      <MenuItem value="female">Perempuan</MenuItem>
                    </Select>
                  )}
                />
                {errors.gender && (
                  <FormHelperText>{errors.gender.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>
          <Box mt={3} display="flex" justifyContent="flex-end">
            <Button
              variant="outlined"
              sx={{ mr: 1 }}
              onClick={() => router.push("/dashboard/user")}
            >
              Kembali
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Simpan
            </Button>
          </Box>
        </form>
      </StyledPaper>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default EnhancedForm;
