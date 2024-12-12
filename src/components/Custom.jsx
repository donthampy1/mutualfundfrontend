import React, { useState , useEffect } from "react"


const CustomSelect = ({ options, onOptionselect, displayData, category, disabled,  width}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [search, setSearch] = useState("")
    const [selectedOption, setSelectedOption] = useState("")
  
    const filteredOptions = options.filter(option =>
      option.toLowerCase().includes(search.toLowerCase())
    )
  
    const handleSelect = option => {
      setSelectedOption(option)
      onOptionselect(option)
      setIsOpen(false)
      setSearch("")
    }
    return (
      <div className={`${width}`}>
        {/* Select Field */}
        <button disabled={ disabled }
          className={`border-2 border-black rounded-lg p-2 font-thin text-sm w-full text-left bg-white  disabled:bg-gray-300 disabled:border disabled:text-gray-500 disabled:cursor-not-allowed ${
            !selectedOption ? "text-gray-500" : "text-black"
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {displayData || category}
        </button>
  
        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute rounded-lg  mt-1 w-96  border-black bg-white z-10 shadow-lg">
            {/* Search Field */}
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="p-2 w-full border-b"
            />
            {/* Options */}
            <div className="max-h-40 overflow-y-auto">
              {filteredOptions.map(option => (
                <div
                  key={option}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelect(option)}
                >
                  {option}
                </div>
              ))}
              {/* Fallback if no options match */}
              {filteredOptions.length === 0 && (
                <div className="p-2 text-gray-500 text-sm">No results found</div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }


export default CustomSelect