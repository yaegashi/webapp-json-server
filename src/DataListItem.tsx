import React from 'react';
import { DataType } from './types';
import { Card, CardContent, Typography, CardMedia, Grid, Alert } from '@mui/material';
import { Link } from 'react-router-dom';

interface DataListItemProps {
  item: DataType;
}

const DataListItem: React.FC<DataListItemProps> = ({ item }) => {
  try {
    const formattedDate = `${item.date.year}年${String(item.date.month).padStart(2, '0')}月${String(item.date.day).padStart(2, '0')}日`;

    return (
      <Link to={`/data/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <Card variant="outlined" style={{ margin: '1rem 0' }}>
          <Grid container>
            <Grid item xs={3}>
              <CardMedia
                component="img"
                image={item.image}
                alt={item.name}
                style={{ height: '8rem', objectFit: 'cover' }}
              />
            </Grid>
            <Grid item xs={9}>
              <CardContent>
                <Typography variant="h6">
                  {formattedDate} {item.name}
                </Typography>
                <Typography color="textSecondary">{item.meaning}</Typography>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Link>
    );
  } catch (error: unknown) {
    console.error('Error rendering DataListItem:', error);
    return (
      <Card variant="outlined" style={{ margin: '1rem 0' }}>
        <CardContent>
          <Alert severity="error">Error rendering item: {error instanceof Error ? error.message : 'Unknown error'}</Alert>
        </CardContent>
      </Card>
    );
  }
};

export default DataListItem;
