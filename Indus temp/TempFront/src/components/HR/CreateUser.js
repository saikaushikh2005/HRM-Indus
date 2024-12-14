import React, { useState } from 'react';
import axios from 'axios';
import { Box, Typography, Paper, Grid, TextField, Button, Alert, MenuItem, Select } from '@mui/material';
import Sidebar from '../HR/HRSidebar';

const initialFormData = {
  name: '',
  email: '',
  phone: '',
  username: '',
  password: '',
  role: '',
  hrId: '',
  managerId: ''
};

const CreateUser = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.role) newErrors.role = 'Role is required';

    if (formData.role === 'Manager' && !formData.hrId) newErrors.hrId = 'HR ID is required';
    if (formData.role === 'Employee') {
      if (!formData.hrId) newErrors.hrId = 'HR ID is required';
      if (!formData.managerId) newErrors.managerId = 'Manager ID is required';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      if (formData.role === 'Manager') {
        await axios.post('/manager/add', {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          username: formData.username,
          password: formData.password,
          role: formData.role // Add role here
        }, { params: { hr: formData.hrId } });
        setAlertMessage('A new Manager is created');
      } else {
        await axios.post('/user/add', {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          username: formData.username,
          password: formData.password,
          role: formData.role, // Add role here
        }, { params: { hr: formData.hrId, manager: formData.managerId } });
        setAlertMessage('A new Employee is added');
      }

      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);

      // Reset form
      setFormData(initialFormData);
      setErrors({});
    } catch (error) {
      console.error('Error creating user:', error.response ? error.response.data : error.message);
      setAlertMessage('Error creating user');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 3, overflowY: 'auto' }}>
        <Paper elevation={3} sx={{ padding: 3, maxWidth: 600, margin: '0 auto' }}>
          <Typography variant="h4" align="center" gutterBottom color="black">
            Create User
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={Boolean(errors.name)}
                  helperText={errors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                  type="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  error={Boolean(errors.phone)}
                  helperText={errors.phone}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  error={Boolean(errors.username)}
                  helperText={errors.username}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  error={Boolean(errors.password)}
                  helperText={errors.password}
                  type="password"
                />
              </Grid>
              <Grid item xs={12}>
                <Select
                  fullWidth
                  label="Role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  error={Boolean(errors.role)}
                >
                  <MenuItem value="">Select Role</MenuItem>
                  <MenuItem value="Manager">Manager</MenuItem>
                  <MenuItem value="Employee">Employee</MenuItem>
                </Select>
                {errors.role && <Typography color="error">{errors.role}</Typography>}
              </Grid>
              {formData.role === 'Manager' && (
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="HR ID"
                    name="hrId"
                    value={formData.hrId}
                    onChange={handleChange}
                    error={Boolean(errors.hrId)}
                    helperText={errors.hrId}
                  />
                </Grid>
              )}
              {formData.role === 'Employee' && (
                <>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="HR ID"
                      name="hrId"
                      value={formData.hrId}
                      onChange={handleChange}
                      error={Boolean(errors.hrId)}
                      helperText={errors.hrId}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Manager ID"
                      name="managerId"
                      value={formData.managerId}
                      onChange={handleChange}
                      error={Boolean(errors.managerId)}
                      helperText={errors.managerId}
                    />
                  </Grid>
                </>
              )}
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Create User
                </Button>
              </Grid>
            </Grid>
          </form>
          {showAlert && (
            <Alert severity="success" sx={{ mt: 2 }}>
              {alertMessage}
            </Alert>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default CreateUser;
