type TechnologyConnectorProps = {
  path: string;
  secondary?: boolean;
};

export function TechnologyConnector({ path, secondary = false }: TechnologyConnectorProps) {
  return (
    <path
      data-technology-connector={secondary ? "secondary" : "primary"}
      d={path}
      stroke={secondary ? "rgba(255,255,255,0.14)" : "rgba(139,61,255,0.55)"}
      strokeWidth={secondary ? "1" : "1.4"}
      strokeLinecap="round"
      fill="none"
    />
  );
}
