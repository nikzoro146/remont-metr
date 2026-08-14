import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, ClipboardList, DollarSign, LogOut, Edit2, Save } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import type { Lead, ServicePrice } from '../types';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const { getLeads, updateLeadStatus, getUsers, getServicePrices, updateServicePrice, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'leads' | 'users' | 'prices'>('leads');
  const [editingPrice, setEditingPrice] = useState<string | null>(null);
  const [priceValues, setPriceValues] = useState<Record<string, number>>({});

  const leads = getLeads();
  const users = getUsers();
  const prices = getServicePrices();

  const handleStatusChange = (leadId: string, status: Lead['status']) => {
    updateLeadStatus(leadId, status);
  };

  const handleEditPrice = (price: ServicePrice) => {
    setEditingPrice(price.id);
    setPriceValues(prev => ({ ...prev, [price.id]: price.pricePerSqm }));
  };

  const handleSavePrice = (priceId: string) => {
    const price = prices.find(p => p.id === priceId);
    if (price && priceValues[priceId]) {
      updateServicePrice({ ...price, pricePerSqm: priceValues[priceId] });
      setEditingPrice(null);
    }
  };

  const getStatusColor = (status: Lead['status']) => {
    switch (status) {
      case 'new': return 'bg-green-100 text-green-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'done': return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: Lead['status']) => {
    switch (status) {
      case 'new': return 'Новая';
      case 'contacted': return 'В работе';
      case 'done': return 'Завершена';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Затемнение фона */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />
          
          {/* Панель */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-4xl bg-[#F4F4F2] z-50 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-2xl font-unbounded text-[#141414]">Админ-панель</h2>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => { logout(); onClose(); }}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-[#141414] hover:text-[#FF5A2A] transition-colors"
                  >
                    <LogOut size={18} />
                    Выйти
                  </button>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('leads')}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-medium transition-colors ${
                    activeTab === 'leads' 
                      ? 'text-[#FF5A2A] border-b-2 border-[#FF5A2A]' 
                      : 'text-gray-500 hover:text-[#141414]'
                  }`}
                >
                  <ClipboardList size={18} />
                  Заявки ({leads.length})
                </button>
                <button
                  onClick={() => setActiveTab('users')}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-medium transition-colors ${
                    activeTab === 'users' 
                      ? 'text-[#FF5A2A] border-b-2 border-[#FF5A2A]' 
                      : 'text-gray-500 hover:text-[#141414]'
                  }`}
                >
                  <Users size={18} />
                  Пользователи ({users.length})
                </button>
                <button
                  onClick={() => setActiveTab('prices')}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-medium transition-colors ${
                    activeTab === 'prices' 
                      ? 'text-[#FF5A2A] border-b-2 border-[#FF5A2A]' 
                      : 'text-gray-500 hover:text-[#141414]'
                  }`}
                >
                  <DollarSign size={18} />
                  Цены
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {activeTab === 'leads' && (
                  <div className="space-y-4">
                    {leads.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">Заявок пока нет</p>
                    ) : (
                      leads.map((lead) => (
                        <div key={lead.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-[#141414]">{lead.name}</h3>
                              <p className="text-sm text-gray-500">{lead.phone}</p>
                              {lead.message && (
                                <p className="text-sm text-gray-600 mt-2">{lead.message}</p>
                              )}
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                              {getStatusLabel(lead.status)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                            <span>{new Date(lead.createdAt).toLocaleDateString('ru-RU')}</span>
                            <span>•</span>
                            <span>{new Date(lead.createdAt).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleStatusChange(lead.id, 'contacted')}
                              disabled={lead.status === 'contacted' || lead.status === 'done'}
                              className="flex-1 px-3 py-2 text-xs bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Взять в работу
                            </button>
                            <button
                              onClick={() => handleStatusChange(lead.id, 'done')}
                              disabled={lead.status === 'done'}
                              className="flex-1 px-3 py-2 text-xs bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Завершить
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {activeTab === 'users' && (
                  <div className="space-y-3">
                    {users.map((user) => (
                      <div key={user.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-[#141414]">{user.name}</h3>
                          <p className="text-sm text-gray-500">{user.email}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`px-2 py-0.5 rounded text-xs ${
                              user.role === 'admin' 
                                ? 'bg-[#FF5A2A] text-white' 
                                : 'bg-gray-100 text-gray-600'
                            }`}>
                              {user.role === 'admin' ? 'Админ' : 'Клиент'}
                            </span>
                            <span className="text-xs text-gray-400">
                              {new Date(user.createdAt).toLocaleDateString('ru-RU')}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'prices' && (
                  <div className="space-y-4">
                    {prices.map((price) => (
                      <div key={price.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-[#141414]">{price.name}</h3>
                            <p className="text-sm text-gray-500 mt-1">{price.description}</p>
                          </div>
                          {editingPrice === price.id ? (
                            <div className="flex items-center gap-2">
                              <input
                                type="number"
                                value={priceValues[price.id] || price.pricePerSqm}
                                onChange={(e) => setPriceValues(prev => ({ ...prev, [price.id]: parseInt(e.target.value) || 0 }))}
                                className="w-24 px-2 py-1 border border-gray-300 rounded-lg text-right"
                              />
                              <button
                                onClick={() => handleSavePrice(price.id)}
                                className="p-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors"
                              >
                                <Save size={18} />
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-3">
                              <span className="text-xl font-bold text-[#FF5A2A]">
                                {price.pricePerSqm.toLocaleString('ru-RU')} ₽/м²
                              </span>
                              <button
                                onClick={() => handleEditPrice(price)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                              >
                                <Edit2 size={18} />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
