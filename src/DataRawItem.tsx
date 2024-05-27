import React, { useEffect, useRef } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

interface DataRawItemProps {
  item: string;
}

const DataRawItem: React.FC<DataRawItemProps> = ({ item }) => {
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (preRef.current) {
      hljs.highlightBlock(preRef.current);
    }
  }, [item]);

  return (
    <pre
      ref={preRef}
      style={{
        backgroundColor: '#333',
        color: '#fff',
        padding: '1rem',
        borderRadius: '4px',
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
        marginTop: '1rem',
        overflowX: 'auto',
        fontFamily: 'monospace' // 等幅フォントを使用
      }}
    >
      <code className="json">
        {item}
      </code>
    </pre>
  );
};

export default DataRawItem;
