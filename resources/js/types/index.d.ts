import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Customer {
    id: string;
    registration_date: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    mobile_no: string;
    email: string;
    floor_unit?: string;
    street?: string;
    compound_or_building?: string;
    barangay?: string;
    municipality_or_city?: string;
    province?: string;
    created_at?: string;
    updated_at?: string;
}

export interface Device {
    id: number;
    name: string;
    type: string;
    description: string;
    model: string;
    serial_no: string;
    mac_address: string;
    ip_address: string;
    status: string;
    created_at: string;
    updated_at: string;
}

export interface CustomerDevice {
    id: number;
    customer_id: number;
    device_id: number;
    remarks: string;
    created_at: string;
    updated_at: string;
}

export interface PaginatedData {
    data: [];
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: [];
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string;
    to: number;
    total: number;
}

export interface PaginationLink {
    url: string;
    label: string;
    active: boolean;
}
