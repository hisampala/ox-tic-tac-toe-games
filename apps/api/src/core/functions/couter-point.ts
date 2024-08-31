import { HistoryOptionalDefaults } from "@ox/schema";
export const couter_point_lost = (list: HistoryOptionalDefaults[]) => {
    const filter_lost = [...list].filter((f) => !f.is_winner);
    return filter_lost.length
}
export const couter_point_win = (list: HistoryOptionalDefaults[]) => {
    const filter_winner = [...list].filter((f) => f.is_winner);
    const filter_combo_winner = [...list].filter((f) => f.is_combo_winner);
    const point_winner_total = (filter_combo_winner.length) + filter_winner.length - couter_point_lost(list)
    return point_winner_total
}
