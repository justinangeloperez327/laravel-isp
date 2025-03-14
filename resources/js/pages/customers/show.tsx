import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Customer, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Show Customer',
        href: '/customers/show',
    },
];

export default function Show({ customer }: { customer: Customer }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Show Customer" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="w-full max-w-2xl overflow-x-auto">
                    <Card className="">
                        <CardHeader>
                            <CardTitle>Customer Details</CardTitle>
                            <CardDescription>
                                <p>Customer Description</p>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flow-root">
                                <dl className="-my-3 divide-y text-sm">
                                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                        <dt className="font-medium">Registration Date</dt>
                                        <dd className="sm:col-span-2">{customer.registration_date}</dd>
                                    </div>
                                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                        <dt className="font-medium">Firstname</dt>
                                        <dd className="sm:col-span-2">{customer.first_name}</dd>
                                    </div>
                                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                        <dt className="font-medium">Middlename</dt>
                                        <dd className="sm:col-span-2">{customer.middle_name}</dd>
                                    </div>
                                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                        <dt className="font-medium">Lastname</dt>
                                        <dd className="sm:col-span-2">{customer.last_name}</dd>
                                    </div>
                                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                        <dt className="font-medium">Email</dt>
                                        <dd className="sm:col-span-2">{customer.email}</dd>
                                    </div>
                                </dl>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
