import Api from '../../../services/api/api.service';
import { API_ROUTE } from '../../../services/api/routes.ts';

import type { OrderListResponseDto } from './dto/get-orders-response.dto.ts';

export type OrdersQueryParams = {
    orderId?: string;
    status?: string;
    place?: string;
    user?: string;
    page: number;
    limit?: number;
};

const DEFAULT_ORDER_LIMIT = 10;

export const getOrders = (params: OrdersQueryParams) =>
    Api.get<OrderListResponseDto>(API_ROUTE.orders, {
        orderId: params.orderId,
        orderStatus: params.status,
        places: params.place,
        userLogin: params.user,
        page: params.page,
        limit: params.limit || DEFAULT_ORDER_LIMIT,
    });
