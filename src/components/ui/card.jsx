import React from 'react';
import classNames from 'classnames';

export default function Card({ title, image, link, bg_color, onClick }) {
  return (
    <div
      className={classNames(
        'group border-solid border-2 relative rounded flex flex-col bg-orange-400 overflow-hidden pt-2 transition-all duration-300',
        bg_color ? bg_color : 'bg-gray-200'
      )}
    >
      <div className="flex flex-row justify-between px-2 py-4 pr-4 items-center">
        <p className="text-sm text-white font-medium">{title}</p>
        {image && (
          <img
            className="w-10 h-10 transition-transform duration-300 ease-in-out group-hover:scale-150 group-hover:transform-origin-top absolute right-1 top-1"
            src={image}
            alt="image"
          />
        )}
      </div>

      <div
        className="flex flex-row items-center gap-1 bg-purple-400 px-10 py-2 cursor-pointer"
        onClick={onClick}
      >
        <a className="text-xs text-white font-medium">Click to Open</a>
        <img
          className="w-2 h-2 bg-white rounded"
          src="./images/right_finger.svg"
          alt="arrow"
        />
      </div>
    </div>
  );
}
