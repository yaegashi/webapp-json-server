import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DataType } from './types';
import DataDetailItem from './DataDetailItem';
import { CircularProgress, Breadcrumbs, Typography } from '@mui/material';

const DataDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<DataType | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/data/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: DataType = await response.json();
        setItem(data);
      } catch (error) {
        console.error('Error fetching item:', error);
      }
      setLoading(false);
    };
    fetchItem();
  }, [id]);

  return (
    <div style={{ margin: '1rem' }}>
      <Breadcrumbs aria-label="breadcrumb" style={{ margin: '1rem 0' }}>
        <Link to="/">一覧</Link>
        {item ? (
          <Typography color="textPrimary">{item.name}</Typography>
        ) : (
          <Typography color="textPrimary">Loading...</Typography>
        )}
      </Breadcrumbs>
      {loading ? (
        <CircularProgress />
      ) : (
        item && <DataDetailItem item={item} />
      )}
    </div>
  );
};

export default DataDetail;
