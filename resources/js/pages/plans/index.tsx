import { columns } from '@/components/plans/columns';
import { DataTable } from '@/components/plans/data-table';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { PaginationLink, Plan, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Plans',
        href: '/plans',
    },
];

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

export default function Index({ data }: { data: PaginatedData; status: string }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Plans" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="overflow-x-auto">
                    <div className="flex items-center">
                        <Link href="/plans/create" className="">
                            <Button>New Plan</Button>
                        </Link>
                    </div>
                    <DataTable columns={columns} paginatedData={data} />
                </div>
            </div>
        </AppLayout>
    );
}
