'use client';

import React from 'react';
import { StyleProvider } from '@ant-design/cssinjs';

export const AntdRegistry: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <StyleProvider>{children}</StyleProvider>;
};

