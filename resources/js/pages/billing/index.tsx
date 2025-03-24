import { columns } from '@/components/billing/column';
import { DataTable } from '@/components/billing/data-table';
import AppLayout from '@/layouts/app-layout';
import { Billing, PaginationLink, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Billing',
        href: '/billing',
    },
];

interface PaginatedData {
    data: Billing[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: PaginationLink[];
    to: number;
    from: number;
}

export default function Index({ data }: { data: PaginatedData; status: string }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Plans" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="overflow-x-auto">
                    <DataTable columns={columns} paginatedData={data} />
                </div>
            </div>
        </AppLayout>
    );
}
