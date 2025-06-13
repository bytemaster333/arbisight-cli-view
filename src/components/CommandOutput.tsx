
import { X, Copy, CheckCircle, XCircle, AlertTriangle, Terminal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { LogEntry } from "@/types/logs";
import { toast } from "@/hooks/use-toast";

interface CommandOutputProps {
  log: LogEntry;
  onClose: () => void;
}

const CommandOutput = ({ log, onClose }: CommandOutputProps) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied to clipboard",
        description: "Command output has been copied to your clipboard",
      });
    });
  };

  const getStatusIcon = () => {
    switch (log.status) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Terminal className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = () => {
    switch (log.status) {
      case "success":
        return "text-green-500 border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800";
      case "error":
        return "text-red-500 border-red-200 bg-red-50 dark:bg-red-950 dark:border-red-800";
      case "warning":
        return "text-yellow-500 border-yellow-200 bg-yellow-50 dark:bg-yellow-950 dark:border-yellow-800";
      default:
        return "text-muted-foreground border-border bg-muted";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            {getStatusIcon()}
            <span>Command Output</span>
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Command Details */}
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Timestamp</label>
              <p className="font-mono text-sm mt-1">
                {new Date(log.timestamp).toLocaleString()}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Duration</label>
              <p className="font-mono text-sm mt-1">{log.duration.toFixed(2)}s</p>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">Command</label>
            <div className="flex items-center space-x-2 mt-1">
              <code className="bg-muted px-2 py-1 rounded text-sm font-mono flex-1">
                {log.command}
              </code>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => copyToClipboard(log.command)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Subcommand</label>
              <div className="mt-1">
                <Badge variant="outline">{log.subcommand}</Badge>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Status</label>
              <div className="mt-1">
                <Badge variant={log.status === "error" ? "destructive" : "default"}>
                  {log.status}
                </Badge>
              </div>
            </div>
          </div>

          {log.args && (
            <div>
              <label className="text-sm font-medium text-muted-foreground">Arguments</label>
              <code className="block bg-muted px-2 py-1 rounded text-sm font-mono mt-1">
                {log.args}
              </code>
            </div>
          )}
        </div>

        <Separator />

        {/* Output Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-muted-foreground">Output</label>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => copyToClipboard(log.output)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy Output
            </Button>
          </div>
          
          <ScrollArea className="h-64 w-full rounded-md border">
            <div className={`p-4 ${getStatusColor()} border rounded-md`}>
              <pre className="text-sm font-mono whitespace-pre-wrap overflow-x-auto">
                {log.output}
              </pre>
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommandOutput;
