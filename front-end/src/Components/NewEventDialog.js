import React from "react";
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";

import NewEventForm from "./NewEventForm";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function NewEventDialog({ refreshEvents, currentUser }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <NewEventIcon onClick={handleClickOpen}>+</NewEventIcon>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <NewEventForm
          closeDialog={handleClose}
          refreshEvents={refreshEvents}
          currentUser={currentUser}
        />
      </Dialog>
    </div>
  );
}
const NewEventIcon = styled.button`
  font-size: 2.5rem;
  font-weight: 200;
  line-height: 1rem;
  padding-bottom: 6px;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  border: none;
  color: white;
  background-color: #787ab8;
  position: fixed;
  bottom: 10px;
  right: 10px;
  &:focus {
    outline: none;
  }
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;
