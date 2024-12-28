import React from 'react';

export default function Main_Components({ selectedCard }) {
  if (!selectedCard) {
    return <div className="text-gray-500 text-center">Select a card to view details</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold text-gray-800">{selectedCard.title}</h2>
      {selectedCard.children && selectedCard.children.length > 0 ? (
        <ul className="mt-4 space-y-2">
          {selectedCard.children.map((child, index) => (
            <li key={index} className="p-2 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer">
              <a href={child.link} className="text-blue-600">
                {child.title}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 mt-4">No additional items available</p>
      )}
    </div>
  );
}
