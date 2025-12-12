'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useLoginMutation } from '@/lib/services/api';
import { useAppDispatch } from '@/lib/hooks';
import { setCredentials } from '@/lib/features/auth/authSlice';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      const result = await login(values).unwrap();
      dispatch(
        setCredentials({
          user: result.user,
          accessToken: result.accessToken,
        })
      );
      message.success('Connexion réussie !');
      router.push('/dashboard');
    } catch (error: any) {
      message.error(
        error?.data?.message || 'Email ou mot de passe incorrect'
      );
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4">
              <span className="text-white font-bold text-2xl">U</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">UTY Admin</h1>
            <p className="text-gray-600 mt-2">
              Connectez-vous à votre espace d'administration
            </p>
          </div>

          {/* Login Form */}
          <Form
            name="login"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
            className="space-y-6"
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Veuillez entrer votre email' },
                { type: 'email', message: 'Email invalide' },
              ]}
            >
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  size="large"
                  placeholder="Email"
                  className="pl-10"
                  style={{ height: '48px' }}
                />
              </div>
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Veuillez entrer votre mot de passe',
                },
              ]}
            >
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                <Input
                  size="large"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Mot de passe"
                  className="pl-10 pr-10"
                  style={{ height: '48px' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10"
                >
                  {showPassword ? (
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
              <a
                href="#"
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Mot de passe oublié ?
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

          {/* Demo Accounts */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-semibold text-gray-700 mb-2">
              Comptes de démonstration :
            </p>
            <div className="space-y-1 text-xs text-gray-600">
              <p>👨‍💼 Super Admin: admin@uty.com / admin123</p>
              <p>👤 Modérateur: moderator@uty.com / mod123</p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-gray-500">
            <p>© 2025 UTY Admin. Tous droits réservés.</p>
          </div>
        </div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 items-center justify-center p-12">
        <div className="text-white space-y-8 max-w-lg">
          <div>
            <h2 className="text-4xl font-bold mb-4">
              Gérez votre plateforme UTY
            </h2>
            <p className="text-xl text-blue-100">
              Une interface d'administration complète pour superviser tous les
              aspects de votre marketplace.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white bg-opacity-20 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">📊</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">
                  Tableau de bord analytique
                </h3>
                <p className="text-blue-100">
                  Suivez vos KPIs en temps réel avec des graphiques intuitifs
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white bg-opacity-20 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🤖</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">
                  Modération IA
                </h3>
                <p className="text-blue-100">
                  Détection automatique de contenus inappropriés avec AWS
                  Rekognition
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white bg-opacity-20 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🚚</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">
                  Suivi des livraisons
                </h3>
                <p className="text-blue-100">
                  Tracking en temps réel et gestion des livreurs
                </p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white border-opacity-20">
            <p className="text-sm text-blue-100">
              Plateforme sécurisée avec authentification JWT, 2FA et logs
              d'audit
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

