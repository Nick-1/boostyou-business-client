import {
    Paper,
    Stack,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Button,
} from '@mui/material';
import type { Filters } from '../hooks/use-orders.ts';

const ORDER_STATUS_OPTIONS = [
    { value: '', label: 'All' },
    { value: 'pending', label: 'Pending' },
    { value: 'waitingForPrint', label: 'Waiting for print' },
    { value: 'printed', label: 'Printed' },
];

type Props = {
    filters: Filters;
    onChange: (next: Filters) => void;
    onApply: () => void;
};

export const OrdersFilters: React.FC<Props> = ({ filters, onChange, onApply }) => {
    const update = (patch: Partial<Filters>) =>
        onChange({ ...filters, ...patch });

    return (
        <Paper sx={{ p: 2, mb: 2 }}>
            <Stack
                direction={{ xs: 'column', md: 'row' }}
                spacing={2}
                alignItems="flex-end"
            >
                <TextField
                    size="small"
                    label="Order Id"
                    value={filters.orderId}
                    onChange={(e) => update({ orderId: e.target.value })}
                />

                <FormControl sx={{ minWidth: 180 }} size="small">
                    <InputLabel id="status-filter-label">Status</InputLabel>
                    <Select
                        labelId="status-filter-label"
                        label="Status"
                        value={filters.status}
                        onChange={(e) => update({ status: e.target.value })}
                    >
                        {ORDER_STATUS_OPTIONS.map((opt) => (
                            <MenuItem key={opt.value || 'all'} value={opt.value}>
                                {opt.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    size="small"
                    label="Place (name)"
                    value={filters.place}
                    onChange={(e) => update({ place: e.target.value })}
                />

                <TextField
                    size="small"
                    label="Customer"
                    value={filters.user}
                    onChange={(e) => update({ user: e.target.value })}
                />

                <Button variant="contained" onClick={onApply}>
                    Submit
                </Button>
            </Stack>
        </Paper>
    );
};
