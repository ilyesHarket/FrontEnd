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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    categoryId: ''
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/v1/products/', {
        auth: {
          username: "admin",
          password: "admin"
        }
      });
      setProducts(response.data);
    } catch (error) {
      setError('Failed to fetch products');
      console.error('Error fetching products:', error);
    }
  };

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
      const response = await axios.post('http://localhost:3001/api/v1/products/', 
        {
          name: newProduct.name,
          description: newProduct.description,
          price: parseFloat(newProduct.price),
          category: {
            id: parseInt(newProduct.categoryId)
          }
        },
        {
          auth: {
            username: "admin",
            password: "admin"
          }
        }
      );

      setSuccess('Product created successfully');
      setNewProduct({
        name: '',
        description: '',
        price: '',
        categoryId: ''
      });
      fetchProducts();
    } catch (error) {
      setError(error.response?.data || 'Failed to create product');
      console.error('Error creating product:', error);
    }
  };

  const handleUpdate = async () => {
    if (!editingProduct) return;
    
    try {
      await axios.put(`http://localhost:3001/api/v1/products/${editingProduct.id}`, 
        {
          name: editingProduct.name,
          description: editingProduct.description,
          price: parseFloat(editingProduct.price),
          category: {
            id: parseInt(editingProduct.categoryId)
          }
        },
        {
          auth: {
            username: "admin",
            password: "admin"
          }
        }
      );

      setSuccess('Product updated successfully');
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      setError(error.response?.data || 'Failed to update product');
      console.error('Error updating product:', error);
    }
  };

  const handleDelete = async () => {
    if (!productToDelete) return;

    try {
      await axios.delete(`http://localhost:3001/api/v1/products/${productToDelete.id}`, {
        auth: {
          username: "admin",
          password: "admin"
        }
      });

      setSuccess('Product deleted successfully');
      setDeleteConfirmOpen(false);
      setProductToDelete(null);
      fetchProducts();
    } catch (error) {
      setError(error.response?.data || 'Failed to delete product');
      console.error('Error deleting product:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const openEditDialog = (product) => {
    setEditingProduct({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      categoryId: product.category.id
    });
  };

  const openDeleteDialog = (product) => {
    setProductToDelete(product);
    setDeleteConfirmOpen(true);
  };

  return (
    <Box>
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            name="name"
            label="Product Name"
            value={newProduct.name}
            onChange={handleChange}
            required
          />
          <TextField
            name="description"
            label="Description"
            value={newProduct.description}
            onChange={handleChange}
            required
          />
          <TextField
            name="price"
            label="Price"
            type="number"
            value={newProduct.price}
            onChange={handleChange}
            required
          />
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Category</InputLabel>
            <Select
              name="categoryId"
              value={newProduct.categoryId}
              onChange={handleChange}
              label="Category"
              required
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Button type="submit" variant="contained" color="primary">
          Create Product
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
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...products].sort((a, b) => a.id - b.id).map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.category?.name}</TableCell>
                <TableCell>
                  <IconButton onClick={() => openEditDialog(product)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => openDeleteDialog(product)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={!!editingProduct} onClose={() => setEditingProduct(null)}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              name="name"
              label="Product Name"
              value={editingProduct?.name || ''}
              onChange={handleEditChange}
              required
            />
            <TextField
              name="description"
              label="Description"
              value={editingProduct?.description || ''}
              onChange={handleEditChange}
              required
            />
            <TextField
              name="price"
              label="Price"
              type="number"
              value={editingProduct?.price || ''}
              onChange={handleEditChange}
              required
            />
            <FormControl>
              <InputLabel>Category</InputLabel>
              <Select
                name="categoryId"
                value={editingProduct?.categoryId || ''}
                onChange={handleEditChange}
                label="Category"
                required
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditingProduct(null)}>Cancel</Button>
          <Button onClick={handleUpdate} variant="contained" color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete the product "{productToDelete?.name}"?
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

export default ProductManagement; 