'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Bell, User, Settings, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [notificationCount, setNotificationCount] = useState(3);

  const notifications = [
    {
      id: 1,
      title: "Transaksi Mencurigakan Terdeteksi",
      message: "Donasi dari PT Maju Jaya terdeteksi sebagai transaksi mencurigakan",
      time: "2 menit yang lalu",
      type: "warning"
    },
    {
      id: 2,
      title: "Konfirmasi Donasi Diperlukan",
      message: "Kandidat Ganjar Pranowo perlu mengkonfirmasi donasi Rp 50.000.000",
      time: "5 menit yang lalu",
      type: "info"
    },
    {
      id: 3,
      title: "Laporan SAR Dibuat",
      message: "Laporan aktivitas mencurigakan telah dibuat untuk PPATK",
      time: "10 menit yang lalu",
      type: "success"
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "warning":
        return "⚠️";
      case "info":
        return "ℹ️";
      case "success":
        return "✅";
      default:
        return "📢";
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-row items-center space-x-4">
            <div className="flex items-center space-x-3">
                <Link href="/" className="flex items-center">
                    <Image 
                        src="/logo-warna.png" 
                        alt="Logo" 
                        width={170}
                        height={170}
                        className="w-42 h-42 md:w-42 lg:w-54 md:h-42 lg:h-54 object-contain"
                    />
                </Link>
            </div>

            <div className="flex-1 max-w-lg mx-8">

            </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notifications Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="relative p-2 text-gray-600 hover:text-gray-800 transition-colors">
                <Bell className="w-5 h-5" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex items-center justify-between">
                <span>Notifikasi</span>
                <button 
                  className="text-xs text-blue-600 hover:text-blue-800"
                  onClick={() => setNotificationCount(0)}
                >
                  Tandai semua dibaca
                </button>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.map((notification) => (
                <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-3 cursor-pointer">
                  <div className="flex items-start space-x-3 w-full">
                    <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {notification.title}
                      </p>
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
              {notifications.length === 0 && (
                <div className="p-4 text-center text-gray-500 text-sm">
                  Tidak ada notifikasi baru
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-600" />
                </div>
                <div className="text-sm text-left">
                  <div className="font-medium">Cakra Putra Dana</div>
                  <div className="text-gray-500">KPU</div>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center space-x-2 cursor-pointer">
                <Settings className="w-4 h-4" />
                <span>Pengaturan</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center space-x-2 cursor-pointer text-red-600">
                <LogOut className="w-4 h-4" />
                <span>Keluar</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;