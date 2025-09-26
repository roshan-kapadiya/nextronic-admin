import React from "react";

const Sidebar = () => {
  return (
    <>
      <div class="content flex-grow-1">
        <nav class="navbar navbar-light w-100 p-4 bg-dark border-bottom">
          <button class="btn btn-outline-secondary" id="menu-toggle">
            ☰
          </button>
          <span class="navbar-brand text-white">Nextronic</span>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
