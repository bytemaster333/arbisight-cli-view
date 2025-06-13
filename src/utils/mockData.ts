
import { LogEntry } from "@/types/logs";

export const generateMockData = (): LogEntry[] => {
  const mockLogs: LogEntry[] = [
    {
      id: "1",
      timestamp: "2025-06-13 10:45:03",
      command: "cargo stylus deploy --wasm test",
      subcommand: "deploy",
      args: "--wasm test",
      output: "error: rustup could not choose a version of cargo to run, because one wasn't specified explicitly, and no default is configured.\nhelp: run 'rustup default stable' (or another toolchain) to set a default",
      duration: 0.161,
      status: "error"
    },
    {
      id: "2", 
      timestamp: "2025-06-13 10:47:15",
      command: "cargo stylus build --release",
      subcommand: "build",
      args: "--release",
      output: "   Compiling stylus-sdk v0.5.1\n   Compiling hello-stylus v0.1.0\n    Finished release [optimized] target(s) in 12.34s\nOptimizing WASM...\nFinished in 1.2s",
      duration: 13.54,
      status: "success"
    },
    {
      id: "3",
      timestamp: "2025-06-13 10:50:22", 
      command: "cargo stylus check --wasm-file target/wasm32-unknown-unknown/release/hello_stylus.wasm",
      subcommand: "check",
      args: "--wasm-file target/wasm32-unknown-unknown/release/hello_stylus.wasm",
      output: "Reading WASM file at target/wasm32-unknown-unknown/release/hello_stylus.wasm\nCompressed WASM size: 1,024 bytes\nActivation cost: 14,251 gas\nValidation passed ✓",
      duration: 2.87,
      status: "success"
    },
    {
      id: "4",
      timestamp: "2025-06-13 10:52:08",
      command: "cargo stylus deploy --private-key 0x123... --endpoint https://sepolia-rollup.arbitrum.io/rpc",
      subcommand: "deploy",
      args: "--private-key 0x123... --endpoint https://sepolia-rollup.arbitrum.io/rpc",
      output: "Deploying program to address 0xabc123...\nEstimated gas: 2,441,452\nSubmitting tx...\nDeployed! Contract address: 0xdef456...\nActivation tx hash: 0x789abc...",
      duration: 8.91,
      status: "success"
    },
    {
      id: "5",
      timestamp: "2025-06-13 10:54:33",
      command: "cargo stylus invoke --contract 0xdef456... --function greet --args \"Hello World\"",
      subcommand: "invoke",
      args: "--contract 0xdef456... --function greet --args \"Hello World\"",
      output: "Invoking function 'greet' with args: [\"Hello World\"]\nResult: \"Hello World from Stylus!\"\nGas used: 21,000",
      duration: 1.23,
      status: "success"
    },
    {
      id: "6",
      timestamp: "2025-06-13 11:02:17",
      command: "cargo stylus build",
      subcommand: "build", 
      args: "",
      output: "   Compiling proc-macro2 v1.0.70\n   Compiling unicode-ident v1.0.12\n   Compiling syn v2.0.39\nwarning: unused variable `x`\n --> src/lib.rs:42:9\nFinished dev [unoptimized + debuginfo] target(s) in 4.56s",
      duration: 4.56,
      status: "warning"
    },
    {
      id: "7",
      timestamp: "2025-06-13 11:05:44",
      command: "cargo stylus new my-contract",
      subcommand: "new",
      args: "my-contract",
      output: "Creating new Stylus project 'my-contract'...\nInitializing Git repository...\nProject created successfully!\nNext steps:\n  cd my-contract\n  cargo stylus build",
      duration: 0.89,
      status: "success"
    },
    {
      id: "8",
      timestamp: "2025-06-13 11:08:12",
      command: "cargo stylus check --estimate-gas",
      subcommand: "check",
      args: "--estimate-gas",
      output: "Reading WASM file...\nValidating contract...\nEstimating deployment gas: 2,441,452\nEstimating activation gas: 14,251\nTotal estimated cost: 2,455,703 gas",
      duration: 1.67,
      status: "success"
    },
    {
      id: "9",
      timestamp: "2025-06-13 11:12:55",
      command: "cargo stylus deploy --dry-run",
      subcommand: "deploy",
      args: "--dry-run",
      output: "Performing dry run deployment...\nValidation: ✓ Passed\nGas estimation: 2,441,452\nContract size: 1,024 bytes\nDry run completed successfully - no actual deployment performed",
      duration: 3.21,
      status: "success"
    },
    {
      id: "10",
      timestamp: "2025-06-13 11:15:38",
      command: "cargo stylus verify --contract-address 0xdef456...",
      subcommand: "verify",
      args: "--contract-address 0xdef456...",
      output: "error: contract verification failed\nReason: source code does not match deployed bytecode\nPlease ensure you're verifying the correct contract version",
      duration: 5.43,
      status: "error"
    },
    {
      id: "11",
      timestamp: "2025-06-13 11:18:29",
      command: "cargo stylus export-abi --output contract.abi",
      subcommand: "export-abi",
      args: "--output contract.abi",
      output: "Extracting ABI from contract...\nABI exported to contract.abi\nFound 5 functions:\n  - greet(string) -> string\n  - setMessage(string)\n  - getMessage() -> string\n  - increment()\n  - getCount() -> uint256",
      duration: 0.92,
      status: "success"
    },
    {
      id: "12",
      timestamp: "2025-06-13 11:21:14",
      command: "cargo stylus simulate --function transfer --args 0x123... 1000",
      subcommand: "simulate",
      args: "--function transfer --args 0x123... 1000",
      output: "Simulating function call...\nFunction: transfer(address,uint256)\nArgs: [\"0x123...\", 1000]\nEstimated gas: 35,000\nSimulation successful - transaction would succeed",
      duration: 2.34,
      status: "success"
    }
  ];

  return mockLogs;
};
