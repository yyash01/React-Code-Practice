//React Functional Component - AvatarPicker
import { useState } from "react";
import Avatar from "./Avatar.js";
import AvatarList from "./AvatarList.js";
import { setAvatar } from "../utils";

const DEFAULT_AVATAR_ID = 1;

const AvatarPicker = ({ avatars }) => {
  const [activeAvatarId, setActiveAvatarId] = useState(DEFAULT_AVATAR_ID);
  const [showAvatarList, toggleAvatarList] = useState(false);
  const [loadingId, setLoadingId] = useState(null);
  const activeAvatar = avatars.find((avatar) => avatar.id === activeAvatarId);

  //a handler function for making API call to Select Active Avatar
  const onAvatarSelection = async (id) => {
    setLoadingId(id);
    await setAvatar(id); //a function to make API Call
    setActiveAvatarId(id); //update the local state variable
    setLoadingId(null);
  };

  return (
    <div className="avatar-container">
      <Avatar
        onAvatarClick={() => toggleAvatarList((prevState) => !prevState)}
        {...activeAvatar}
      />
      {showAvatarList && (
        <AvatarList
          onAvatarSelection={onAvatarSelection}
          loadingId={loadingId}
          avatars={avatars}
          activeAvatar={activeAvatarId}
        />
      )}
    </div>
  );
};

export default AvatarPicker;
