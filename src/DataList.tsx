import React, { useEffect, useState, useRef } from 'react';
import { DataType } from './types';
import { Breadcrumbs, CircularProgress, TextField, Typography } from '@mui/material';
import DataListItem from './DataListItem';

const DataList: React.FC = () => {
  const [items, setItems] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchItems = async (query = '') => {
    try {
      setLoading(true); // 検索開始時にローディングを開始
      const response = await fetch(`/api/data?q=${query}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: DataType[] = await response.json();
      setItems(data);
      setLoading(false); // データの取得が完了したらローディングを終了
    } catch (error) {
      console.error('Error fetching items:', error);
      setLoading(false); // エラーが発生した場合もローディングを終了
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const searchTimeout = useRef<number | null>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (searchTimeout.current !== null) {
      clearTimeout(searchTimeout.current);
    }
    searchTimeout.current = window.setTimeout(() => {
      fetchItems(query);
    }, 300); // 300ms のデバウンス
  };

  return (
    <div style={{ margin: '1rem' }}>
      <Breadcrumbs aria-label="breadcrumb" style={{ margin: '1rem 0' }}>
        <Typography color="textPrimary">一覧</Typography>
      </Breadcrumbs>
      <TextField
        label="Search"
        value={searchQuery}
        onChange={handleSearchChange}
        fullWidth
      />
      {loading ? (
        <CircularProgress />
      ) : (
        items.map((item) => (
          <DataListItem key={item.id} item={item} />
        ))
      )}
    </div>
  );
};

export default DataList;
