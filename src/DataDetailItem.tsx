import React from 'react';
import { DataType } from './types';
import { Card, CardContent, Typography, CardMedia, Grid } from '@mui/material';

interface DataDetailItemProps {
  item: DataType;
}

const DataDetailItem: React.FC<DataDetailItemProps> = ({ item }) => {
  return (
    <Card variant="outlined">
      <Grid container>
        <Grid item xs={4}>
          <CardMedia
            component="img"
            image={item.image}
            alt={item.name}
            style={{ width: '100%', maxWidth: '400px', objectFit: 'contain' }}
          />
        </Grid>
        <Grid item xs={8}>
          <CardContent>
            <Typography variant="h4">{item.name}</Typography>
            <Typography variant="h5" color="textSecondary">
              {`${item.date.year}年${String(item.date.month).padStart(2, '0')}月${String(item.date.day).padStart(2, '0')}日`}
            </Typography>
            <Typography variant="h6" gutterBottom>{item.meaning}</Typography>
            <Typography variant="body1" style={{ marginTop: '1rem' }}>{item.remarks}</Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default DataDetailItem;
