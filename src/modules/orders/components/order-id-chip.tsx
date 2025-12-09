import { Chip, Tooltip } from '@mui/material';

const shortId = (id: string) => id.slice(0, 4) + '…';

export const OrderIdChip = ({ id }: { id: string }) => (
    <Tooltip title={id}>
        <Chip
            label={shortId(id)}
            size="small"
            sx={{
                fontFamily: 'monospace',
                bgcolor: 'grey.900',
                color: 'grey.100',
                height: 22,
            }}
        />
    </Tooltip>
);
