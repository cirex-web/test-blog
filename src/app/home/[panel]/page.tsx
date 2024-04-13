import React from "react";
import css from "./page.module.css";
import { BrowsingHistory } from "../../components/BrowsingHistory";
import { redirect } from "next/navigation";
import Link from "next/link";
import { BlogPanel } from "@/app/components/BlogPanel";
import contact from "@/../public/contact.svg";
import Image from "next/image";
const panels: {
  [slug: string]: { component: React.ReactNode; title: string };
} = {
  history: {
    component: <BrowsingHistory />,
    title: "Browsing History",
  },
  blog: {
    component: <BlogPanel />,
    title: "Blog",
  },
  about: {
    component: (
      <div>
        <p>
          First year student at CMU studying computational biology. If we could
          save people&apos;s lives with code, wouldn&apos;t that be cool? It
          would also be cool if I had more than two friends in college, but I
          digress.
        </p>
        {/* <p>
          What defines a person? Is it their actions? Their thoughts? Interests?
          My primary thing is coding, but I also happen to have a blog now, cook
          food every so often, and run ~30 miles a week. I also am obsessed with
          productivity and finding meaning in my life, but really, I don&apos;t
          see how anyone can live a good life if there&apos;s no deeper meaning.
        </p> */}
        {/* <p>
          Oh yeah I&apos;m a first-year college student studying CS at CMU.
          Ironically, I&apos;m not getting much of a chance to code here because
          there&apos;s just too much hw. (It&apos;s mostly math rn) Maybe
          that&apos;s just for the first year here. We&apos;ll see.
        </p> */}
        <Image
          src={contact}
          style={{
            width: "100%",
            maxWidth: "600px",
            height: "auto",
            marginTop: "13px",
          }}
          alt="contact info"
        />
      </div>
    ),
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
