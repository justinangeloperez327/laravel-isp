import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PaginationLink, Plan } from '@/types';
import { router } from '@inertiajs/react';
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    PaginationState,
    useReactTable,
} from '@tanstack/react-table';
import { ChevronFirstIcon, ChevronLastIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useState } from 'react';
interface PaginatedData {
    data: Plan[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: PaginationLink[];
    to: number;
    from: number;
}

interface DataTableProps {
    columns: ColumnDef<Plan>[];
    paginatedData: PaginatedData;
}

export function DataTable({ columns, paginatedData }: DataTableProps) {
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: paginatedData.current_page - 1,
        pageSize: paginatedData.per_page,
    });
    const [globalFilter, setGlobalFilter] = useState<string>('');

    const table = useReactTable({
        data: paginatedData.data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        manualFiltering: true,
        manualPagination: true,
        pageCount: Math.ceil(paginatedData.total / pagination.pageSize), // Use total rows from backend
        onPaginationChange: (updater) => {
            const newPagination = typeof updater === 'function' ? updater(pagination) : updater;
            setPagination(newPagination);

            router.get(
                route('plans.index'),
                {
                    page: newPagination.pageIndex + 1,
                    per_page: newPagination.pageSize,
                    search: globalFilter,
                },
                { preserveState: true, preserveScroll: true },
            );
        },
        onGlobalFilterChange: (value) => {
            setGlobalFilter(value);
            router.get(
                route('plans.index'),
                {
                    page: pagination.pageIndex + 1,
                    per_page: pagination.pageSize,
                    search: value,
                },
                { preserveState: true, preserveScroll: true },
            );
        },

        state: {
            pagination,
            globalFilter,
        },
    });

    return (
        <div>
            <div className="flex items-center py-4">
                <Input
                    placeholder="Search..."
                    value={globalFilter ?? ''} // Bind to globalFilter state
                    onChange={(e) => {
                        const value = e.target.value || ''; // Use undefined to clear the filter
                        setGlobalFilter(value); // Update globalFilter state
                        table.setGlobalFilter(value); // Update table's global filter
                    }}
                    className="max-w-sm"
                />
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-between space-x-2 py-4">
                <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium">Rows per page</p>
                    <Select
                        value={table.getState().pagination.pageSize.toString()}
                        onValueChange={(value) => {
                            table.setPageSize(Number(value));
                        }}
                    >
                        <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[10, 20, 50, 100].map((pageSize) => (
                                <SelectItem key={pageSize} value={pageSize.toString()}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                {/* <div className="flex items-center space-x-2">
                    <span className="text-sm">
                        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </span>
                </div> */}
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronFirstIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="h-8 w-8 p-0" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                        <ChevronLeftIcon className="h-4 w-4" />
                    </Button>
                    {table.getPageOptions().map((page) => (
                        <Button
                            key={page}
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() => table.setPageIndex(page)}
                            disabled={table.getState().pagination.pageIndex === page}
                        >
                            {page + 1}
                        </Button>
                    ))}
                    <Button variant="outline" className="h-8 w-8 p-0" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                        <ChevronRightIcon className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                    >
                        <ChevronLastIcon className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
