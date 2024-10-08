import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  component: () => (
    <div className="p-2">
      <h3>Hello from dashboard!</h3>
    </div>
  ),
});
