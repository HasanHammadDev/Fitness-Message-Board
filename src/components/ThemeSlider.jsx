import '../styles/DarkModeToggle.css';

const DarkModeToggle = ({handleToggle, theme}) => {

  return (
    <div className={`d-flex toggle-container ${theme ? 'dark' : 'light'}`}>
      <label className="switch">
        <input type="checkbox" onChange={handleToggle} />
        <span className="slider"></span>
      </label>
      Dark Mode
    </div>
  );
};

export default DarkModeToggle;