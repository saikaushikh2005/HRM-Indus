import React, { useState } from 'react';
import {
  Box, Typography, Paper, Grid, Card, CardContent, Button, TextField, Alert
} from '@mui/material';
import Sidebar from '../Manager/ManagerSidebar';
import './../../styles/Manager/TeamList.css';

const initialEmployeeData = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@indusit.com',
    phone: '123-456-7890',
    role: 'FrontEnd Developer',
    department: 'IT',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@indusit.com',
    phone: '098-765-4321',
    role: 'BackEnd Developer',
    department: 'IT',
  },
  {
    id: 3,
    name: 'Samuel Johnson',
    email: 'samuel.johnson@indusit.com',
    phone: '567-890-1234',
    role: 'Full Stack Developer',
    department: 'IT',
  },
  {
    id: 4,
    name: 'Michael Johnson',
    email: 'michaell.johnson@indusit.com',
    phone: '5127-1234-132',
    role: 'Full Stack Developer',
    department: 'IT',
  },
];

const TeamList = () => {
  const [employees, setEmployees] = useState(initialEmployeeData);
  const [isEditing, setIsEditing] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    department: '',
  });
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [error, setError] = useState('');

  const handleEditClick = (employee) => {
    setIsEditing(employee.id);
    setEditFormData(employee);
  };

  const handleSave = () => {
    if (!editFormData.name || !editFormData.email || !editFormData.phone || !editFormData.role || !editFormData.department) {
      setError('All fields are required');
      return;
    }
    const updatedEmployees = employees.map(employee =>
      employee.id === isEditing ? editFormData : employee
    );
    setEmployees(updatedEmployees);
    setIsEditing(null);
    setFeedbackMessage('Employee details updated successfully!');
    setError('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleCancel = () => {
    setIsEditing(null);
    setError('');
  };

  const handleDelete = (id) => {
    const updatedEmployees = employees.filter(employee => employee.id !== id);
    setEmployees(updatedEmployees);
    setFeedbackMessage('Employee deleted successfully!');
    setError('');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h4" align="center" gutterBottom color="black">
            Team List
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

        <Grid container spacing={3} sx={{ mt: 3 }}>
          {employees.map(employee => (
            <Grid item xs={12} md={6} key={employee.id}>
              <Card elevation={3} sx={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
                <CardContent>
                  {isEditing === employee.id ? (
                    <>
                      <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        value={editFormData.name}
                        onChange={handleChange}
                        margin="normal"
                      />
                      <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        value={editFormData.email}
                        onChange={handleChange}
                        margin="normal"
                        type="email"
                      />
                      <TextField
                        fullWidth
                        label="Phone"
                        name="phone"
                        value={editFormData.phone}
                        onChange={handleChange}
                        margin="normal"
                      />
                      <TextField
                        fullWidth
                        label="Role"
                        name="role"
                        value={editFormData.role}
                        onChange={handleChange}
                        margin="normal"
                      />
                      <TextField
                        fullWidth
                        label="Department"
                        name="department"
                        value={editFormData.department}
                        onChange={handleChange}
                        margin="normal"
                      />
                      <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={handleSave}
                        >
                          Save
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={handleCancel}
                        >
                          Cancel
                        </Button>
                      </Box>
                    </>
                  ) : (
                    <>
                      <Typography variant="h6" color="black">
                        {employee.name}
                      </Typography>
                      <Typography variant="body2" color="black">
                        <strong>Email:</strong> {employee.email}
                      </Typography>
                      <Typography variant="body2" color="black">
                        <strong>Phone:</strong> {employee.phone}
                      </Typography>
                      <Typography variant="body2" color="black">
                        <strong>Role:</strong> {employee.role}
                      </Typography>
                      <Typography variant="body2" color="black">
                        <strong>Department:</strong> {employee.department}
                      </Typography>
                      <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleEditClick(employee)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleDelete(employee.id)}
                        >
                          Delete
                        </Button>
                      </Box>
                    </>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default TeamList;
