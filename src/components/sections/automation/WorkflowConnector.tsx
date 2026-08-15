type WorkflowConnectorProps = {
  path: string;
  active?: boolean;
};

export function WorkflowConnector({ path, active = false }: WorkflowConnectorProps) {
  return (
    <>
      <path
        d={path}
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="1"
        fill="none"
      />
      <path
        data-automation-connector
        d={path}
        stroke={active ? "rgba(168,85,247,0.9)" : "rgba(139,61,255,0.52)"}
        strokeWidth={active ? "2" : "1.25"}
        fill="none"
        strokeLinecap="round"
      />
    </>
  );
}
