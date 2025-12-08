const buildApiV1Path = (path: string) => (`/api/v1${path}`);

export const API_ROUTE = {
    orders: buildApiV1Path('/orders'),
} as const;
