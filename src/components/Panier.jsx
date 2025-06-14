import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Button,
  TextField,
  Alert,
  Divider
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import axios from 'axios';

function Panier() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const authConfig = {
    auth: {
      username: "admin",
      password: "admin"
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const [cartResponse, totalResponse] = await Promise.all([
        axios.get('http://localhost:3001/api/v1/cart', authConfig),
        axios.get('http://localhost:3001/api/v1/cart/total', authConfig)
      ]);
      setCartItems(cartResponse.data);
      setTotal(totalResponse.data);
    } catch (error) {
      setError('Failed to fetch cart items');
      console.error('Error fetching cart:', error);
    }
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const item = cartItems.find(item => item.productId === productId);
      if (!item) return;

      await axios.put('http://localhost:3001/api/v1/cart/update', 
        {
          productId: productId,
          quantity: newQuantity
        },
        authConfig
      );

      setSuccess('Cart updated successfully');
      fetchCart();
    } catch (error) {
      setError('Failed to update quantity');
      console.error('Error updating quantity:', error);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      await axios.delete(
        `http://localhost:3001/api/v1/cart/remove?productId=${productId}`,
        authConfig
      );
      setSuccess('Item removed successfully');
      fetchCart();
    } catch (error) {
      setError('Failed to remove item');
      console.error('Error removing item:', error);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: '0 auto' }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Shopping Cart
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      {cartItems.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>
          Your cart is empty
        </Typography>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Product</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>Price</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Quantity</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>Subtotal</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow 
                    key={item.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Link 
                        to={`/product/${item.productId}`}
                        style={{ 
                          textDecoration: 'none', 
                          color: 'inherit',
                          '&:hover': {
                            textDecoration: 'underline'
                          }
                        }}
                      >
                        {item.productName}
                      </Link>
                    </TableCell>
                    <TableCell align="right">
                      ${item.price.toFixed(2)}
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <IconButton
                          size="small"
                          onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <TextField
                          value={item.quantity}
                          size="small"
                          sx={{ width: '60px', mx: 1 }}
                          inputProps={{ 
                            min: 1, 
                            style: { textAlign: 'center' },
                            'aria-label': 'quantity'
                          }}
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            if (!isNaN(value) && value > 0) {
                              handleQuantityChange(item.productId, value);
                            }
                          }}
                        />
                        <IconButton
                          size="small"
                          onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      ${(item.price * item.quantity).toFixed(2)}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="error"
                        onClick={() => handleRemoveItem(item.productId)}
                        aria-label="remove item"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Paper sx={{ p: 2, minWidth: 200 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Total: ${total.toFixed(2)}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 1 }}
              >
                Proceed to Checkout
              </Button>
            </Paper>
          </Box>
        </>
      )}
    </Box>
  );
}

export default Panier;
