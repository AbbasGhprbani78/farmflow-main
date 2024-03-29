import { Tab } from "./Tab";

export function Tabbed({ children, activeTab, setActiveTab, divClass, nopoint }) {
  return (
    <div className="mt-3">
      <div className={`tabbs ${divClass}`}>
        <Tab num={1} active={activeTab} onClick={setActiveTab} name={"Tasks"} />
        <Tab
          num={2}
          active={activeTab}
          onClick={setActiveTab}
          name={"Machines"}
        />
        {
          nopoint !== "false" &&
          <Tab
            num={3}
            active={activeTab}
            onClick={setActiveTab}
            name={"Points"}
          />
        }

        <Tab
          num={4}
          active={activeTab}
          onClick={setActiveTab}
          name={"Farm details"}
        />
      </div>
      {children}
    </div>
  );
}
