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
    },
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'jo_number',
        header: 'JO#',
    },
    {
        accessorKey: 'bill',
        header: 'Bill',
    },
    {
        accessorKey: 'payment_type',
        header: 'OR/Gcash',
    },
    {
        accessorKey: 'contact_number',
        header: 'Contact #',
    },
    {
        accessorKey: 'plan',
        header: 'Plan',
    },
    {
        id: 'actions',
        header: 'Actions',
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
                            <Link href={`/customers/${customer.id}`}>View</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href={`/customers/${customer.id}/edit`}>Edit</Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
