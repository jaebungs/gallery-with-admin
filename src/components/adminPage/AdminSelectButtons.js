import React from 'react';

const AdminSelectButtons = ({tractChecked, setTrackChecked, handleMultipleDelete}) => {
  let trackCheckedObj = {};

  const handleSelectAll = () => {
    trackCheckedObj = {...tractChecked};
    for (const item in trackCheckedObj) {
      trackCheckedObj[item].checked = true;
    }
    setTrackChecked(trackCheckedObj);
  };

  const handleSelectNone = () => {
    trackCheckedObj = {...tractChecked};
    for (const item in trackCheckedObj) {
      trackCheckedObj[item].checked = false;
    }
    setTrackChecked(trackCheckedObj);
  };

  return (
    <div className="checkbox-control-container">
      <button className="checkbox-select-btn" onClick={handleSelectAll}>
        Select All
      </button>
      <button className="checkbox-select-btn" onClick={handleSelectNone}>
        Select None
      </button>
      <button className="checkbox-select-btn" onClick={handleMultipleDelete}>
        Delete
      </button>
    </div>
  );
};

export default AdminSelectButtons;
