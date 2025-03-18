import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';

interface DatePickerProps {
    value: string;
    onChange: (date: string) => void;
    closeOnDateSelect?: boolean;
}

export function DatePicker({ value, onChange, closeOnDateSelect }: DatePickerProps) {
    const [date, setDate] = useState<Date | null>(value ? new Date(value) : null);
    const [open, setOpen] = useState(false);

    const handleDateSelect = (selectedDate: Date | null) => {
        setDate(selectedDate);
        if (selectedDate) {
            onChange(format(selectedDate, 'yyyy-MM-dd'));
        }
        if (closeOnDateSelect) {
            setOpen(false);
        }
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant={'outline'} className={cn('w-[240px] justify-start text-left font-normal', !date && 'text-muted-foreground')}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={date} onSelect={handleDateSelect} initialFocus />
            </PopoverContent>
        </Popover>
    );
}
