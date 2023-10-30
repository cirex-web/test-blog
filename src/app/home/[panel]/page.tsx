import React from "react";
import css from "./page.module.css";
import { BrowsingHistory } from "../../components/BrowsingHistory";
import { redirect } from "next/navigation";
import Link from "next/link";

const panels: {
  [slug: string]: { component: React.ReactNode; title: string };
} = {
  history: {
    component: <BrowsingHistory />,
    title: "Browsing History",
  },
  about: {
    component: <div>Sample about me</div>,
    title: "About",
  },
};

const Button = ({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}) => {
  return (
    <button
      onClick={onClick}
      className={active ? css.activeButton : css.button}
    >
      {children}
    </button>
  );
};
export default function AllPanels({ params }: { params: { panel: string } }) {
  const currentPanelData = panels[params.panel];
  if (currentPanelData === undefined) return redirect("/");
  return (
    <div className={css.mainContainer}>
      <div className={css.buttonRow}>
        {Object.entries(panels).map(([panelId, panel], i) => (
          <Link href={panelId} key={i}>
            <Button active={panelId === params.panel}>
              <h3>{panel.title}</h3>
            </Button>
          </Link>
        ))}
      </div>
      <div className={css.panelContainer}>{currentPanelData.component}</div>
    </div>
  );
}
