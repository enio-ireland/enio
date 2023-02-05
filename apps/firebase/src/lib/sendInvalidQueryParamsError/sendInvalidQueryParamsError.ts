import type { Response } from 'firebase-functions'
import { StatusCodes, getReasonPhrase } from 'http-status-codes'

export const sendInvalidQueryParamsError = (response: Response, name: string, type: string): void => {
  const status = StatusCodes.BAD_REQUEST
  const message = `${getReasonPhrase(status)}. Expected '${name}' to be type ${type}.`
  response.status(status).send(message)
}
