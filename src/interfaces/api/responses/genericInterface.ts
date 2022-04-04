export interface genericResponse {
    id: string | number
  }

export interface responseRTK {
    data: genericResponse
  }

export interface responsArrayRTK {
    data: genericResponse[]
  }

export interface ListResponse<T> {
    status: string,
    total: number,
    data: T[]
  }

export interface SingleResponse<T> {
    status: string,
    data: T
}
