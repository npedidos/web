export default interface ErrorResponse {
  error: ErrorDetails;
}

export interface ErrorDetails {
  code: string;
  description: string;
}

