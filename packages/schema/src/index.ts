import { z } from 'zod';
import type { Prisma } from '@ox/repository';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const HistoryScalarFieldEnumSchema = z.enum(['id','user_id','user_name','user_image','user_email','is_winner','is_combo_winner','create_date']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// HISTORY SCHEMA
/////////////////////////////////////////

export const HistorySchema = z.object({
  id: z.string(),
  user_id: z.string(),
  user_name: z.string(),
  user_image: z.string(),
  user_email: z.string(),
  is_winner: z.boolean(),
  is_combo_winner: z.boolean(),
  create_date: z.date(),
})

export type History = z.infer<typeof HistorySchema>

/////////////////////////////////////////
// HISTORY PARTIAL SCHEMA
/////////////////////////////////////////

export const HistoryPartialSchema = HistorySchema.partial()

export type HistoryPartial = z.infer<typeof HistoryPartialSchema>

// HISTORY OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const HistoryOptionalDefaultsSchema = HistorySchema.merge(z.object({
  id: z.string().optional(),
  is_winner: z.boolean().optional(),
  is_combo_winner: z.boolean().optional(),
  create_date: z.date().optional(),
}))

export type HistoryOptionalDefaults = z.infer<typeof HistoryOptionalDefaultsSchema>
