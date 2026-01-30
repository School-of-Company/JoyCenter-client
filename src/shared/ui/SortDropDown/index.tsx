'use client';

import { useState } from 'react';
import Arrow from '@/shared/assets/svg/Arrow';
import { SortType } from '@/entity/post/api/post';

type SortOption = '최신순' | '오래된순';

interface SortDropDownProps {
  onSortChange?: (sort: SortType) => void;
}

export default function SortDropDown({ onSortChange }: SortDropDownProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<SortOption>('최신순');

  const handleSelect = (option: SortOption) => {
    setSelected(option);
    setOpen(false);

    if (onSortChange) {
      const sortType: SortType =
        option === '최신순' ? 'CREATED_AT_DESC' : 'CREATED_AT_ASC';
      onSortChange(sortType);
    }
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="text-body1 flex items-center gap-2 px-3 py-1 font-medium text-gray-500"
      >
        {selected}
        <Arrow />
      </button>

      {open && (
        <div className="absolute left-0 z-10 flex flex-col gap-1.5 rounded border border-gray-100 bg-[#F9F9F9e6] px-3 py-2">
          <button
            onClick={() => handleSelect('최신순')}
            className="text-body5 rounded px-3 py-2 font-light text-gray-900"
          >
            최신순
          </button>

          <hr className="border-gray-100" />

          <button
            onClick={() => handleSelect('오래된순')}
            className="text-body5 rounded px-3 py-2 font-light text-gray-900"
          >
            오래된순
          </button>
        </div>
      )}
    </div>
  );
}
