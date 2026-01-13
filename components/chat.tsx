"use client";

import { useChat } from "@ai-sdk/react";
import { useState } from "react";
import type { UIMessage } from "ai";

export function Chat() {
  const { messages, sendMessage, status, error } = useChat();
  const [input, setInput] = useState("");

  const isLoading = status === "streaming" || status === "submitted";

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto">
      <header className="border-b border-gray-200 p-4">
        <h1 className="text-xl font-semibold">Light API Assistant</h1>
        <p className="text-sm text-gray-500">
          Ask questions about your financial data
        </p>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            <p className="mb-4">Try asking:</p>
            <div className="space-y-2 text-sm">
              <p>&quot;Show me my recent invoices&quot;</p>
              <p>&quot;List all customers&quot;</p>
              <p>&quot;What&apos;s my company information?&quot;</p>
              <p>&quot;Get exchange rate from USD to EUR&quot;</p>
            </div>
          </div>
        )}

        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-4">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                />
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="px-4 py-2 bg-red-50 text-red-600 text-sm border-t border-red-200">
          Error: {error.message}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (input.trim() && !isLoading) {
            sendMessage({ text: input });
            setInput("");
          }
        }}
        className="border-t border-gray-200 p-4"
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your invoices, customers, expenses..."
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

function MessageBubble({ message }: { message: UIMessage }) {
  return (
    <div
      className={`flex ${
        message.role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[80%] rounded-lg p-4 ${
          message.role === "user"
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-900"
        }`}
      >
        {message.parts.map((part, index) => (
          <MessagePart key={index} part={part} />
        ))}
      </div>
    </div>
  );
}

function MessagePart({ part }: { part: UIMessage["parts"][number] }) {
  if (part.type === "text") {
    return <div className="whitespace-pre-wrap">{part.text}</div>;
  }

  // Handle tool invocations - type starts with "tool-"
  if (part.type.startsWith("tool-") || part.type === "dynamic-tool") {
    const toolPart = part as {
      type: string;
      toolName?: string;
      toolCallId: string;
      state: string;
      input?: unknown;
      output?: unknown;
    };

    const toolName = toolPart.toolName || part.type.replace("tool-", "");

    return (
      <div className="text-sm opacity-70 my-2 p-2 bg-black/5 rounded">
        <div className="font-medium">{formatToolName(toolName)}</div>
        {toolPart.state === "output-available" && toolPart.output !== undefined ? (
          <details className="mt-1">
            <summary className="cursor-pointer text-xs">View result</summary>
            <pre className="mt-2 text-xs overflow-x-auto max-h-48 overflow-y-auto">
              {JSON.stringify(toolPart.output, null, 2)}
            </pre>
          </details>
        ) : null}
        {(toolPart.state === "input-streaming" ||
          toolPart.state === "input-available") && (
          <span className="text-xs">Loading...</span>
        )}
      </div>
    );
  }

  return null;
}

function formatToolName(name: string): string {
  return name
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}
