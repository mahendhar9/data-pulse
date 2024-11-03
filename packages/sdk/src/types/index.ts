/**
 * Configuration options for the session recording system.
 */
export interface RecordingConfig {
  /** Unique identifier for the application being recorded */
  applicationId: string;
  /**
   * Rate at which events are sampled (between 0 and 1).
   * Example: 0.5 means record 50% of events
   * @default 1
   */
  samplingRate?: number;
  privacySettings?: PrivacySettings;
  networkConfig?: NetworkConfig;
  /**
   * Enable debug mode for additional logging and development features
   * @default false
   */
  debug?: boolean;
}

/**
 * Settings to control privacy and data masking during recording.
 * To ensure sensitive information is not captured.
 */
export interface PrivacySettings {
  /**
   * Whether to mask input fields during recording
   * When true, input values will be replaced with asterisks
   * @default true
   */
  maskInputs?: boolean;
  /**
   * CSS selectors for elements that should not be recorded
   * Example: ['.sensitive-data', '#credit-card-input']
   * @default []
   */
  excludedElements?: string[];
  /**
   * URL patterns for pages that should not be recorded
   * Example: ['/account', '/payment']
   * @default []
   */
  excludedPages?: string[];
  /**
   * Whether to mask all text content on the page
   * Useful for highly sensitive applications
   * @default false
   */
  maskTextContent?: boolean;
}

/**
 * Configuration for network operations and data transmission.
 * Controls how recorded data is sent to the server.
 */
export interface NetworkConfig {
  /**
   * Server endpoint URL for sending recorded data
   */
  endpoint?: string;
  /**
   * Number of events to collect before sending to server
   * @default 50
   */
  batchSize?: number;
  /**
   * Interval (in ms) to flush(send) events to server regardless of batch size
   * @default 5000
   */
  flushInterval?: number;
  /**
   * Number of retry attempts for failed network requests
   * @default 3
   */
  retryAttempts?: number;
  /**
   * Delay (in ms) between retry attempts
   * @default 1000
   */
  retryDelay?: number;
}

/**
 * Types of events that can be recorded during a session.
 */
export enum EventType {
  /** Changes to DOM structure */
  DOM_MUTATION = 'DOM_MUTATION',

  /** Mouse movement events */
  MOUSE_MOVE = 'MOUSE_MOVE',

  /** Mouse click events */
  MOUSE_CLICK = 'MOUSE_CLICK',

  /** Page scroll events */
  SCROLL = 'SCROLL',

  /** Viewport size changes */
  VIEWPORT = 'VIEWPORT',

  /** Form input changes */
  INPUT = 'INPUT',

  /** Javascript errors and exceptions */
  ERROR = 'ERROR',
}

/**
 * Represents a position on the page.
 * For tracking mouse movements and click locations.
 */
export interface Position {
  /** Horizontal position in pixels from the left */
  x: number;

  /** Vertical position in pixels from the top */
  y: number;
}

/**
 * Represents a single recorded event during a session.
 * Contains all necessary information to replay the event later.
 */
export interface Event {
  id: string;

  /** ID of the session this event belongs to */
  sessionId: string;

  /** Timestamp (in ms) when the event occurred */
  timestamp: number;

  type: EventType;

  /**
   * Event-specific data payload
   * Structure varies based on event type
   */
  data: unknown;

  position?: Position;
}
