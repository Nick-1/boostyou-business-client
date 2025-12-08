import Api from '../../../services/api/api.service';
import { API_ROUTE } from '../../../services/api/routes.ts';

import type { OrderListResponseDto } from './dto/get-orders-response.dto.ts';

export type OrdersQueryParams = {
    page: number;
    limit?: number;
    status?: string;
    place?: string;
    user?: string;
};

const DEFAULT_ORDER_LIMIT = 10;

export const getOrders = (params: OrdersQueryParams) =>
    Api.get<OrderListResponseDto>(API_ROUTE.orders, {
        page: params.page,
        limit: params.limit || DEFAULT_ORDER_LIMIT,
        orderStatus: params.status,
        places: params.place,
        userLogin: params.user,
    });
