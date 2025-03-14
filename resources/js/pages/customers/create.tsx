import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import { CalendarIcon, LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Customer',
        href: '/customers/create',
    },
];

type CustomerForm = {
    registration_date: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    email: string;
    mobile_no: string;
};
interface CreateCustomerProps {
    status?: string;
}

export default function Create({ status }: CreateCustomerProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<CustomerForm>>({
        registration_date: format(new Date(), 'yyyy-MM-dd'),
        first_name: '',
        middle_name: '',
        last_name: '',
        email: '',
        mobile_no: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('customers.store'), {
            onSuccess: () => {
                console.log('success');
                reset();
            },
            onError: () => {
                console.log('error');
                console.log(errors);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Customer" />
            <div className="w-full max-w-4xl">
                <div className="flex h-full flex-6 flex-col gap-4 rounded-xl p-4">
                    <Card className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                        <CardHeader>
                            <CardTitle>Create Customer</CardTitle>
                            <CardDescription>
                                <p>Create a new customer.</p>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="flex flex-col gap-6" onSubmit={submit}>
                                <div className="grid gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="registration-date">Registration Date</Label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={'outline'}
                                                    className={cn(
                                                        'w-[240px] justify-start text-left font-normal',
                                                        !data.registration_date && 'text-muted-foreground',
                                                    )}
                                                >
                                                    <CalendarIcon />
                                                    {data.registration_date ? format(data.registration_date, 'PPP') : <span>Pick a date</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={data.registration_date ? new Date(data.registration_date) : undefined}
                                                    onSelect={(date) => setData('registration_date', date ? format(date, 'yyyy-MM-dd') : '')}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <InputError message={errors.registration_date} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="first-name">Firstname</Label>
                                        <Input
                                            id="first-name"
                                            type="text"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="firstname"
                                            value={data.first_name}
                                            onChange={(e) => setData('first_name', e.target.value)}
                                            placeholder="First Name"
                                        />
                                        <InputError message={errors.first_name} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="middlename">Middlename</Label>
                                        <Input
                                            id="middlename"
                                            type="text"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="middlename"
                                            value={data.middle_name}
                                            onChange={(e) => setData('middle_name', e.target.value)}
                                            placeholder="Middle Name"
                                        />
                                        <InputError message={errors.middle_name} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="last-name">Last Name</Label>
                                        <Input
                                            id="last-name"
                                            type="text"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="lastname"
                                            value={data.last_name}
                                            onChange={(e) => setData('last_name', e.target.value)}
                                            placeholder="Last Name"
                                        />
                                        <InputError message={errors.last_name} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email address</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="email@example.com"
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="mobile-number">Mobile No.</Label>
                                        <Input
                                            id="mobile-number"
                                            type="text"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="09xxxxxxxxx"
                                            value={data.mobile_no}
                                            onChange={(e) => setData('mobile_no', e.target.value)}
                                            placeholder="09xxxxxxxxx"
                                            maxLength={11}
                                            minLength={11}
                                        />
                                        <InputError message={errors.mobile_no} />
                                    </div>

                                    <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing}>
                                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                        Create
                                    </Button>
                                </div>
                            </form>
                            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
