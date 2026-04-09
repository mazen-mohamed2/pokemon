type Props = {
    currentPage: number;
    totalPages: number;
    onPrev: () => void;
    onNext: () => void;
    onPageChange: (page: number) => void;
  };
  
  export default function PaginationControls({
    currentPage,
    totalPages,
    onPrev,
    onNext,
    onPageChange,
  }: Props) {
    const getPageNumbers = () => {
      const pages: (number | string)[] = [];
  
      if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      }
  
      pages.push(1);
      if (currentPage + 1 > 4) pages.push('...');
  
      const start = Math.max(2, currentPage + 1 - 1);
      const end = Math.min(totalPages - 1, currentPage + 1 + 1);
  
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
  
      if (currentPage + 1 < totalPages - 3) pages.push('...');
      pages.push(totalPages);
  
      return pages;
    };
  
    const itemsPerPage = 20;
  
    return (
      <div className="flex flex-col items-center gap-2 mt-6">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onPrev}
            disabled={currentPage === 0}
            aria-label="Previous page"
            className="px-3 py-1 rounded disabled:opacity-50 cursor-pointer"
          >
            &lt; Previous
          </button>
  
          <div className="flex gap-1 mx-2">
            {getPageNumbers().map((pageNumber, index) =>
              typeof pageNumber === 'number' ? (
                <button
                  key={index}
                  type="button"
                  onClick={() => onPageChange(pageNumber - 1)}
                  aria-label={`Page ${pageNumber}`}
                  aria-current={currentPage + 1 === pageNumber ? 'page' : undefined}
                  className={`px-3 py-1 rounded cursor-pointer ${
                    currentPage + 1 === pageNumber ? 'bg-black text-white' : ''
                  }`}
                >
                  {pageNumber}
                </button>
              ) : (
                <span key={index} className="px-3 py-1 select-none">
                  ...
                </span>
              )
            )}
          </div>
  
          <button
            type="button"
            onClick={onNext}
            disabled={currentPage === totalPages - 1}
            aria-label="Next page"
            className="px-3 py-1 rounded disabled:opacity-50 cursor-pointer"
          >
            Next &gt;
          </button>
        </div>
  
        <div className="text-sm text-gray-600 mt-2">
          Page {currentPage + 1} of {totalPages} ({itemsPerPage} Pokémon shown)
        </div>
      </div>
    );
  }
  