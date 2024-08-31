import { HistoryOptionalDefaults, HistoryOptionalDefaultsSchema } from '@ox/schema';
import { Cause, Effect, Exit } from 'effect';
import { Hono } from 'hono';
import { validator } from 'hono/validator';

import { THistoryService } from '../core/services/history/history.serviec';
import { userId } from '../core/types';

const create_validater = validator('json', (value, c) => {
    const parsed = HistoryOptionalDefaultsSchema.safeParse(value)
    if (!parsed.success) return c.json(parsed.error.errors, 401)
    return parsed.data
})

export const HistoryController = (service: THistoryService) => {
    const app = new Hono()
    app.post("/create", create_validater, async (c) => {
        try {
            const body = await c.req.valid("json");
            const program = service.create(body)
            const result = await Effect.runPromise(program)
            return c.json({ result })
        } catch (error) {
            return c.json({ error }, { status: 400 })
        }

    })
    app.get("/point", async (c) => {
        try {
          
            const program = service.get_point_all()
            const points = await Effect.runPromise(program)
            return c.json(points)
        } catch (error) {
            return c.json({ error }, { status: 400 })
        }
    })
    app.get("/point/:user_id", async (c) => {
        try {
            const { user_id } = c.req.param();
            const program = service.get_point(userId(user_id))
            const point = await Effect.runPromise(program)
            return c.json({ point })
        } catch (error) {
            return c.json({ error }, { status: 400 })
        }
    })
    return app;
}

