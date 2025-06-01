import './selectList.css';
import { useState } from 'react';

interface Props {
  type?: 'banner' | 'star' | 'option';
  setSelectedOption: (option: string) => void;
  listOptions?: { value: string; label: string }[];
}

const storageKeyByType = (type?: 'banner' | 'star' | 'option') => {
  switch (type) {
    case 'banner':
      return 'selectedBanner';
    case 'star':
      return 'selectedStar';
    default:
      return 'selectedOption';
  }
};

export default function SelectList({
  setSelectedOption,
  listOptions = [],
  type
}: Props) {
  const storageKey = storageKeyByType(type);

  const [selected, setSelected] = useState<string>(() => {
    return (
      localStorage.getItem(storageKey) ||
      (listOptions.length > 0 ? listOptions[0].value : '')
    );
  });

  const isSelected = (option: string) => selected === option;

  const handleChooseOption = (option: string) => {
    setSelected(option);
    setSelectedOption(option);
    localStorage.setItem(storageKey, option);
  };

  return (
    <div className="select-list z-10 w-full">
      {listOptions.map((option) => (
        <div
          key={option.value}
          className={`item ${isSelected(option.value) ? 'selected' : ''}`}
          onClick={() => handleChooseOption(option.value)}
        >
          <span className="option-label">{option.label}</span>
          {isSelected(option.value) && <i className="gi gi-check"></i>}
        </div>
      ))}
    </div>
  );
}
