import React from "react";
import Popover from "../Popover";

interface MembersDropdownProps {
  triggerRender: React.ReactElement;
}

function MembersDropdown({ triggerRender }: MembersDropdownProps) {
  return (
    <Popover title="Members" triggerRender={triggerRender}>
      list
    </Popover>
  );
}

export default MembersDropdown;
