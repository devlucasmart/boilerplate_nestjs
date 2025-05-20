import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import * as kleur from 'kleur';

@Injectable()
export class LoggerService implements NestLoggerService {
  log(message: string) {
    console.log(kleur.blue(`[LOG] ${new Date().toISOString()} - ${message}`));
  }

  error(message: string, trace?: string) {
    console.error(
      kleur.red(`[ERROR] ${new Date().toISOString()} - ${message}`),
    );
    if (trace) console.error(kleur.gray(trace));
  }

  warn(message: string) {
    console.warn(
      kleur.yellow(`[WARN] ${new Date().toISOString()} - ${message}`),
    );
  }

  debug?(message: string) {
    console.debug(
      kleur.magenta(`[DEBUG] ${new Date().toISOString()} - ${message}`),
    );
  }

  verbose?(message: string) {
    console.log(
      kleur.cyan(`[VERBOSE] ${new Date().toISOString()} - ${message}`),
    );
  }
}
