import React from 'react';
import { Box, Typography, Grid, Paper, Card, CardContent, LinearProgress } from '@mui/material';
import Sidebar from './EmployeeSidebar';
import '../../styles/Employee/Employee.css';

const EmployeeDashboard = () => {
    // Retrieve user data from local storage
    const storedUser = JSON.parse(localStorage.getItem('user')) || {};

    const employee = {
        name: storedUser.name, // Fetch name from storedUser or provide a fallback
        role: storedUser.role,
        completedTasks: 18,
        totalTasks: 25,
    };

    const completedPercentage = (employee.completedTasks / employee.totalTasks) * 100;
    const notCompletedTasks = employee.totalTasks - employee.completedTasks;

    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper elevation={3} sx={{ padding: 3 }}>
                            <Typography variant="h4" align="center" gutterBottom>
                                Employee Dashboard
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Card elevation={3}>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>
                                    Welcome, {employee.name}
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    Role: {employee.role}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Card elevation={3}>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>
                                    Task Completion
                                </Typography>
                                <Grid container spacing={2} justifyContent="center">
                                    <Grid item>
                                        <Typography variant="h6" color="primary">
                                            {employee.completedTasks}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Completed Tasks
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="h6" color="error">
                                            {notCompletedTasks}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Not Completed Tasks
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12}>
                        <Card elevation={3}>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>
                                    Overall Performance
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                    <Box sx={{ width: '100%', mr: 1 }}>
                                        <LinearProgress
                                            variant="determinate"
                                            value={completedPercentage}
                                            sx={{ height: '20px', borderRadius: '10px' }}
                                        />
                                    </Box>
                                    <Box sx={{ minWidth: 35 }}>
                                        <Typography variant="body2" color="textSecondary">{`${completedPercentage.toFixed(2)}%`}</Typography>
                                    </Box>
                                </Box>
                                <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 1 }}>
                                    {completedPercentage.toFixed(2)}% of tasks completed
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default EmployeeDashboard;
