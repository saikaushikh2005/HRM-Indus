import React, { useState } from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, Button, Alert } from '@mui/material';
import Sidebar from '../Manager/ManagerSidebar';
import '../../styles/Manager/LeaveApproval.css';

const LeaveApproval = () => {
    const [leaveRequests, setLeaveRequests] = useState([
        {
            id: 1,
            employeeName: 'John Doe',
            position: 'Software Engineer',
            department: 'IT',
            leaveType: 'Annual Leave',
            startDate: '2024-07-30',
            endDate: '2024-08-02',
            reason: 'Family vacation'
        },
        {
            id: 2,
            employeeName: 'Jane Smith',
            position: 'Product Manager',
            department: 'Product',
            leaveType: 'Sick Leave',
            startDate: '2024-08-01',
            endDate: '2024-08-05',
            reason: 'Medical reasons'
        }
    ]);

    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [error, setError] = useState('');

    const handleAcceptLeave = (id) => {
        setLeaveRequests(leaveRequests.filter(request => request.id !== id));
        setFeedbackMessage('Leave request accepted successfully!');
        setError('');
    };

    const handleDenyLeave = (id) => {
        setLeaveRequests(leaveRequests.filter(request => request.id !== id));
        setFeedbackMessage('Leave request denied!');
        setError('');
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <Paper elevation={3} sx={{ padding: 3, marginBottom: 2 }}>
                    <Typography variant="h4" align="center" gutterBottom color="black">
                        Leave Approval
                    </Typography>
                </Paper>
                
                {feedbackMessage && (
                    <Alert severity="success" sx={{ mt: 2 }}>
                        {feedbackMessage}
                    </Alert>
                )}
                
                {error && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {error}
                    </Alert>
                )}

                <Grid container spacing={3}>
                    {leaveRequests.map(request => (
                        <Grid item xs={12} md={6} key={request.id}>
                            <Card elevation={3} sx={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
                                <CardContent>
                                    <Typography variant="h6" color="black">
                                        Employee Name: {request.employeeName}
                                    </Typography>
                                    <Typography variant="body2" color="black">
                                        Position: {request.position}
                                    </Typography>
                                    <Typography variant="body2" color="black">
                                        Department: {request.department}
                                    </Typography>
                                    <Typography variant="body2" color="black">
                                        Leave Type: {request.leaveType}
                                    </Typography>
                                    <Typography variant="body2" color="black">
                                        Start Date: {request.startDate}
                                    </Typography>
                                    <Typography variant="body2" color="black">
                                        End Date: {request.endDate}
                                    </Typography>
                                    <Typography variant="body2" color="black">
                                        Reason: {request.reason}
                                    </Typography>
                                    <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                                        <Button 
                                            variant="contained" 
                                            color="success" 
                                            onClick={() => handleAcceptLeave(request.id)}>
                                            Accept
                                        </Button>
                                        <Button 
                                            variant="contained" 
                                            color="error" 
                                            onClick={() => handleDenyLeave(request.id)}>
                                            Deny
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default LeaveApproval;
