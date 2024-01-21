import React from 'react'
import LandTab from './LandTab';
export default function EmployesTabbedLand({
    children,
    activeTab,
    setActiveTab,
    lands,
    onAddLand,
    onEditLand,
    onDeleteLand,
  }) {
    return (
        <div className="w-100  mt-3 ">
          {children}
        </div>
      );
}
