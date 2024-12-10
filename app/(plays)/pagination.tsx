import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function PaginationComponent({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) {

    const getPageNumbers = () => {
        const pageNumbers = [];

        // If there are less than or equal to 3 pages, show them all
        if (totalPages <= 3) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            // Show the first page
            if (currentPage > 2) {
                pageNumbers.push(1);
            }
            // Add ellipsis if not starting from page 2
            if (currentPage > 3) {
                pageNumbers.push('...');
            }

            // Show current page and neighboring pages (max of 3 pages)
            const start = Math.max(1, currentPage - 1);
            const end = Math.min(totalPages, currentPage + 1);
            for (let i = start; i <= end; i++) {
                pageNumbers.push(i);
            }

            // Add ellipsis if not ending on the last page
            if (currentPage < totalPages - 2) {
                pageNumbers.push('...');
            }

            // Show the last page
            if (currentPage < totalPages - 1) {
                pageNumbers.push(totalPages);
            }
        }

        return pageNumbers;
    };

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => onPageChange(currentPage - 1)} />
                </PaginationItem>
                {getPageNumbers().map((page, index) =>
                    typeof page === 'number' ? (
                        <PaginationItem
                            key={index}
                            onClick={() => onPageChange(page)}
                        >
                            <PaginationLink isActive={page == currentPage}>{page}</PaginationLink>
                        </PaginationItem>
                    ) : (
                        <PaginationItem key={index}>
                            <PaginationEllipsis />
                        </PaginationItem>
                    )
                )}
                <PaginationItem>
                    <PaginationNext
                        onClick={() => onPageChange(currentPage + 1)} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
