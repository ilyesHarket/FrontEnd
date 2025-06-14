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
  Alert,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

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
      console.error('Error fetching categories:', error);
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
      setError(error.response?.data || 'Failed to create category');
      console.error('Error creating category:', error);
    }
  };

  const handleUpdate = async () => {
    if (!editingCategory) return;
    
    try {
      await axios.put(`http://localhost:3001/api/v1/categories/${editingCategory.id}`, 
        { name: editingCategory.name },
        {
          auth: {
            username: "admin",
            password: "admin"
          }
        }
      );

      setSuccess('Category updated successfully');
      setEditingCategory(null);
      fetchCategories();
    } catch (error) {
      setError(error.response?.data || 'Failed to update category');
      console.error('Error updating category:', error);
    }
  };

  const handleDelete = async () => {
    if (!categoryToDelete) return;

    try {
      await axios.delete(`http://localhost:3001/api/v1/categories/${categoryToDelete.id}`, {
        auth: {
          username: "admin",
          password: "admin"
        }
      });

      setSuccess('Category deleted successfully');
      setDeleteConfirmOpen(false);
      setCategoryToDelete(null);
      fetchCategories();
    } catch (error) {
      setError(error.response?.data || 'Failed to delete category');
      console.error('Error deleting category:', error);
    }
  };

  const openEditDialog = (category) => {
    setEditingCategory({
      id: category.id,
      name: category.name
    });
  };

  const openDeleteDialog = (category) => {
    setCategoryToDelete(category);
    setDeleteConfirmOpen(true);
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
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...categories].sort((a, b) => a.id - b.id).map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.id}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>
                  <IconButton onClick={() => openEditDialog(category)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => openDeleteDialog(category)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={!!editingCategory} onClose={() => setEditingCategory(null)}>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              label="Category Name"
              value={editingCategory?.name || ''}
              onChange={(e) => setEditingCategory(prev => ({ ...prev, name: e.target.value }))}
              required
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditingCategory(null)}>Cancel</Button>
          <Button onClick={handleUpdate} variant="contained" color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete the category "{categoryToDelete?.name}"?
          This will also delete all products in this category.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default CategoryManagement; 