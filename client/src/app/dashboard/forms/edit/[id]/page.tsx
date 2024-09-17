"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { toast } from "react-hot-toast";
import axios from "axios";
import { User } from "@/app/types/interface";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,
  Alert,
  Snackbar,
} from "@mui/material";

export default function EditUserPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<User>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get<User>(
          `https://dummyjson.com/users/${params.id}`
        );
        const user = response.data;
        Object.keys(user).forEach((key) => {
          setValue(key as keyof User, user[key as keyof User]);
        });
        console.log(user);
      } catch (error) {
        console.error("Error fetching user:", error);
        setError("Failed to load user data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [params.id, setValue]);

  const onSubmit: SubmitHandler<User> = async (data) => {
    try {
      await axios.post(`https://dummyjson.com/docs/users#users-update`, data);
      toast.success("User updated successfully");
      router.push("/dashboard/user");
    } catch (error) {
      console.error("Error updating user:", error);
      setError("Failed to update user");
    }
  };

  const handleCloseError = () => {
    setError(null);
  };

  if (isLoading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
          bgcolor: "white",
        }}
      >
        <CircularProgress />
      </Box>
    );

  return (
    <Container
      maxWidth={false}
      sx={{
        py: 4,
        bgcolor: "white",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <Paper
        elevation={3}
        sx={{ p: { xs: 2, sm: 3 }, width: "100%", maxWidth: "600px" }}
      >
        <Typography variant="h5" gutterBottom>
          Edit User
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                {...register("firstName", {
                  required: "First name is required",
                })}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                {...register("lastName", { required: "Last name is required" })}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Usia"
                type="number"
                {...register("age", { required: "Age is required" })}
                error={!!errors.age}
                helperText={errors.age?.message}
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
              </FormControl>
            </Grid>
          </Grid>
          <Box
            mt={3}
            display="flex"
            justifyContent="space-between"
            flexWrap="wrap"
          >
            <Button
              variant="outlined"
              sx={{ mb: { xs: 1, sm: 0 } }}
              onClick={() => router.push("/dashboard/user")}
            >
              Kembali
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Update User
            </Button>
          </Box>
        </form>
      </Paper>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseError}
      >
        <Alert
          onClose={handleCloseError}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
}
