import { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import CategoryManagement from './admin/CategoryManagement';
import ProductManagement from './admin/ProductManagement';

function AdminPanel() {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 1200, margin: '0 auto', padding: 3 }}>
      <h1>Admin Panel</h1>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={selectedTab} onChange={handleTabChange}>
          <Tab label="Categories" />
          <Tab label="Products" />
        </Tabs>
      </Box>
      
      {selectedTab === 0 && <CategoryManagement />}
      {selectedTab === 1 && <ProductManagement />}
    </Box>
  );
}

export default AdminPanel; 