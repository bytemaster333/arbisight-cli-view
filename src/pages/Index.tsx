
import { useState, useEffect } from "react";
import { Search, Terminal, BarChart3, Clock, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CommandTable from "@/components/CommandTable";
import DurationChart from "@/components/DurationChart";
import SubcommandChart from "@/components/SubcommandChart";
import CommandOutput from "@/components/CommandOutput";
import { LogEntry } from "@/types/logs";
import { generateMockData } from "@/utils/mockData";

const Index = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<LogEntry[]>([]);
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [subcommandFilter, setSubcommandFilter] = useState("all");

  // Simulate API call - easy to replace with real fetch later
  useEffect(() => {
    const fetchLogs = async () => {
      // Future: const response = await fetch('/api/logs');
      // Future: const data = await response.json();
      const mockData = generateMockData();
      setLogs(mockData);
      setFilteredLogs(mockData);
    };

    fetchLogs();
  }, []);

  // Filter logs based on search term and subcommand
  useEffect(() => {
    let filtered = logs;

    if (searchTerm) {
      filtered = filtered.filter(log => 
        log.command.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.output.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.args.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (subcommandFilter !== "all") {
      filtered = filtered.filter(log => log.subcommand === subcommandFilter);
    }

    setFilteredLogs(filtered);
  }, [logs, searchTerm, subcommandFilter]);

  const uniqueSubcommands = Array.from(new Set(logs.map(log => log.subcommand)));

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Terminal className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">ArbiSight</h1>
              <p className="text-muted-foreground">Stylus CLI Monitoring Dashboard</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{logs.length} commands logged</span>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search commands, output, or arguments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={subcommandFilter} onValueChange={setSubcommandFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter subcommand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subcommands</SelectItem>
                    {uniqueSubcommands.map((subcommand) => (
                      <SelectItem key={subcommand} value={subcommand}>
                        {subcommand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Command Duration Over Time</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DurationChart data={filteredLogs} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Subcommand Usage</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SubcommandChart data={filteredLogs} />
            </CardContent>
          </Card>
        </div>

        {/* Command Table */}
        <Card>
          <CardHeader>
            <CardTitle>CLI Command History</CardTitle>
          </CardHeader>
          <CardContent>
            <CommandTable 
              data={filteredLogs} 
              onRowClick={setSelectedLog}
              selectedLog={selectedLog}
            />
          </CardContent>
        </Card>

        {/* Command Output Viewer */}
        {selectedLog && (
          <CommandOutput 
            log={selectedLog} 
            onClose={() => setSelectedLog(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
