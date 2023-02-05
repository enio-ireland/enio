import type { Response } from 'firebase-functions'
import { sendInvalidQueryParamsError } from './sendInvalidQueryParamsError'
import { StatusCodes } from 'http-status-codes'

describe('sendInvalidQueryParamsError', () => {
  let response: Response

  beforeEach(() => response = { status: jest.fn(() => response), send: jest.fn(() => response) } as unknown as Response)

  it('to send status 400 and explanation of data type mismatch', () => {
    sendInvalidQueryParamsError(response, 'passed', 'string')
    expect(response.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST)
    expect(response.send).toHaveBeenCalledWith("Bad Request. Expected 'passed' to be type string.")
  })
})
