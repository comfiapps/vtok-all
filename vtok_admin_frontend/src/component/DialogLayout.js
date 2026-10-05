import * as React from 'react';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import {Typography} from "@mui/material";

const DialogLayout = (
    {
        title,
        isOpen,
        close,
        children,
        cancelClick,
        confirmClick,
        confirmText = "확인",
        loading,
        errorText
    }
) => {

    return (
        <Dialog onClose={close} open={isOpen || loading} maxWidth={"xs"} fullWidth>

            {Boolean(title) && <DialogTitle id="customized-dialog-title">{title}</DialogTitle>}
            {Boolean(children) && <DialogContent dividers>{children}</DialogContent>}

            <DialogActions>
                {Boolean(errorText) &&
                <Typography variant={"caption"} color={"error"} flexGrow={1} pl={2} noWrap>
                    {errorText}
                </Typography>
                }

                {Boolean(cancelClick) &&
                <Button autoFocus onClick={cancelClick} color={"error"} disabled={loading}>
                    취소
                </Button>
                }

                {Boolean(confirmClick) &&
                <LoadingButton autoFocus onClick={confirmClick} loading={loading}>
                    {confirmText}
                </LoadingButton>
                }
            </DialogActions>
        </Dialog>
    );
}

export default DialogLayout;