import pino, { Logger } from "pino";

export function getLogger(name: string): Logger {
  return pino({ name,
    transport: {
        target: "pino-pretty",
        options: {
            colorize: true
        }
    }
  });
}