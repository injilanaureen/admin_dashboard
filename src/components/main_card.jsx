import React from 'react';
import cardData from '../data/sidebar_items.json';
import Card from './ui/card';

export default function Main_card({ isOpen, setIsSelected }) {
  return (
    <div
      className={`grid ${
        isOpen ? 'grid-cols-1' : 'grid-cols-2'
      } ${isOpen ? 'sm:grid-cols-2' : 'sm:grid-cols-3'} ${
        isOpen ? 'md:grid-cols-3' : 'md:grid-cols-4'
      } lg:grid-cols-6 xl:grid-cols-6 gap-6 px-4 sm:px-6 lg:px-10 py-6 transition-all duration-500`}
    >
      {cardData.map((card, index) => (
        <Card
          key={index}
          title={card.title}
          image={card.image}
          link={card.link}
          bg_color={card.bg_color}
          onSelection={() => setIsSelected(card)} // Pass selected card data
        />
      ))}
    </div>
  );
}
