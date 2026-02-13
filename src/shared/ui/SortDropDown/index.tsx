'use client';

import { useState } from 'react';
import Arrow from '@/shared/assets/svg/Arrow';
import { SortType } from '@/shared/types/post';

export const SORT_OPTION: Record<SortType, string> = {
  CREATED_AT_DESC: '최신순',
  CREATED_AT_ASC: '오래된순',
} as const;

interface SortDropDownProps {
  onSortChange?: (sort: SortType) => void;
}

export default function SortDropDown({ onSortChange }: SortDropDownProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string>(SORT_OPTION.CREATED_AT_DESC);

  const handleSelect = (option: string) => {
    setSelected(option);
    setOpen(false);

    if (onSortChange) {
      const sortType: SortType =
        option === SORT_OPTION.CREATED_AT_DESC
          ? 'CREATED_AT_DESC'
          : 'CREATED_AT_ASC';
      onSortChange(sortType);
    }
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="text-body1 flex cursor-pointer items-center gap-2 px-3 py-1 font-medium text-gray-500"
      >
        {selected}
        <Arrow />
      </button>

      {open && (
        <div className="absolute left-0 z-10 flex flex-col gap-1.5 rounded border border-gray-100 bg-[#F9F9F9e6] px-3 py-2">
          <button
            onClick={() => handleSelect(SORT_OPTION.CREATED_AT_DESC)}
            className="text-body5 cursor-pointer rounded px-3 py-2 font-light text-gray-900"
          >
            {SORT_OPTION.CREATED_AT_DESC}
          </button>

          <hr className="border-gray-100" />

          <button
            onClick={() => handleSelect(SORT_OPTION.CREATED_AT_ASC)}
            className="text-body5 cursor-pointer rounded px-3 py-2 font-light text-gray-900"
          >
            {SORT_OPTION.CREATED_AT_ASC}
          </button>
        </div>
      )}
    </div>
  );
}
