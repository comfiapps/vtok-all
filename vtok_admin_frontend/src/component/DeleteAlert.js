import * as React from "react";
import {
    Dialog,
    DialogActions,
    DialogTitle,
} from "@mui/material";
import Button from "@mui/material/Button";

const DeleteAlert = ({open, close, confirm}) => {
    return (
        <Dialog open={open} onClose={close}>
            <DialogTitle>정말로 삭제하시겠습니까?</DialogTitle>
            <DialogActions>
                <Button onClick={close} autoFocus>취소</Button>
                <Button onClick={() => Boolean(confirm) && confirm()} color={"error"}>삭제</Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteAlert;
