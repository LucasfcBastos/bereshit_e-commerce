function Pagination({ setCurrentPage, totalPages, currentPage }) {

    const getPagination = () => {
        const pages = [];

        if (totalPages <= 1) return pages;

        if (totalPages <= 4) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
            return pages;
        }


        if (currentPage === 3) {
            pages.push(1, 2, 3, 4);
            pages.push("...");
            pages.push(totalPages);
            return pages;
        }

        if (currentPage < 4) {
            pages.push(1, 2, 3);
            pages.push("...");
            pages.push(totalPages);
            return pages;
        }

        if (currentPage === totalPages - 2) {
            pages.push(1);
            pages.push("...");

            for (let i = totalPages - 3; i <= totalPages; i++) {
                pages.push(i);
            }

            return pages;
        }

        if (currentPage > totalPages - 2) {
            pages.push(1);
            pages.push("...");

            for (let i = totalPages - 2; i <= totalPages; i++) {
                pages.push(i);
            }

            return pages;
        }

        // Meio
        pages.push(
            1,
            "...",
            currentPage - 1,
            currentPage,
            currentPage + 1,
            "...",
            totalPages
        );

        return pages;
    };

    const pages = getPagination();

    return (
        <div className="pagination">

            {currentPage > 1 && (
                <button onClick={() => setCurrentPage(currentPage - 1)}>
                    {"<"}
                </button>
            )}

            {pages.map((page, index) =>
                page === "..." ? (
                    <button key={`dots-${index}`} disabled style={{ cursor: "default" }}>
                        ...
                    </button>
                ) : (
                    <button key={page} className={page === currentPage ? "active" : ""} onClick={() => setCurrentPage(page)} >
                        {page}
                    </button>
                )
            )}

            {currentPage < totalPages && (
                <button onClick={() => setCurrentPage(currentPage + 1)}>
                    {">"}
                </button>
            )}

        </div>
    );
}

export default Pagination;