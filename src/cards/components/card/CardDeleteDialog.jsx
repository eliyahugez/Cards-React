import { Button, Dialog, DialogActions, DialogContentText, DialogTitle } from "@mui/material";
import { bool, func } from "prop-types";

const CardDeleteDialog = ({ isDialogOpen, onDelete, onChangeDialog }) => {
    return (
        <Dialog
            open={isDialogOpen}
            onClose={onChangeDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="xs"
        >
            <DialogTitle id="alert-dialog-title">
                {"Are you sure you want to delete this card?"}
            </DialogTitle>
            <DialogContentText id="alert-dialog-description">
                This operation will completely delete the business card and all its
                data from the database and it will not be possible to retrieve the
                card afterwards
            </DialogContentText>
            <DialogActions>
                <Button onClick={onChangeDialog} autoFocus color="info">Cancel</Button>
                <Button onClick={onDelete} color="error">Delete card</Button>
            </DialogActions>
        </Dialog>
    );
};

CardDeleteDialog.propTypes = {
    isDialogOpen: bool.isRequired,
    onDelete: func.isRequired,
    onChangeDialog: func.isRequired
};

export default CardDeleteDialog;
