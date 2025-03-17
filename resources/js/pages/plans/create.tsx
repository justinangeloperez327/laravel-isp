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
        title: 'Create Plan',
        href: '/plans/create',
    },
];

type PlanForm = {
    name: string;
    description: string;
    speed: string;
    price: string;
};

interface CreatePlanProps {
    status?: string;
}

export default function Create({ status }: CreatePlanProps) {
    const { data, setData, post, processing, errors, reset } = useForm<PlanForm>({
        name: '',
        description: '',
        speed: '',
        price: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('plans.store'), {
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
            <Head title="Create Plan" />
            <div className="w-full max-w-4xl">
                <div className="flex h-full flex-6 flex-col gap-4 rounded-xl p-4">
                    <Card className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                        <CardHeader>
                            <CardTitle>Create Plan</CardTitle>
                            <CardDescription>
                                <p>Create a new plan.</p>
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
                                        <Label htmlFor="speed">Speed</Label>
                                        <Input
                                            id="speed"
                                            type="text"
                                            required
                                            tabIndex={3}
                                            value={data.speed}
                                            onChange={(e) => setData('speed', e.target.value)}
                                            placeholder="Speed"
                                        />
                                        <InputError message={errors.speed} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="price">Price</Label>
                                        <Input
                                            id="price"
                                            type="text"
                                            required
                                            tabIndex={4}
                                            value={data.price}
                                            onChange={(e) => setData('price', e.target.value)}
                                            placeholder="Price"
                                        />
                                        <InputError message={errors.price} />
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
