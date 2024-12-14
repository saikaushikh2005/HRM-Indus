import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Paper } from '@mui/material';
import Sidebar from '../Employee/EmployeeSidebar';

const EditPersonalDetailsPage = () => {
    const [details, setDetails] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        username: 'johndoe',
        password: '',
        phoneNumber: '123-456-7890',
    });

    const [errors, setErrors] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDetails({ ...details, [name]: value });
    };

    const validate = () => {
        let isValid = true;
        const newErrors = {};

        if (!details.name.trim()) {
            newErrors.name = 'Name is required';
            isValid = false;
        }
        if (!details.email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
            newErrors.email = 'Invalid email address';
            isValid = false;
        }
        if (!details.username.trim()) {
            newErrors.username = 'Username is required';
            isValid = false;
        }
        if (details.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long';
            isValid = false;
        }
        if (!details.phoneNumber.match(/^\d{3}-\d{3}-\d{4}$/)) {
            newErrors.phoneNumber = 'Invalid phone number format';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log('Updated details:', details);
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Box sx={{ flexGrow: 1, p: 3, bgcolor: '#e0e0e0', height: '100vh', overflow: 'auto' }}>
                <Paper elevation={3} sx={{ padding: 3, bgcolor: 'white' }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Edit Personal Details
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="name"
                                    name="name"
                                    label="Name"
                                    variant="outlined"
                                    value={details.name}
                                    onChange={handleChange}
                                    error={Boolean(errors.name)}
                                    helperText={errors.name}
                                    sx={{ bgcolor: 'white' }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="email"
                                    name="email"
                                    label="Email"
                                    type="email"
                                    variant="outlined"
                                    value={details.email}
                                    onChange={handleChange}
                                    error={Boolean(errors.email)}
                                    helperText={errors.email}
                                    sx={{ bgcolor: 'white' }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="username"
                                    name="username"
                                    label="Username"
                                    variant="outlined"
                                    value={details.username}
                                    onChange={handleChange}
                                    error={Boolean(errors.username)}
                                    helperText={errors.username}
                                    sx={{ bgcolor: 'white' }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="password"
                                    name="password"
                                    label="Password"
                                    type="password"
                                    variant="outlined"
                                    value={details.password}
                                    onChange={handleChange}
                                    error={Boolean(errors.password)}
                                    helperText={errors.password}
                                    sx={{ bgcolor: 'white' }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    label="Phone Number"
                                    variant="outlined"
                                    value={details.phoneNumber}
                                    onChange={handleChange}
                                    error={Boolean(errors.phoneNumber)}
                                    helperText={errors.phoneNumber}
                                    sx={{ bgcolor: 'white' }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    sx={{ mt: 2 }}
                                >
                                    Request Edit
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
                <Dialog open={isModalOpen} onClose={closeModal}>
                    <DialogTitle>Success</DialogTitle>
                    <DialogContent>
                        <Typography>
                            Your request has been submitted!
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeModal} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    );
};

export default EditPersonalDetailsPage;
