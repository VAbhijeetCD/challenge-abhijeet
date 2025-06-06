import {
  CreateWidgetRequest,
  UpdateWidgetRequest,
  WidgetResponse,
  WidgetListResponse
} from './widget.types';

// HTTP Methods
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// API Endpoint Definitions
export interface ApiEndpoints {
  // Widget endpoints
  'GET /widgets': {
    request: never;
    response: WidgetListResponse;
  };
  'GET /widgets/:id': {
    request: never;
    response: WidgetResponse;
    params: { id: string };
  };
  'POST /widgets': {
    request: CreateWidgetRequest;
    response: WidgetResponse;
  };
  'PUT /widgets/:id': {
    request: UpdateWidgetRequest;
    response: WidgetResponse;
    params: { id: string };
  };
  'DELETE /widgets/:id': {
    request: never;
    response: never;
    params: { id: string };
  };
}

// Extract method and path from endpoint key
export type ExtractMethod<T extends keyof ApiEndpoints> = T extends `${infer M} ${string}` ? M : never;
export type ExtractPath<T extends keyof ApiEndpoints> = T extends `${string} ${infer P}` ? P : never;

// Helper types for type-safe API calls
export type EndpointRequest<T extends keyof ApiEndpoints> = ApiEndpoints[T]['request'];
export type EndpointResponse<T extends keyof ApiEndpoints> = ApiEndpoints[T]['response'];
export type EndpointParams<T extends keyof ApiEndpoints> = 'params' extends keyof ApiEndpoints[T] 
  ? ApiEndpoints[T]['params'] 
  : never;

// API Client Configuration
export interface ApiClientConfig {
  baseUrl: string;
  timeout?: number;
  headers?: Record<string, string>;
}

// API Response wrapper
export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

// API Error response
export interface ApiErrorResponse {
  error: {
    message: string;
    statusCode: number;
    details?: unknown;
  };
}