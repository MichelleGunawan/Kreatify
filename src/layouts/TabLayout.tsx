import "@/styles/tab.layout.scss";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  tab: number;
  isSmall?: boolean;
}
export function CustomTablePanel({
  children,
  tab,
  index,
  isSmall = false,
}: TabPanelProps) {
  return (
    <div
      className={`hide-scrollbar ${
        isSmall ? "table-container-col-scroll" : "table-container"
      }`}
    >
      {tab === index && <>{children}</>}
    </div>
  );
}
