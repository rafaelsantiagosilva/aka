export class LinkAlreadyExistsError extends Error {
  constructor() {
    super("A link with that URL already exists");
  }
}