import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import * as controller from './controllers/history.controller';
import * as services from './core/services/history/history.serviec';
import { logger } from 'hono/logger';
import { showRoutes } from 'hono/dev';
import { cors } from 'hono/cors'
const app = new Hono();
app.use('/api/*', cors({
  origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",") : []
}))
app.get('/healtz', (c) => c.text('ok'));
app.route('/api/v1/history', controller.HistoryController(services.HistoryService));

const port = 3333;

console.log(`Server is running on port ${port}`);
app.use(logger());
showRoutes(app);

serve({
  fetch: app.fetch,
  port
})

export default app