import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Device',
        href: '/devices/create',
    },
];

type DeviceForm = {
    name: string;
    description: string;
    type: string;
    model: string;
    serial_no: string;
    mac_address: string;
    remarks: string;
};

interface CreateDeviceProps {
    status?: string;
}

export default function Create({ status }: CreateDeviceProps) {
    const { data, setData, post, processing, errors, reset } = useForm<DeviceForm>({
        name: '',
        description: '',
        type: '',
        model: '',
        serial_no: '',
        mac_address: '',
        remarks: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('devices.store'), {
            onFinish: () => {
                reset();
            },
            onError: () => {
                console.log('error');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Device" />
            <div className="w-full max-w-4xl">
                <div className="flex h-full flex-6 flex-col gap-4 rounded-xl p-4">
                    <Card className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                        <CardHeader>
                            <CardTitle>Create Device</CardTitle>
                            <CardDescription>
                                <p>Create a new device.</p>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="flex flex-col gap-6" onSubmit={submit}>
                                <div className="grid gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="Name"
                                        />
                                        <InputError message={errors.name} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="description">Description</Label>
                                        <Input
                                            id="description"
                                            type="text"
                                            required
                                            tabIndex={2}
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            placeholder="Description"
                                        />
                                        <InputError message={errors.description} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="type">Type</Label>
                                        <Input
                                            id="type"
                                            type="text"
                                            required
                                            tabIndex={3}
                                            value={data.type}
                                            onChange={(e) => setData('type', e.target.value)}
                                            placeholder="Type"
                                        />
                                        <InputError message={errors.type} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="model">Model</Label>
                                        <Input
                                            id="model"
                                            type="text"
                                            required
                                            tabIndex={4}
                                            value={data.model}
                                            onChange={(e) => setData('model', e.target.value)}
                                            placeholder="Model"
                                        />
                                        <InputError message={errors.model} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="serial_no">Serial No</Label>
                                        <Input
                                            id="serial_no"
                                            type="text"
                                            required
                                            tabIndex={5}
                                            value={data.serial_no}
                                            onChange={(e) => setData('serial_no', e.target.value)}
                                            placeholder="Serial No"
                                        />
                                        <InputError message={errors.serial_no} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="mac_address">MAC Address</Label>
                                        <Input
                                            id="mac_address"
                                            type="text"
                                            required
                                            tabIndex={6}
                                            value={data.mac_address}
                                            onChange={(e) => setData('mac_address', e.target.value)}
                                            placeholder="MAC Address"
                                        />
                                        <InputError message={errors.mac_address} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="remarks">Remarks</Label>
                                        <Input
                                            id="remarks"
                                            type="text"
                                            required
                                            tabIndex={7}
                                            value={data.remarks}
                                            onChange={(e) => setData('remarks', e.target.value)}
                                            placeholder="Remarks"
                                        />
                                        <InputError message={errors.remarks} />
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
