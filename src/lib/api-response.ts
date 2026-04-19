/** Respuestas API consistentes: error siempre { error: string } */

export function jsonError(message: string, status: number, details?: Record<string, unknown>) {
  return Response.json(
    details ? { error: message, details } : { error: message },
    { status }
  )
}

export function jsonValidationError(zodError: { flatten: () => Record<string, unknown> }) {
  return Response.json(
    { error: 'Validation failed', details: zodError.flatten() },
    { status: 422 }
  )
}
