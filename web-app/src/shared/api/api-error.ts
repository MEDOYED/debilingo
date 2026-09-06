export type ApiErrorArgs = {
  clientMessage?: string;
  devMessage?: string;
  status?: number;
};

export class ApiError extends Error {
  clientMessage?: string;
  devMessage?: string;
  status?: number;

  constructor({ clientMessage, devMessage, status }: ApiErrorArgs) {
    super(clientMessage);
    this.name = "ApiError";
    this.clientMessage = clientMessage;
    this.devMessage = devMessage;
    this.status = status;
  }
}
