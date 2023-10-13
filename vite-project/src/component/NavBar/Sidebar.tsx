import React from 'react';
import SideItem from './SideItem'; // Đảm bảo đường dẫn đúng

interface SidebarProps {
  items: { label: string; path: string; icon: string }[];
}

const Sidebar: React.FC<SidebarProps> = ({ items }) => {
  return (
    <nav style={{ backgroundColor: '#37003C' }} className="h-screen w-1/6 fixed top-0 left-0 overflow-y-auto pt-10 mt-10">
      <ul className="space-y-2 py-4 pr-4">
        {items.map((item, index) => (
          <SideItem key={index} label={item.label} path={item.path} icon={item.icon} />
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
