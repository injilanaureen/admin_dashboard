import React from 'react';
import classNames from 'classnames';
import { ArrowBigRight, CircleArrowRightIcon } from 'lucide-react';

export default function Card({ title, image, link, bg_color, onClick }) {
  console.log(bg_color);
  return (
    <div
      className={classNames(
        'group relative rounded-md shadow-md flex flex-col overflow-hidden pt-2 transition-all duration-300',
        bg_color ? bg_color : 'bg-red-200'
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
        <CircleArrowRightIcon className='scale-75 text-white'/>
      </div>
    </div>
  );
}
