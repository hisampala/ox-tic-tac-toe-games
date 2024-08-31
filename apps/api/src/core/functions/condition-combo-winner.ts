import { HistoryOptionalDefaults } from "@ox/schema";

export const condition_combo_winner = (item_current: HistoryOptionalDefaults) => {
    return (list_prev: HistoryOptionalDefaults[]) => {
        // Add the new item to the list
        const temps = [...list_prev, item_current];
        // Check if we have exactly 3 items
        if (temps.length !== 3) return false;
        console.log("------------------------------ condition combo winner ------------------------------");
        temps.forEach((f, i) => {
            console.log(`user_id:${f.user_id}`, `round:${i + 1}`, { is_winner: f.is_winner });
        });
        // Check if all items have is_winner as true and none have is_combo_winner as true
        const is_combo_winner = temps.every(f => f.is_winner === true) && !temps.some(f => f.is_combo_winner === true);
        console.log("------------------------------ condition combo winner ------------------------------");
        console.log({ is_combo_winner });
        return is_combo_winner;
    };
};
