
export interface LogEntry {
  id: string;
  timestamp: string;
  command: string;
  subcommand: string;
  args: string;
  output: string;
  duration: number;
  status: 'success' | 'error' | 'warning';
}
