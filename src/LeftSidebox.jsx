import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";

const LeftSidebox = ({ groups, onAddGroup, onSelectGroup }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);

  const togglePopup = () => setIsPopupOpen(!isPopupOpen);

  const handleGroupCreation = () => {
    if (newGroupName.trim() && selectedColor) {
      onAddGroup({ name: newGroupName, color: selectedColor });
      setNewGroupName("");
      setSelectedColor(null);
      setIsPopupOpen(false);
    } else {
      alert("Please fill in all fields.");
    }
  };

  // Function to get initials from the group name
  const getInitials = (groupName) => {
    const words = groupName.split(" ");
    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase(); // Only one word
    } else {
      return (
        words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase()
      ); // First letters of the first two words
    }
  };

  return (
    <div className="LeftSidebox">
      <div className="LeftSidebox-header">
        <h1>Pocket Notes</h1>
      </div>
      <div className="LeftSidebox-notes">
        {groups.map((group) => (
          <div
            key={group.id}
            className="LeftSidebox-note"
            onClick={() => onSelectGroup(group.id)}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <div
              style={{
                backgroundColor: group.color,
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '10px',
                color: '#fff',
                fontWeight: 'bold',
              }}
            >
              {getInitials(group.name)} {/* Display initials */}
            </div>
            <span>{group.name}</span>
          </div>
        ))}
      </div>
      {isPopupOpen && (
        <div className="popup-container">
          <h3>Create New Group</h3>
          <h4>Group Name</h4>
          <input
            id="group-name-input"
            type="text"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            placeholder="Enter Group Name"
            className="group-input"
          />
          <h4>Choose Colour</h4>
          <div className="color-options">
            {["#90caf9", "#ffccbc", "#f8bbd0", "#e1bee7", "#b2ebf2"].map((color) => (
              <div
                key={color}
                className="color-icon"
                style={{
                  backgroundColor: color,
                  border: selectedColor === color ? "2px solid black" : "none",
                }}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>
          <button className="create-group-button" onClick={handleGroupCreation}>
            Create
          </button>
        </div>
      )}
      <div className="add-group-container-bottom">
        <div className="add-button" onClick={togglePopup}>
          <FiPlus />
        </div>
      </div>
    </div>
  );
};

export default LeftSidebox;
