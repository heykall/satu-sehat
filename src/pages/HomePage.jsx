import React, { useState, useEffect } from 'react';
import { FiUsers, FiPackage, FiMap, FiDatabase } from 'react-icons/fi';
import { MdOutlineMonitorHeart } from "react-icons/md";
import { useNavigate, useParams } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate()
  const [hoveredCard, setHoveredCard] = useState(null);
  let { id } = useParams();

  const handleCardHover = (card) => {
    setHoveredCard(card);
  };

  const handleCardClick = (card) => {
    if (card === 'cdc') {
      navigate('/workers')
    } else if (card === 'data-integration') {
      navigate('/data-integration')
      console.log('Data Integration Tool clicked');
    } else if (card === 'data-mapping') {
      navigate('/map-database')
    } else if (card === 'database') {
      navigate('/database')
    } else if (card === 'monitoring') {
      navigate('/monitoring')
    }
  };

  const renderCardMenu = (icon, label, card) => {
    const isHovered = hoveredCard === card;

  useEffect(() => {
    localStorage.setItem('id', id)
  },[])

    return (
      <div
        className={`bg-white p-4 rounded-lg shadow flex items-center justify-center cursor-pointer ${
          isHovered ? 'bg-teal-100' : ''
        }`}
        onMouseEnter={() => handleCardHover(card)}
        onMouseLeave={() => handleCardHover(null)}
        onClick={() => handleCardClick(card)}
      >
        {React.cloneElement(icon, {
          className: `text-teal-500 text-3xl ${isHovered ? 'animate-bounce' : ''}`,
        })}
        <span className="ml-2">{label}</span>
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-col items-center max-w-screen">
        <div className="absolute top-0 right-0">
          <button className="m-2 bg-teal-500 text-sm text-white px-2 py-1">Worker A</button>
          <button className="m-2 bg-gray-500 text-sm text-white px-2 py-1">Logout</button>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Satu Sehat Adapter</h1>
        <div className="relative bg-teal-200 p-4 rounded-lg shadow-lg">
          <div className="grid grid-cols-2 gap-4">
            {renderCardMenu(<FiUsers />, 'CDC Worker', 'cdc')}
            {renderCardMenu(<FiPackage />, 'Data Integration Tool', 'data-integration')}
            {renderCardMenu(<FiMap />, 'Data Mapping Tools', 'data-mapping')}
            {renderCardMenu(<FiDatabase />, 'Database Connect', 'database')}
            {renderCardMenu(<MdOutlineMonitorHeart />, 'Monitoring', 'monitoring')}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
