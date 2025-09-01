'use client'

import React, { useState } from 'react';
import {
  FiLayers,
  FiUsers,
  FiSearch,
  FiCamera,
  FiUserPlus,
} from 'react-icons/fi';
import { MessageIconWithBadge } from '@/components/common/Badge';
import { useRouter } from 'next/navigation';
import { CreateGroupModal } from './modals/CreateGroupModal';

type Button = {
  label: string;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
};

export const ActionGrid: React.FC = () => {
  const navigate = useRouter();
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);

  const handleEditarFeed = () => {
    navigate.push('/editarFeed');
  };

  const handleEditarPerfil = () => {
    navigate.push('/editarPerfil');
  };

  const handleEditarAlbum = () => {
    navigate.push('/galeria');
  };

  const handleCriarGrupo = () => setIsCreateGroupModalOpen(true);
  const handleProcurar = () => navigate.push('/buscador');
  const handleMensagem = () => navigate.push('/mensageiro');
  const handleCloseModal = () => setIsCreateGroupModalOpen(false);

  // Função para formatar labels
  const formatLabel = (label: string) => {
    if (label.startsWith('Editar ') || label.startsWith('Criar ')) {
      const parts = label.split(' ');
      if (parts.length >= 2) {
        const firstWord = parts[0][0].toUpperCase() + parts[0].slice(1).toLowerCase();
        const otherWords = parts.slice(1).map(word => word.toUpperCase()).join(' ');
        return `${firstWord} ${otherWords}`;
      }
    }
    return label.toUpperCase();
  };

  const actionButtons: Button[] = [
    { label: formatLabel('Editar FEED'), icon: <FiLayers />, color: 'bg-[#8F7E76] hover:bg-[#dfcdb5]', onClick: handleEditarFeed },
    { label: formatLabel('Editar PERFIL'), icon: <FiUserPlus />, color: 'bg-[#BEB780] hover:bg-[#dfcdb5]', onClick: handleEditarPerfil },
    { label: formatLabel('Editar ÁLBUM'), icon: <FiCamera />, color: 'bg-[#DFCDB5] hover:bg-[#dfcdb5]', onClick: handleEditarAlbum },
    { label: formatLabel('Criar GRUPO'), icon: <FiUsers />, color: 'bg-[#A1A864] hover:bg-[#dfcdb5]', onClick: handleCriarGrupo },
    { label: formatLabel('BUSCADOR'), icon: <FiSearch />, color: 'bg-[#BCC5A8] hover:bg-[#dfcdb5]', onClick: handleProcurar },
    { label: formatLabel('MENSAGEIRO'), icon: <MessageIconWithBadge count={9} />, color: 'bg-[#BACE77] hover:bg-[#dfcdb5]', onClick: handleMensagem },
  ];

  return (
    <>
      <div className="grid grid-cols-3 sm:grid-cols-3 gap-2 pb-3 w-full rounded-sm">
        {actionButtons.map((btn, idx) => (
          <button
            key={idx}
            onClick={btn.onClick}
            className={`flex flex-col items-center justify-center border-2 border-black p-1 shadow-md rounded-lg transition ${btn.color}`}
            type="button"
          >
            <div className="text-2xl mb-2 text-gray-700">{btn.icon}</div>
            <span className="text-md font-medium text-gray-800 normal-case">{btn.label}</span>
          </button>
        ))}
      </div>

      <CreateGroupModal isOpen={isCreateGroupModalOpen} onClose={handleCloseModal} />
    </>
  );
};