import { NextFunction, Request, Response } from 'express'
import { HttpStatusHelper } from '../../../../helpers/http-status-helper'
import { ForbiddenError } from '../../../errors/forbidden-error'
import { InvalidParamError } from '../../../errors/invalid-param-error'
import { NotFoundError } from '../../../errors/not-found-error'

export async function errorsMiddleware (
  error: Error,
  request: Request,
  response: Response,
  _: NextFunction
): Promise<Response> {
  if (error instanceof InvalidParamError) {
    return response.status(HttpStatusHelper.badRequest).json({ error: error.message })
  }
  if (error instanceof ForbiddenError) {
    return response.status(HttpStatusHelper.Forbidden).json({ error: error.message })
  }
  if (error instanceof NotFoundError) {
    return response.status(HttpStatusHelper.NotFound).json({ error: error.message })
  }

  return response.status(HttpStatusHelper.InternalServerError).json({ error: error.message })
}