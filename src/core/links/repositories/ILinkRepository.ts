import { Link } from "../models/link";

export type SearchByParamRequest = {
  id?: string
  originalUrl?: string
  shortUrl?: string
}

export interface ILinkRepository {
  save(link: Link): Promise<Link>;
  searchByParam(params: SearchByParamRequest): Promise<Link | null>;
  deleteExpired(): Promise<number>;
}