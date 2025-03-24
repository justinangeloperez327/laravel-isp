import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Billing } from '@/types';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

export const columns: ColumnDef<Billing>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
        enableResizing: false,
        size: 20,
    },
    {
        accessorKey: 'name',
        header: 'Name',
        enableResizing: false,
        size: 200,
    },
    {
        accessorKey: 'jo_number',
        header: 'JO#',
        enableResizing: false,
        size: 200,
    },
    {
        accessorKey: 'bill',
        header: 'Bill',
        enableResizing: false,
        size: 200,
    },
    {
        accessorKey: 'payment_type',
        header: 'OR/Gcash',
        enableResizing: false,
        size: 200,
    },
    {
        accessorKey: 'contact_number',
        header: 'Contact #',
        enableResizing: false,
        size: 200,
    },
    {
        accessorKey: 'plan',
        header: 'Plan',
        enableResizing: false,
        size: 200,
    },
    {
        id: 'actions',
        header: 'Actions',
        enableResizing: false,
        size: 200,
        cell: ({ row }) => {
            const customer = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link href={`/biiling/${customer.id}`}>View</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href={`/biiling/${customer.id}/edit`}>Edit</Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
