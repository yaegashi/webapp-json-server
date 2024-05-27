import React, { useEffect, useState, useRef } from 'react';
import { DataType } from './types';
import { Breadcrumbs, CircularProgress, TextField, Typography, Checkbox, FormControlLabel } from '@mui/material';
import DataListItem from './DataListItem';
import DataRawItem from './DataRawItem';

const DataList: React.FC = () => {
  const [items, setItems] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [debugMode, setDebugMode] = useState(false); // デバッグモード用の状態
  const [rawResponse, setRawResponse] = useState(''); // 生のレスポンスデータ用の状態

  const fetchItems = async (query = '') => {
    try {
      setLoading(true); // 検索開始時にローディングを開始
      const response = await fetch(`/api/data?q=${query}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: DataType[] = await response.json();
      setItems(data);
      setRawResponse(JSON.stringify(data, null, 2)); // 生のレスポンスデータを保存
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

  const handleDebugModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDebugMode(event.target.checked);
  };

  return (
    <div style={{ margin: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Breadcrumbs aria-label="breadcrumb" style={{ margin: '1rem 0' }}>
          <Typography color="textPrimary">一覧</Typography>
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
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
        <TextField
          label="Search"
          value={searchQuery}
          onChange={handleSearchChange}
          fullWidth
        />
      </div>
      {loading ? (
        <CircularProgress />
      ) : (
        debugMode ? (
          <DataRawItem item={rawResponse} />
        ) : (
          items.map((item) => (
            <DataListItem key={item.id} item={item} />
          ))
        )
      )}
    </div>
  );
};

export default DataList;
