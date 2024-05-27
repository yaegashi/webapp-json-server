import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DataType } from './types';
import DataDetailItem from './DataDetailItem';
import DataRawItem from './DataRawItem';
import { CircularProgress, Breadcrumbs, Typography, Checkbox, FormControlLabel } from '@mui/material';

const DataDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<DataType | null>(null);
  const [loading, setLoading] = useState(false);
  const [debugMode, setDebugMode] = useState(false); // デバッグモード用の状態

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

  const handleDebugModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDebugMode(event.target.checked);
  };

  return (
    <div style={{ margin: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Breadcrumbs aria-label="breadcrumb" style={{ margin: '1rem 0' }}>
          <Link to="/">一覧</Link>
          {item ? (
            <Typography color="textPrimary">{item.name}</Typography>
          ) : (
            <Typography color="textPrimary">Loading...</Typography>
          )}
        </Breadcrumbs>
        <FormControlLabel
          control={
            <Checkbox
              checked={debugMode}
              onChange={handleDebugModeChange}
              color="primary"
            />
          }
          label="Debug"
        />
      </div>
      {loading ? (
        <CircularProgress />
      ) : (
        item && (
          debugMode ? (
            <DataRawItem item={JSON.stringify(item, null, 2)} />
          ) : (
            <DataDetailItem item={item} />
          )
        )
      )}
    </div>
  );
};

export default DataDetail;
