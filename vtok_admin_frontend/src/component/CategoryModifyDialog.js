import * as React from 'react';
import {Stack, TextField} from "@mui/material";
import DialogLayout from "./DialogLayout";
import {useEffect, useState} from "react";
import {apiRequest} from "../api/request";
import HierarcialCategory from "./HierarcialCategory";

const CategoryModifyDialog = ({close, onSuccess, data, ...props}) => {
    const {isOpen} = props;

    const defaultValue = {name: ""}
    const [value, setValue] = useState(defaultValue);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleValue = prop => e => setValue({...value, [prop]: e.target.value});

    const handleConfirm = () => { // todo
        if (!loading) {
            setLoading(true);

            apiRequest({
                method: "POST",
                url: `/api/update/category`,
                params: {
                    line: data.Line,
                    name: value.name,
                },

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

    const handleClose = () => {
        if (!loading && Boolean(close)) close();
    }

    useEffect(() => {
        if (isOpen) {
            setValue({name: data.Name})
            setError(null);
        }
    }, [isOpen, data]);

    const textFieldProp = {
        variant: "filled",
        fullWidth: true
    }

    return (
        <DialogLayout
            title={"카테고리 수정"}
            confirmClick={handleConfirm}
            cancelClick={close}
            loading={loading}
            close={handleClose}
            errorText={error}
            {...props}
        >
            <Stack direction={"column"} spacing={2}>
                <TextField
                    {...textFieldProp}
                    label={"카테고리 이름"}
                    value={value.name}
                    onChange={handleValue('name')}
                />
            </Stack>

        </DialogLayout>
    );
}

export default CategoryModifyDialog;