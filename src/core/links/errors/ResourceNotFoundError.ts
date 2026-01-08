export class ResourceNotFoundError extends Error {
  constructor(resource?: string) {
    if (!resource)
      resource = "resource";

    super(`${resource} not found!`);
  }
}