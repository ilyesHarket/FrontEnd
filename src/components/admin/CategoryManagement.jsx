import { useState, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Alert
} from '@mui/material';
import axios from 'axios';

function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/v1/categories/', {
        auth: {
          username: "admin",
          password: "admin"
        }
      });
      setCategories(response.data);
    } catch (error) {
      setError('Failed to fetch categories');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await axios.post('http://localhost:3001/api/v1/categories/', 
        { name: newCategory },
        {
          auth: {
            username: "admin",
            password: "admin"
          }
        }
      );

      setSuccess('Category created successfully');
      setNewCategory('');
      fetchCategories();
    } catch (error) {
      setError('Failed to create category');
    }
  };

  return (
    <Box>
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
        <TextField
          label="New Category Name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          required
          sx={{ mr: 2 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Create Category
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.id}</TableCell>
                <TableCell>{category.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default CategoryManagement; 