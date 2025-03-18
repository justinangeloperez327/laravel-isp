import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

interface Customer {
    id: number;
    address: string;
    name: string;
    jo_number: string;
    bill: string;
    payment_type: string;
    contact_number: string;
    plan: string;
}

export default function Index({ customer }: { customer: Customer }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Billing',
            href: `/billing/${customer.id}/edit`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Plans" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="overflow-x-auto">
                    <div className="flex items-center">
                        {/* <Link href="/billing/generate" className="">
                            <Button>Generate</Button>
                        </Link> */}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
