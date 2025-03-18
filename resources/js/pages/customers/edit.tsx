import { DatePicker } from '@/components/date-picker';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { Customer, Device, type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
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

    floor_or_unit: string;
    street: string;
    compound_or_building: string;
    barangay: string;
    municipality_or_city: string;
    province: string;

    plan_id: string;
    start_date?: string;
    end_date?: string;
    status?: string;

    lp?: string;
    np?: string;
    slot?: string;
    billing_due?: string;
    devices?: number[];
};

interface Plan {
    id: number;
    name: string;
    price: number;
}
interface EditCustomerProps {
    status?: string;
    plans: Plan[];
    devices: Device[];
    customer: Required<Customer>;
}

export default function Edit({ status, plans, devices, customer }: EditCustomerProps) {
    const { data, setData, put, processing, errors, reset } = useForm<Required<CustomerForm>>({
        registration_date: customer.registration_date,
        first_name: customer.first_name,
        middle_name: customer.middle_name,
        last_name: customer.last_name,
        email: customer.email,
        mobile_no: customer.mobile_no,
        floor_or_unit: customer.floor_or_unit,
        street: customer.street,
        compound_or_building: customer.compound_or_building,
        barangay: customer.barangay,
        municipality_or_city: customer.municipality_or_city,
        province: customer.province,
        plan_id: customer.plan_id.toString(),
        start_date: customer.start_date,
        end_date: customer.end_date,
        status: customer.status,
        lp: customer.lp,
        np: customer.np,
        slot: customer.slot,
        billing_due: customer.billing_due,
        devices: customer.devices.map((device) => device.id),
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log(data);
        put(route('customers.update', customer.id), {
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
            <Head title="Edit Customer" />
            <div className="w-full max-w-6xl">
                <div className="flex h-full gap-8 rounded-xl p-4">
                    <Card className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                        <CardHeader>
                            <CardTitle>Edit Customer</CardTitle>
                            <CardDescription>
                                <p>Edit Customer</p>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={submit}>
                                <div className="grid gap-8">
                                    <div className="grid gap-2">
                                        <Label htmlFor="registration-date">Registration Date</Label>
                                        <DatePicker
                                            value={data.registration_date}
                                            onChange={(date) => setData('registration_date', date)}
                                            closeOnDateSelect
                                        />
                                        <InputError message={errors.registration_date} />
                                    </div>
                                    <div className="grid gap-2">
                                        <h2 className="text-md mb-2 font-medium">Personal Information</h2>
                                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
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
                                        </div>

                                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
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
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <h2 className="text-md mb-2 font-medium">Address</h2>
                                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                                            <div className="grid gap-2">
                                                <Label htmlFor="floor-unit">Floor/Unit</Label>
                                                <Input
                                                    id="floor-unit"
                                                    type="text"
                                                    required
                                                    autoFocus
                                                    tabIndex={1}
                                                    autoComplete="floor-unit"
                                                    value={data.floor_or_unit}
                                                    onChange={(e) => setData('floor_or_unit', e.target.value)}
                                                    placeholder="Floor or Unit"
                                                />
                                                <InputError message={errors.floor_or_unit} />
                                            </div>

                                            <div className="grid gap-2">
                                                <Label htmlFor="street">Street</Label>
                                                <Input
                                                    id="street"
                                                    type="text"
                                                    required
                                                    autoFocus
                                                    tabIndex={1}
                                                    autoComplete="street"
                                                    value={data.street}
                                                    onChange={(e) => setData('street', e.target.value)}
                                                    placeholder="Street"
                                                />
                                                <InputError message={errors.street} />
                                            </div>

                                            <div className="grid gap-2">
                                                <Label htmlFor="compound-or-building">Compound/Building</Label>
                                                <Input
                                                    id="compound-or-building"
                                                    type="text"
                                                    required
                                                    autoFocus
                                                    tabIndex={1}
                                                    autoComplete="compound-or-building"
                                                    value={data.compound_or_building}
                                                    onChange={(e) => setData('compound_or_building', e.target.value)}
                                                    placeholder="Compound or Building"
                                                />
                                                <InputError message={errors.compound_or_building} />
                                            </div>

                                            <div className="grid gap-2">
                                                <Label htmlFor="barangay">Barangay</Label>
                                                <Input
                                                    id="barangay"
                                                    type="text"
                                                    required
                                                    autoFocus
                                                    tabIndex={1}
                                                    autoComplete="barangay"
                                                    value={data.barangay}
                                                    onChange={(e) => setData('barangay', e.target.value)}
                                                    placeholder="Barangay"
                                                />
                                                <InputError message={errors.barangay} />
                                            </div>

                                            <div className="grid gap-2">
                                                <Label htmlFor="municipality-or-city">Municipality/City</Label>
                                                <Input
                                                    id="municipality-or-city"
                                                    type="text"
                                                    required
                                                    autoFocus
                                                    tabIndex={1}
                                                    autoComplete="municipality-or-city"
                                                    value={data.municipality_or_city}
                                                    onChange={(e) => setData('municipality_or_city', e.target.value)}
                                                    placeholder="Municipality/City"
                                                />
                                                <InputError message={errors.municipality_or_city} />
                                            </div>

                                            <div className="grid gap-2">
                                                <Label htmlFor="province">Province</Label>
                                                <Input
                                                    id="province"
                                                    type="text"
                                                    required
                                                    autoFocus
                                                    tabIndex={1}
                                                    autoComplete="province"
                                                    value={data.province}
                                                    onChange={(e) => setData('province', e.target.value)}
                                                    placeholder="Province"
                                                />
                                                <InputError message={errors.province} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <h2 className="text-md mb-2 font-medium">Subscription Plan</h2>
                                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                                            <div className="col-span-2 grid gap-2">
                                                <Label htmlFor="plan">Plan</Label>
                                                <Select value={data.plan_id?.toString()} onValueChange={(value: string) => setData('plan_id', value)}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select a plan" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>Plans</SelectLabel>
                                                            {plans.map((plan) => (
                                                                <SelectItem key={plan.id} value={plan.id.toString()}>
                                                                    {plan.name} - {plan.price}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                                <InputError message={errors.plan_id} />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="billing-due">Billing Due</Label>
                                                <Select value={data.billing_due} onValueChange={(value: string) => setData('billing_due', value)}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select a billing due" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>Billing Due</SelectLabel>
                                                            <SelectItem value="15">Every 15th</SelectItem>
                                                            <SelectItem value="30">Every 30th</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                                <InputError message={errors.billing_due} />
                                            </div>
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="devices">Devices</Label>
                                            {devices.map((device) => (
                                                <div key={device.id} className="flex items-center gap-2">
                                                    <Checkbox
                                                        checked={data.devices.includes(device.id)}
                                                        onCheckedChange={(checked) => {
                                                            if (checked) {
                                                                setData('devices', [...data.devices, device.id]);
                                                            } else {
                                                                setData(
                                                                    'devices',
                                                                    data.devices.filter((id) => id !== device.id),
                                                                );
                                                            }
                                                        }}
                                                    />
                                                    <Label htmlFor={`device-${device.id}`}>{device.name}</Label>
                                                </div>
                                            ))}
                                            <InputError message={errors.devices} />
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <h2 className="text-md mb-1 font-medium">Fiber Slot</h2>
                                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                                            <div className="grid gap-2">
                                                <Label htmlFor="lp">LP</Label>
                                                <Input
                                                    id="lp"
                                                    type="text"
                                                    required
                                                    autoFocus
                                                    tabIndex={1}
                                                    autoComplete="lp"
                                                    value={customer.lp}
                                                    onChange={(e) => setData('lp', e.target.value)}
                                                    placeholder="LP"
                                                />
                                                <InputError message={errors.lp} />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="np">NP</Label>
                                                <Input
                                                    id="np"
                                                    type="text"
                                                    required
                                                    autoFocus
                                                    tabIndex={1}
                                                    autoComplete="np"
                                                    value={customer.np}
                                                    onChange={(e) => setData('np', e.target.value)}
                                                    placeholder="NP"
                                                />
                                                <InputError message={errors.np} />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="slot">Slot</Label>
                                                <Input
                                                    id="slot"
                                                    type="text"
                                                    required
                                                    autoFocus
                                                    tabIndex={1}
                                                    autoComplete="slot"
                                                    value={customer.slot}
                                                    onChange={(e) => setData('slot', e.target.value)}
                                                    placeholder="Slot"
                                                />
                                                <InputError message={errors.slot} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Button type="submit" className="mt-4" tabIndex={4} disabled={processing}>
                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                    Update
                                </Button>
                            </form>
                            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
