const Avatar = ({ id, source, label, onAvatarClick, active, isLoading }) => {
  //handler function
  const handleAvatarClick = () => {
    onAvatarClick(id);
  };

  return (
    <div className="avatar">
      <img
        className={active && "active"}
        src={source}
        alt={label}
        onClick={handleAvatarClick}
      />
      {isLoading && <div className="loader"></div>}
    </div>
  );
};

export default Avatar;
