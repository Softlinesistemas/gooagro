'use client';

import React, { useState } from 'react';
import { FiCalendar, FiClock, FiCloud, FiChevronDown } from 'react-icons/fi';
import { MdOutlineQrCodeScanner } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import QrCode from './QrCode';
import { Button } from '@/utils/ui/Button';

export const UserSelect: React.FC<{ onActionSelect?: (action: string) => void }> = ({ onActionSelect }) => {
  const router = useRouter();

  const users = [
    { name: 'Sítio Canaã - Alimentos Orgânicos', avatar: '/avatar3.jpeg', type: 'fornecedor' },
    { name: 'Maria da Silva', avatar: '/avatar2.jpeg', type: 'pessoal' },
    { name: 'Grupo Raízes Sustentáveis', avatar: '/avatar1.jpeg', type: 'grupo' },
    { name: 'AgroTech Ltda.', avatar: '/avatar4.jpeg', type: 'empresa' },
  ];

  const [selectedUser, setSelectedUser] = useState(users[1]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);

  // Estado para ícone/ação/avatar ativo
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const selectUser = (user: typeof users[0]) => {
    setSelectedUser(user);
    setShowDropdown(false);
    setActiveItem(`user-${user.name}`);
  };

  const handleCloseQrCode = () => setShowQrCode(false);

  const handleActionClick = (action: string) => {
    setActiveItem(action);
    onActionSelect?.(action);
  };

  const goToFeed = () => {
    if (!selectedUser?.type) return;
    router.push(`/feed/${selectedUser.type}`);
    setActiveItem(`user-${selectedUser.name}`); // Avatar também fica ativo
  };

  return (
    <div className="w-full bg-[#B6D2B7] gap-2 pb-3 mt-2">
      {showQrCode ? (
        <QrCode qrValue="https://seusite.com/usuario/123" onScanClick={handleCloseQrCode} />
      ) : (
        <div className="flex h-28 w-full gap-1 pr-2">
          {/* Avatar */}
          <div
            onClick={goToFeed}
            className={`h-full w-24 rounded overflow-hidden flex-shrink-0 border-2 border-black cursor-pointer transition ${
              activeItem === `user-${selectedUser.name}` ? 'ring-2 ring-orange-500' : ''
            }`}
            title={`Ir para o feed de ${selectedUser.type}`}
          >
            <img src={selectedUser.avatar} alt={selectedUser.name} className="w-full h-full object-cover" />
          </div>

          {/* Conteúdo ao lado */}
          <div className="flex-1 flex flex-col">
            {/* Dropdown de seleção */}
            <div className="w-full">
              <div className="relative w-full ml-2">
                <button
                  onClick={toggleDropdown}
                  className="w-full text-left px-1 py-1 bg-white rounded flex items-center justify-between border-2 border-black"
                >
                  <span className="ml-2 text-md font-medium">{selectedUser.name}</span>
                  <FiChevronDown />
                </button>

                {showDropdown && (
                  <div className="absolute top-full mt-1 w-full bg-white rounded shadow z-10">
                    {users.map((user, index) => (
                      <div
                        key={index}
                        onClick={() => selectUser(user)}
                        className={`px-3 py-2 cursor-pointer text-sm transition ${
                          activeItem === `user-${user.name}` ? 'bg-orange-500 text-white' : 'hover:bg-green-100'
                        }`}
                      >
                        {user.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Ícones de ação */}
            <div className="mt-2 flex justify-around text-gray-700 text-xl gap-1 pb-3">
              <Button
                onClick={() => handleActionClick('qrcode')}
                className={`transition ${activeItem === 'qrcode' ? 'text-orange-500' : 'hover:text-green-600'}`}
                title="Buscar"
                variant="icon"
              >
                <MdOutlineQrCodeScanner size={40} />
              </Button>

              <Button
                onClick={() => handleActionClick('calendar')}
                className={`transition ${activeItem === 'calendar' ? 'text-orange-500' : 'hover:text-green-600'}`}
                title="Calendário"
                variant="icon"
              >
                <FiCalendar size={40} />
              </Button>

              <Button
                onClick={() => handleActionClick('clock')}
                className={`transition ${activeItem === 'clock' ? 'text-orange-500' : 'hover:text-green-600'}`}
                title="Relógio"
                variant="icon"
              >
                <FiClock size={40} />
              </Button>

              <Button
                onClick={() => handleActionClick('cloud')}
                className={`transition ${activeItem === 'cloud' ? 'text-orange-500' : 'hover:text-green-600'}`}
                title="Nuvem"
                variant="icon"
              >
                <FiCloud size={40} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
