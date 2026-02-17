'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useGetCurrentUserQuery } from '@/lib/services/api';
import { logout, setUser } from '@/lib/features/auth/authSlice';

export const AuthBootstrap = () => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const user = useAppSelector((state) => state.auth.user);

  const { data, isError } = useGetCurrentUserQuery(undefined, {
    skip: !accessToken || Boolean(user),
  });

  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (isError && accessToken) {
      dispatch(logout());
    }
  }, [isError, accessToken, dispatch]);

  return null;
};

