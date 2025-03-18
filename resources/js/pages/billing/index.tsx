import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Billing, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Billing',
        href: '/billing',
    },
];

export default function Index({ customers }: { customers: Billing[] }) {
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
                    <Table>
                        <TableCaption>A list of your recent generate.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Address</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>JO#</TableHead>
                                <TableHead>Bill</TableHead>
                                <TableHead>OR/Gcash</TableHead>
                                <TableHead>Contact #</TableHead>
                                <TableHead>Plan</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {customers.map((customer) => (
                                <TableRow key={customer.id}>
                                    <TableCell>{customer.address}</TableCell>
                                    <TableCell>{customer.name}</TableCell>
                                    <TableCell>{customer.jo_number}</TableCell>
                                    <TableCell>{customer.bill}</TableCell>
                                    <TableCell>{customer.payment_type}</TableCell>
                                    <TableCell>{customer.contact_number}</TableCell>
                                    <TableCell>{customer.plan}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-2">
                                            <Link href={`/billing/${customer.id}/edit`}>
                                                <Button variant="outline">Edit</Button>
                                            </Link>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
