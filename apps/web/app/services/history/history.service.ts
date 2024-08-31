import { HistoryOptionalDefaults } from '@ox/schema';

import { gatewayService } from '../gateway/gateway.service';
import { TPoint } from '../../types/point.type';
import { TPlayerPoint } from '../../types/player-point.type';


const create = (item: HistoryOptionalDefaults) => gatewayService.post<HistoryOptionalDefaults>("/history/create", item)
const get_point = (user_id: string) => gatewayService.get<TPoint>(`/history/point/${user_id}`)
const get_points = () => gatewayService.get<TPlayerPoint[]>(`/history/point`)
export const HistoryService = {
    create,
    get_point,
    get_points
}