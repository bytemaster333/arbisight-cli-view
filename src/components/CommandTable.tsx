
import { useState } from "react";
import { ChevronDown, ChevronUp, Clock, Terminal, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { LogEntry } from "@/types/logs";

interface CommandTableProps {
  data: LogEntry[];
  onRowClick: (log: LogEntry) => void;
  selectedLog: LogEntry | null;
}

const CommandTable = ({ data, onRowClick, selectedLog }: CommandTableProps) => {
  const [sortField, setSortField] = useState<keyof LogEntry>("timestamp");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const handleSort = (field: keyof LogEntry) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];
    
    if (typeof aVal === "string" && typeof bVal === "string") {
      return sortDirection === "asc" 
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }
    
    if (typeof aVal === "number" && typeof bVal === "number") {
      return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
    }
    
    return 0;
  });

  const getStatusIcon = (status: LogEntry["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Terminal className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: LogEntry["status"]) => {
    const variants = {
      success: "default",
      error: "destructive", 
      warning: "secondary"
    } as const;
    
    return (
      <Badge variant={variants[status]} className="text-xs">
        {status}
      </Badge>
    );
  };

  const SortButton = ({ field, children }: { field: keyof LogEntry; children: React.ReactNode }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center space-x-1 hover:text-foreground transition-colors"
    >
      <span>{children}</span>
      {sortField === field && (
        sortDirection === "asc" ? 
          <ChevronUp className="h-4 w-4" /> : 
          <ChevronDown className="h-4 w-4" />
      )}
    </button>
  );

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40px]">Status</TableHead>
            <TableHead>
              <SortButton field="timestamp">Timestamp</SortButton>
            </TableHead>
            <TableHead>
              <SortButton field="command">Command</SortButton>
            </TableHead>
            <TableHead>
              <SortButton field="subcommand">Subcommand</SortButton>
            </TableHead>
            <TableHead>Args</TableHead>
            <TableHead className="text-right">
              <SortButton field="duration">
                <div className="flex items-center justify-end space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>Duration</span>
                </div>
              </SortButton>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((log) => (
            <TableRow 
              key={log.id}
              className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                selectedLog?.id === log.id ? "bg-muted" : ""
              }`}
              onClick={() => onRowClick(log)}
            >
              <TableCell>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(log.status)}
                </div>
              </TableCell>
              <TableCell className="font-mono text-sm">
                {new Date(log.timestamp).toLocaleString()}
              </TableCell>
              <TableCell className="max-w-md">
                <div className="truncate font-mono text-sm">
                  {log.command}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="text-xs">
                  {log.subcommand}
                </Badge>
              </TableCell>
              <TableCell className="max-w-xs">
                <div className="truncate text-sm text-muted-foreground font-mono">
                  {log.args || "-"}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end space-x-2">
                  <span className="font-mono text-sm">{log.duration.toFixed(2)}s</span>
                  {getStatusBadge(log.status)}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {sortedData.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Terminal className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>No commands found matching your filters</p>
        </div>
      )}
    </div>
  );
};

export default CommandTable;
