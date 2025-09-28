// app/v2/components/forms/CategoryForm.js
"use client";

import React from "react";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

export default function CategoryForm({ onSubmit: onSubmitProp }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    await onSubmitProp?.(data);
    reset();
  };

  return (
    <Box component={Paper} elevation={1} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Add Category
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Code"
              variant="outlined"
              {...register("code", { required: "Code is required" })}
              error={!!errors.code}
              helperText={errors.code?.message}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              {...register("name", { required: "Name is required" })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              multiline
              minRows={3}
              variant="outlined"
              {...register("description")}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained">
              Add
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
