import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Billing',
        href: '/billing',
    },
];

export default function Index() {
    const billings = [
        {
            address: '123 Main St',
            name: 'John Doe',
            jobNumber: 'JO123',
            bill: '$100',
            paymentMethod: 'GCash',
            contactNumber: '123-456-7890',
            plan: 'Basic',
        },
        {
            address: '123 Main St',
            name: 'John Doe',
            jobNumber: 'JO123',
            bill: '$100',
            paymentMethod: 'GCash',
            contactNumber: '123-456-7890',
            plan: 'Basic',
        },
        {
            address: '123 Main St',
            name: 'John Doe',
            jobNumber: 'JO123',
            bill: '$100',
            paymentMethod: 'GCash',
            contactNumber: '123-456-7890',
            plan: 'Basic',
        },
        {
            address: '123 Main St',
            name: 'John Doe',
            jobNumber: 'JO123',
            bill: '$100',
            paymentMethod: 'GCash',
            contactNumber: '123-456-7890',
            plan: 'Basic',
        },
        {
            address: '123 Main St',
            name: 'John Doe',
            jobNumber: 'JO123',
            bill: '$100',
            paymentMethod: 'GCash',
            contactNumber: '123-456-7890',
            plan: 'Basic',
        },
        {
            address: '123 Main St',
            name: 'John Doe',
            jobNumber: 'JO123',
            bill: '$100',
            paymentMethod: 'GCash',
            contactNumber: '123-456-7890',
            plan: 'Basic',
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Customers" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Address</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>JO#</TableHead>
                                <TableHead>Bill</TableHead>
                                <TableHead>OR/GCash</TableHead>
                                <TableHead>Contact#</TableHead>
                                <TableHead>Plan</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {billings.map((billing, index) => (
                                <TableRow key={index}>
                                    <TableCell>{billing.address}</TableCell>
                                    <TableCell>{billing.name}</TableCell>
                                    <TableCell>{billing.jobNumber}</TableCell>
                                    <TableCell>{billing.bill}</TableCell>
                                    <TableCell>{billing.paymentMethod}</TableCell>
                                    <TableCell>{billing.contactNumber}</TableCell>
                                    <TableCell>{billing.plan}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
