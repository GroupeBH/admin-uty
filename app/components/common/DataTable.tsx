'use client';

import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataTableProps<T> {
  columns: ColumnsType<T>;
  data: T[];
  loading?: boolean;
  pagination?: {
    current: number;
    pageSize: number;
    total: number;
    onChange: (page: number, pageSize: number) => void;
  };
  rowKey?: string | ((record: T) => string);
}

export function DataTable<T extends object>({
  columns,
  data,
  loading = false,
  pagination,
  rowKey = 'id',
}: DataTableProps<T>) {
  return (
    <div className="stat-card">
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={pagination}
        rowKey={rowKey}
        className="custom-table"
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
}

