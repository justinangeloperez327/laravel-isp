import { columns } from '@/components/customers/columns';
import { DataTable } from '@/components/customers/data-table';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Customer, PaginationLink, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Customers',
        href: '/customers',
    },
];

interface PaginatedData {
    data: Customer[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: PaginationLink[];
    to: number;
    from: number;
}

export default function Index({ data, status }: { data: PaginatedData; status: string }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Customers" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="overflow-x-auto">
                    <div className="flex items-center">
                        <Link href="/customers/create" className="">
                            <Button>New Customer</Button>
                        </Link>
                    </div>
                    <DataTable columns={columns} paginatedData={data} />
                </div>
                {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
            </div>
        </AppLayout>
    );
}
