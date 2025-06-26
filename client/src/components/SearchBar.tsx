function SearchBar() {
  return (
    <div className="flex items-center w-full h-12 bg-[#e7edf4] rounded-lg overflow-hidden">
      <div className="text-[#49739c] flex items-center justify-center pl-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 256 256"
        >
          <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
        </svg>
      </div>
      <input
        placeholder="Search"
        className="form-input w-full px-3 py-2 text-[#49739c] bg-[#e7edf4] placeholder-[#49739c] focus:outline-none border-none"
      />
    </div>
  );
}

export default SearchBar;
