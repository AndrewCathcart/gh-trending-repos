import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { FC } from 'react';

type Props = {
  page: number;
  handleChange: (page: number) => void;
  hasNext: boolean;
};

const PaginationButtons: FC<Props> = ({ page, handleChange, hasNext }) => {
  return (
    <div className="flex justify-center space-x-2">
      {page > 1 && (
        <div
          className="p-1 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer hover:bg-gray-50"
          onClick={() => handleChange(page - 1)}
        >
          <ChevronLeftIcon data-testid="previous-page" className="w-5 h-5" />
        </div>
      )}
      <div data-testid="current-page" className="pt-1 font-semibold">
        {page}
      </div>
      {hasNext && (
        <div
          className="p-1 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer hover:bg-gray-50"
          onClick={() => handleChange(page + 1)}
        >
          <ChevronRightIcon data-testid="next-page" className="w-5 h-5" />
        </div>
      )}
    </div>
  );
};

export default PaginationButtons;
