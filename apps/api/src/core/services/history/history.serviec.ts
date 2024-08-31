import { HistoryOptionalDefaults } from '@ox/schema';
import { Effect } from 'effect';

import { prismaService } from '../prisma/prisma.service';
import * as Error from './history.error';
import { userId } from '../../types';
import { condition_combo_winner } from '../../functions/condition-combo-winner';
import { couter_point_lost, couter_point_win } from '../../functions';
const create_pipe_line = (item: HistoryOptionalDefaults) => {
    return Effect.Do.pipe(
        Effect.let("user_id", () => userId(item.user_id)),
        Effect.bind("is_combo_winner", ({ user_id }) => process_is_combo_winner(user_id)(item)),
        Effect.map(({ is_combo_winner }) => ({ ...item, is_combo_winner }))
    )
}
const create_process = (item: HistoryOptionalDefaults) => {
    return Effect.tryPromise({
        try: async () => await prismaService.history.create({ data: item }),
        catch: (error: unknown) => new Error.CreateHistoryError({ message: (error as Error).message })
    })

}
const create = (item: HistoryOptionalDefaults) => Effect.Do.pipe(Effect.flatMap(() => create_pipe_line(item)), Effect.flatMap(create_process))
const process_is_combo_winner = (user_id: userId) => {
    return (item: HistoryOptionalDefaults) => Effect.tryPromise({
        try: async () => {
            const temps = await prismaService.history.findMany({
                where: { user_id }, orderBy: {
                    create_date: "desc"
                },
                take: 2,
            })
            return temps;
        },
        catch: (error: unknown) => new Error.ProcessIsComboWinner({ message: (error as Error).message })
    }).pipe(Effect.map(condition_combo_winner(item)))

}

const get_point = (user_id: userId) => Effect.tryPromise({
    try: async () => {
        const temps = await prismaService.history.findMany({
            where: { user_id }, orderBy: {
                create_date: "desc"
            },
        })
        return temps;
    },
    catch: (error: unknown) => new Error.GetPointError({ message: (error as Error).message })
}).pipe(Effect.map((l) => ({ win: couter_point_win(l), lost: couter_point_lost(l) })))
const get_all_user = () => {
    return Effect.tryPromise({
        try: async () => {
            const temps = await prismaService.history.findMany({
                select: { user_id: true, user_email: true, user_image: true,user_name:true },

            })
            return temps
        },
        catch: (error: unknown) => new Error.GetPointError({ message: (error as Error).message })
    })
}
const group_user = (list: {
    user_id: string;
    user_image: string;
    user_email: string;
    user_name:string;
}[]) => {
    return list.filter((value, index, self) =>
        index === self.findIndex((t) => (
            t.user_id === value.user_id
        ))
    );
}
const get_point_all = () => Effect.Do.pipe(
    Effect.flatMap(get_all_user),
    Effect.map(group_user),
    Effect.flatMap((users) =>
        Effect.forEach(users, (user) =>
            Effect.map(get_point(userId(user.user_id)), (points) => ({
                name: user.user_name,
                image: user.user_image,
                point: points.win
            }
            ))
            , { concurrency: "unbounded" })
    )
);

export const HistoryService = {
    create,
    process_is_combo_winner,
    get_point,
    get_point_all
}
export type THistoryService = typeof HistoryService