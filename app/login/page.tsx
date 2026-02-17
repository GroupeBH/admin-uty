'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { Lock, Eye, EyeOff, Phone } from 'lucide-react';
import {
  useLazyGetCurrentUserQuery,
  useLoginMutation,
} from '@/lib/services/api';
import { useAppDispatch } from '@/lib/hooks';
import { logout, setTokens, setUser } from '@/lib/features/auth/authSlice';

export default function LoginPage() {
  const [showPin, setShowPin] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const [fetchCurrentUser] = useLazyGetCurrentUserQuery();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onFinish = async (values: { phone: string; pin: string }) => {
    try {
      const tokens = await login(values).unwrap();
      dispatch(setTokens(tokens));

      const user = await fetchCurrentUser().unwrap();
      dispatch(setUser(user));

      message.success('Connexion reussie');
      router.push('/dashboard');
    } catch (error: any) {
      dispatch(logout());
      message.error(error?.data?.message || 'Telephone ou code PIN incorrect');
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4">
              <span className="text-white font-bold text-2xl">U</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">UTY Admin</h1>
            <p className="text-gray-600 mt-2">Connectez-vous a votre espace d'administration</p>
          </div>

          <Form
            name="login"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
            className="space-y-6"
          >
            <Form.Item
              name="phone"
              rules={[
                { required: true, message: 'Veuillez entrer votre numero de telephone' },
                {
                  pattern: /^\+?[0-9]{9,15}$/,
                  message: 'Numero invalide',
                },
              ]}
            >
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  size="large"
                  placeholder="Telephone (ex: 243xxxxxxxxx)"
                  className="pl-10"
                  style={{ height: '48px' }}
                />
              </div>
            </Form.Item>

            <Form.Item
              name="pin"
              rules={[
                {
                  required: true,
                  message: 'Veuillez entrer votre code PIN',
                },
                {
                  pattern: /^\d{4}$/,
                  message: 'Le code PIN doit contenir 4 chiffres',
                },
              ]}
            >
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                <Input
                  size="large"
                  type={showPin ? 'text' : 'password'}
                  placeholder="Code PIN"
                  className="pl-10 pr-10"
                  style={{ height: '48px' }}
                  maxLength={4}
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10"
                >
                  {showPin ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </Form.Item>

            <div className="flex items-center justify-between">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Se souvenir de moi</Checkbox>
              </Form.Item>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
                Probleme de connexion ?
              </a>
            </div>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={isLoading}
                className="w-full h-12 text-base font-semibold"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                  border: 'none',
                }}
              >
                Se connecter
              </Button>
            </Form.Item>
          </Form>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-semibold text-gray-700 mb-2">Compte admin de demonstration :</p>
            <div className="space-y-1 text-xs text-gray-600">
              <p>Telephone + PIN: configure dans uty-api</p>
            </div>
          </div>

          <div className="text-center text-sm text-gray-500">
            <p>© 2026 UTY Admin. Tous droits reserves.</p>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 items-center justify-center p-12">
        <div className="text-white space-y-8 max-w-lg">
          <div>
            <h2 className="text-4xl font-bold mb-4">Gerez votre plateforme UTY</h2>
            <p className="text-xl text-blue-100">
              Une interface d'administration complete pour superviser tous les aspects de votre
              marketplace.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white bg-opacity-20 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">A</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Tableau de bord analytique</h3>
                <p className="text-blue-100">Suivez vos KPIs en temps reel avec des graphiques intuitifs</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white bg-opacity-20 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">B</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Moderation IA</h3>
                <p className="text-blue-100">Detection automatique de contenus inappropries.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white bg-opacity-20 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">C</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Suivi des livraisons</h3>
                <p className="text-blue-100">Tracking en temps reel et gestion des livreurs.</p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white border-opacity-20">
            <p className="text-sm text-blue-100">Plateforme securisee avec authentification JWT.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

