import { useState } from "react";

interface DropdownProps {
  label: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}

const Dropdown = ({ label, options, selected, onSelect }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full sm:w-auto min-w-[100px]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="border rounded-lg p-2 w-full sm:w-auto bg-white min-w-[100px]"
      >
        {selected || label}
      </button>
      {isOpen && (
        <div className="absolute top-12 left-0 w-full sm:w-auto bg-white border rounded-lg shadow-lg min-w-[100px]">
          <div
            key="default"
            onClick={() => {
              onSelect("");
              setIsOpen(false);
            }}
            className="p-2 hover:bg-gray-200 cursor-pointer"
          >
            {label}
          </div>
          {options.map((option) => (
            <div
              key={option}
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
              className="p-2 hover:bg-gray-200 cursor-pointer"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
