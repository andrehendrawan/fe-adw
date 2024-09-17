"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Typography,
  Box,
  Container,
  Paper,
  Grid,
  CircularProgress,
  Breadcrumbs,
  Link,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import axios from "axios";
import { UserDetails } from "@/app/types/interface";

export default function UserDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [user, setUser] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/users/${id}`);
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch user details");
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [id]);

  if (loading) {
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
  }

  if (error) {
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
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: "white",
        minHeight: "100vh",
      }}
    >
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Container maxWidth="lg">
          <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
            <Link
              href="/dashboard"
              sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
              onClick={(e) => {
                e.preventDefault();
                router.push("/dashboard");
              }}
            >
              <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Dashboard
            </Link>
            <Link
              href="/dashboard"
              sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
              onClick={(e) => {
                e.preventDefault();
                router.push("/dashboard");
              }}
            >
              <PersonIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Users
            </Link>
            <Typography color="text.primary">User Details</Typography>
          </Breadcrumbs>

          <Typography variant="h4" component="h1" gutterBottom>
            User Details
          </Typography>

          {user && (
            <Paper elevation={3} sx={{ p: 3, mt: 3, bgcolor: "white" }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <img
                    src={user.image}
                    alt={user.firstName}
                    style={{ width: "100%", borderRadius: "8px" }}
                  />
                </Grid>
                <Grid item xs={12} md={8}>
                  <Typography
                    variant="h5"
                    gutterBottom
                  >{`${user.firstName} ${user.lastName}`}</Typography>
                  <Typography variant="body1" gutterBottom>
                    Username: {user.username}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Email: {user.email}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Age: {user.age}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Gender: {user.gender}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Phone: {user.phone}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Birth Date: {user.birthDate}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Address:{" "}
                    {`${user.address.address}, ${user.address.city}, ${user.address.state} ${user.address.postalCode}`}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Company: {user.company.name}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Job Title: {user.company.title}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Department: {user.company.department}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          )}

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
