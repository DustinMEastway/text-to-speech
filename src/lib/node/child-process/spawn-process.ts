import { spawn } from 'child_process';

export interface SpawnProcessProps {
  /** Arguments to pass to the command. */
  args?: string[];
  /** Command to run. */
  command: string;
  /** Whether to run the command in shell mode. */
  shell?: boolean;
}

/** Spawn a shell process to run a terminal command. */
export function spawnProcess({
  args = [],
  command,
  shell = true
}: SpawnProcessProps): Promise<string> {
  const childProcess = spawn(command, args, { shell });
  let promiseResolve: (value: string) => void;
  let promiseReject: (error: Error | string) => void;
  const promise = new Promise<string>((resolve, reject) => {
    promiseResolve = resolve;
    promiseReject = reject;
  });
  const errorMessages: string[] = [];
  const outMessages: string[] = [];
  let error: Error;

  childProcess.on('close', (): void => {
    if (error) {
      promiseReject(error);
    } else if (errorMessages.length) {
      promiseReject(errorMessages.join('\n'));
    } else {
      promiseResolve(outMessages.join('\n'));
    }
  });

  childProcess.on('error', (thrownError): void => {
    error = thrownError;
  });

  childProcess.stderr.on('data', (message): void => {
    errorMessages.push(message.toString().trimEnd());
  });

  childProcess.stdout.on('data', (message): void => {
    outMessages.push(message.toString().trimEnd());
  });

  return promise;
}
