import Avatar from "./Avatar.js";

const AvatarList = ({
  onAvatarSelection,
  avatars,
  activeAvatar,
  loadingId,
}) => {
  return (
    <div className="avatar-list">
      {
        // A Map which will loop over all the avatars
        avatars.map((avatar) => (
          <Avatar
            onAvatarClick={onAvatarSelection}
            key={avatar.id}
            {...avatar}
            isLoading={loadingId === avatar.id}
            active={activeAvatar === avatar.id}
          />
        ))
      }
    </div>
  );
};

export default AvatarList;
