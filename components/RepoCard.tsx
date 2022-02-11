import { HeartIcon as OutlineHeartIcon } from '@heroicons/react/outline';
import { HeartIcon as SolidHeartIcon, StarIcon } from '@heroicons/react/solid';
import { Repo } from '@interfaces/repository';
import React, { FC } from 'react';

type Props = {
  item: Repo;
  toggleFavourite: (item: Repo) => void;
};

const RepoCard: FC<Props> = ({ item, toggleFavourite }) => {
  return (
    <div className="p-4 mb-4 border-2 rounded-lg shadow-sm">
      <div className="flex space-x-2">
        <a href={item.url} className="font-bold duration-150 ease-out hover:scale-105">
          {item.name}
        </a>

        <div className="flex">
          <StarIcon className="h-6 text-yellow-400 pr-0.5" />
          <p className="font-slim">{item.starCount}</p>
        </div>

        {item.isFavourite ? (
          <button onClick={() => toggleFavourite(item)}>
            <SolidHeartIcon className="h-6 text-red-500 duration-150 ease-out cursor-pointer hover:scale-110" />
          </button>
        ) : (
          <button onClick={() => toggleFavourite(item)}>
            <OutlineHeartIcon className="h-6 text-red-500 duration-150 ease-out cursor-pointer hover:scale-110" />
          </button>
        )}
      </div>

      <p className="pt-1">{item.description}</p>
    </div>
  );
};

export default RepoCard;
