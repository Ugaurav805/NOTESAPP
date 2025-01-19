import { useEffect, useState } from "react";
import uuid from "react-uuid";
import "./App.css";
import RightMainbox from "./RightMainbox";
import LeftSidebox from "./LeftSidebox";

function App() {
  const [groups, setGroups] = useState(
    localStorage.groups ? JSON.parse(localStorage.groups) : []
  );
  const [activeGroup, setActiveGroup] = useState(null);
  const [newGroupName, setNewGroupName] = useState("");

  useEffect(() => {
    localStorage.setItem("groups", JSON.stringify(groups));
  }, [groups]);

  const onAddGroup = ({ name, color }) => {
    const newGroup = {
      id: uuid(),
      name,
      color,
      messages: [],
    };

    setGroups([...groups, newGroup]);
  };

  const onSelectGroup = (groupId) => {
    setActiveGroup(groups.find((group) => group.id === groupId));
  };

  const onSendMessage = (message) => {
    if (!activeGroup || !message.text.trim()) return;

    const newMessage = {
      ...message,
      sender: "You", // Adding a sender to the message
    };

    const updatedGroups = groups.map((group) => {
      if (group.id === activeGroup.id) {
        return {
          ...group,
          messages: [...group.messages, newMessage],
        };
      }
      return group;
    });

    setGroups(updatedGroups);
    setActiveGroup({
      ...activeGroup,
      messages: [...activeGroup.messages, newMessage],
    });
  };

  return (
    <div className="App">
      <LeftSidebox
        groups={groups}
        onAddGroup={onAddGroup}
        newGroupName={newGroupName}
        setNewGroupName={setNewGroupName}
        onSelectGroup={onSelectGroup}
      />
      <RightMainbox activeGroup={activeGroup} onSendMessage={onSendMessage} />
    </div>
  );
}

export default App;
