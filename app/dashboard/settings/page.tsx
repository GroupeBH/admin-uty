'use client';

import React from 'react';
import { DashboardLayout } from '@/app/components/layout/DashboardLayout';
import { Form, Input, Button, Switch, Select, Divider, message, Tabs } from 'antd';
import { Save, Shield, Bell, Globe, Database } from 'lucide-react';

const { Option } = Select;
const { TextArea } = Input;

export default function SettingsPage() {
  const [form] = Form.useForm();

  const handleSave = (values: any) => {
    console.log('Settings:', values);
    message.success('Paramètres enregistrés avec succès');
  };

  const items = [
    {
      key: 'general',
      label: (
        <span className="flex items-center gap-2">
          <Globe className="w-4 h-4" />
          Général
        </span>
      ),
      children: (
        <div className="stat-card">
          <Form form={form} layout="vertical" onFinish={handleSave}>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Paramètres généraux
            </h3>

            <Form.Item
              name="siteName"
              label="Nom du site"
              initialValue="UTY Admin"
            >
              <Input placeholder="Nom de votre plateforme" />
            </Form.Item>

            <Form.Item
              name="siteDescription"
              label="Description"
              initialValue="Plateforme de marketplace"
            >
              <TextArea rows={3} placeholder="Description de votre plateforme" />
            </Form.Item>

            <Form.Item
              name="siteEmail"
              label="Email de contact"
              initialValue="contact@uty.com"
            >
              <Input type="email" placeholder="email@example.com" />
            </Form.Item>

            <Form.Item
              name="timezone"
              label="Fuseau horaire"
              initialValue="Europe/Paris"
            >
              <Select>
                <Option value="Europe/Paris">Europe/Paris (GMT+1)</Option>
                <Option value="America/New_York">
                  America/New_York (GMT-5)
                </Option>
                <Option value="Asia/Tokyo">Asia/Tokyo (GMT+9)</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="language"
              label="Langue par défaut"
              initialValue="fr"
            >
              <Select>
                <Option value="fr">Français</Option>
                <Option value="en">English</Option>
                <Option value="es">Español</Option>
              </Select>
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              icon={<Save className="w-4 h-4" />}
            >
              Enregistrer
            </Button>
          </Form>
        </div>
      ),
    },
    {
      key: 'security',
      label: (
        <span className="flex items-center gap-2">
          <Shield className="w-4 h-4" />
          Sécurité
        </span>
      ),
      children: (
        <div className="space-y-6">
          <div className="stat-card">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Authentification
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <p className="font-medium text-gray-800">
                    Authentification à deux facteurs (2FA)
                  </p>
                  <p className="text-sm text-gray-500">
                    Ajouter une couche de sécurité supplémentaire
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <p className="font-medium text-gray-800">
                    Connexion par email uniquement
                  </p>
                  <p className="text-sm text-gray-500">
                    Désactiver les connexions sociales
                  </p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <p className="font-medium text-gray-800">
                    Session timeout
                  </p>
                  <p className="text-sm text-gray-500">
                    Déconnexion automatique après inactivité
                  </p>
                </div>
                <Select defaultValue="30" style={{ width: 120 }}>
                  <Option value="15">15 minutes</Option>
                  <Option value="30">30 minutes</Option>
                  <Option value="60">1 heure</Option>
                  <Option value="120">2 heures</Option>
                </Select>
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium text-gray-800">
                    Logs d'audit
                  </p>
                  <p className="text-sm text-gray-500">
                    Enregistrer toutes les actions des administrateurs
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          <div className="stat-card">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Permissions
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Configurez les permissions pour chaque rôle d'utilisateur
            </p>
            <Button type="primary">Gérer les permissions</Button>
          </div>
        </div>
      ),
    },
    {
      key: 'notifications',
      label: (
        <span className="flex items-center gap-2">
          <Bell className="w-4 h-4" />
          Notifications
        </span>
      ),
      children: (
        <div className="stat-card">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Préférences de notification
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <div>
                <p className="font-medium text-gray-800">
                  Nouvelles commandes
                </p>
                <p className="text-sm text-gray-500">
                  Recevoir une notification pour chaque nouvelle commande
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <div>
                <p className="font-medium text-gray-800">
                  Contenus à modérer
                </p>
                <p className="text-sm text-gray-500">
                  Alertes pour les contenus signalés par l'IA
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <div>
                <p className="font-medium text-gray-800">
                  Nouveaux utilisateurs
                </p>
                <p className="text-sm text-gray-500">
                  Notification lors de nouvelles inscriptions
                </p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <div>
                <p className="font-medium text-gray-800">
                  Litiges
                </p>
                <p className="text-sm text-gray-500">
                  Alertes pour les commandes en litige
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-gray-800">
                  Rapports hebdomadaires
                </p>
                <p className="text-sm text-gray-500">
                  Recevoir un résumé hebdomadaire par email
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'integrations',
      label: (
        <span className="flex items-center gap-2">
          <Database className="w-4 h-4" />
          Intégrations
        </span>
      ),
      children: (
        <div className="space-y-6">
          <div className="stat-card">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              AWS Services
            </h3>

            <Form layout="vertical">
              <Form.Item label="AWS Rekognition API Key">
                <Input.Password placeholder="Entrez votre clé API" />
              </Form.Item>

              <Form.Item label="S3 Bucket Name">
                <Input placeholder="nom-du-bucket" />
              </Form.Item>

              <Form.Item label="AWS Region">
                <Select defaultValue="eu-west-1">
                  <Option value="us-east-1">US East (N. Virginia)</Option>
                  <Option value="eu-west-1">EU (Ireland)</Option>
                  <Option value="ap-southeast-1">Asia Pacific (Singapore)</Option>
                </Select>
              </Form.Item>

              <Button type="primary" icon={<Save className="w-4 h-4" />}>
                Enregistrer
              </Button>
            </Form>
          </div>

          <div className="stat-card">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Paiements
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="font-bold text-blue-600">S</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Stripe</p>
                    <p className="text-sm text-gray-500">Connecté</p>
                  </div>
                </div>
                <Button>Configurer</Button>
              </div>

              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="font-bold text-purple-600">P</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">PayPal</p>
                    <p className="text-sm text-gray-500">Non configuré</p>
                  </div>
                </div>
                <Button>Configurer</Button>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Paramètres</h1>
          <p className="text-gray-600 mt-1">
            Configurez votre plateforme UTY Admin
          </p>
        </div>

        {/* Settings Tabs */}
        <Tabs items={items} />
      </div>
    </DashboardLayout>
  );
}

