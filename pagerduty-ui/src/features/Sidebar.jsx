import React from 'react';

function Sidebar({ isIncidentPage, currentUser }) {
  return (
    <aside className='sidebar'>
      {isIncidentPage ? (
        <button>Create Incident</button>
      ) : (
        <button>Add Team Member</button>
      )}
      <div>
        <h3>{currentUser.name}</h3>
        <p>Oncall: {currentUser.oncall ? "Yes" : "No"}</p>
        {/* Add other user details here */}
      </div>
    </aside>
  );
}

export default Sidebar;