import * as React from 'react';
import {Button, Stack, TextField} from "@mui/material";
import DialogLayout from "./DialogLayout";
import {useEffect, useState} from "react";
import styled from "@emotion/styled";
import {apiRequest} from "../api/request";
import HierarcialCategory from "./HierarcialCategory";
import Typography from "@mui/material/Typography";

const Input = styled('input')({
    display: 'none',
});

const FileUpdateDialog = ({id, data, onSuccess, ...props}) => {
    const {isOpen, close} = props;

    const defaultValue = {file: null, comment: "", line: null, fileName: ""}
    const [value, setValue] = useState(defaultValue);
    const [error, setError] = useState(null);

    const handleValue = prop => e => setValue({...value, [prop]: e.target.value});

    const uploadFile = e => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load',
                () => setValue({...value, file: e.target.files[0], fileName: e.target.files[0].name}));
            reader.readAsDataURL(e.target.files[0])
        }
    }

    const [loading, setLoading] = useState(false);

    const handleConfirm = async () => {
        if (!loading) {
            setLoading(true);

            const formData = new FormData();
            formData.append("file", value.file)

            apiRequest({
                method: "POST",
                url: `/api/update/file`,
                params: {
                    idx: id,
                    line: value.line,
                    comment: value.comment,
                },
                data: formData

            }).then(response => {
                console.log("success", response);
                if (Boolean(close)) close();
                if (Boolean(onSuccess)) onSuccess();

            }).catch(err => {
                console.log("error", err);
                setError(err.toString());

            }).then(() => setLoading(false));
        }
    }

    useEffect(() => {
        if (isOpen) {
            if (data) setValue({...defaultValue, comment: data.Comment, line: data.Line});
            else setValue(defaultValue);
        }
    }, [isOpen, data]);

    const handleClose = () => {
        if (!loading && Boolean(close)) close();
    }

    const textFieldProp = {
        variant: "filled",
        fullWidth: true
    }

    return (
        <DialogLayout
            title={"신규 버전"}
            confirmClick={handleConfirm}
            cancelClick={close}
            loading={loading}
            close={handleClose}
            errorText={error}
            {...props}
        >

            <Stack direction={"column"} spacing={2}>

                <Stack direction={"row"} spacing={2} alignItems={"center"}>
                    <label htmlFor="contained-button-file">
                        <Input accept="*" id="contained-button-file" type="file" onChange={uploadFile} />
                        <Button variant="contained" component="span">
                            파일 선택
                        </Button>
                    </label>

                    <Typography variant={"subtitle2"} noWrap>
                        {value.fileName}
                    </Typography>
                </Stack>

                <HierarcialCategory
                    view={isOpen}
                    selected={value.line}
                    onSelect={val => setValue({...value, line: val})}
                />

                <TextField
                    {...textFieldProp}
                    label={"주석"}
                    value={value.comment}
                    onChange={handleValue('comment')}
                    multiline
                />
            </Stack>

        </DialogLayout>
    );
}

export default FileUpdateDialog;