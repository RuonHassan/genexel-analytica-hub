
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";

interface ArticlesPaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const ArticlesPagination = ({
  currentPage,
  totalPages,
  setCurrentPage
}: ArticlesPaginationProps) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <Pagination className="mt-12">
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))} />
          </PaginationItem>
        )}
        
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <PaginationItem key={page}>
            <PaginationLink 
              isActive={page === currentPage}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default ArticlesPagination;
