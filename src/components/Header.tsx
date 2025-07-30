'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Bell, User} from 'lucide-react';

const Header = () => {
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
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                    type="text"
                    placeholder="Search donations"
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
            </div>
        </div>

        <div className="flex items-center space-x-4">
          <Bell className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-800" />
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-gray-600" />
            </div>
            <div className="text-sm">
              <div className="font-medium">Cakra Putra Dana</div>
              <div className="text-gray-500">KPU</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;