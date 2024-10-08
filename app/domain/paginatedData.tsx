interface PaginatedData<TData> {
    items: TData[];
    totalPages: number;
    currentPage: number;
}