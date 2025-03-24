import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

export type Customer = {
    id: string;
    registration_date: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    mobile_no: string;
    email: string;
};

export const columns: ColumnDef<Customer>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
        enableResizing: false,
        size: 10,
    },
    {
        accessorKey: 'registration_date',
        header: 'Registration Date',
        enableResizing: false,
        size: 200,
    },
    {
        accessorKey: 'first_name',
        header: 'First Name',
        enableResizing: false,
        size: 200,
    },
    {
        accessorKey: 'middle_name',
        header: 'Middle Name',
        enableResizing: false,
        size: 200,
    },
    {
        accessorKey: 'last_name',
        header: 'Last Name',
        enableResizing: false,
        size: 200,
    },
    {
        accessorKey: 'mobile_no',
        header: 'Mobile No.',
        enableResizing: false,
        size: 200,
    },
    {
        accessorKey: 'status',
        header: 'Status',
        enableResizing: false,
        size: 200,
    },
    {
        accessorKey: 'email',
        header: 'Email',

        enableResizing: false,
        size: 200,
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
