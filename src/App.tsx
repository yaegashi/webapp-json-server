import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import DataList from './DataList';
import DataDetail from './DataDetail';

const App: React.FC = () => {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Button component={Link} to="/" color="inherit">
            <Typography variant="h6">
              2024年 日本の祝日
            </Typography>
          </Button>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<DataList />} />
        <Route path="/data/:id" element={<DataDetail />} />
      </Routes>
    </Router>
  );
};

export default App;  
