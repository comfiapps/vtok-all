import * as React from 'react';
import {Stack, TextField} from "@mui/material";
import DialogLayout from "./DialogLayout";
import {useEffect, useState} from "react";
import {apiRequest} from "../api/request";
import HierarcialCategory from "./HierarcialCategory";

const CategoryCreateDialog = ({preCode, close, onSuccess, ...props}) => {
    const {isOpen} = props;

    const defaultValue = {name: "", code: null}
    const [value, setValue] = useState(defaultValue);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleValue = prop => e => setValue({...value, [prop]: e.target.value});

    const handleConfirm = () => {
        if (!loading) {
            setLoading(true);

            apiRequest({
                method: "POST",
                url: `/api/set/category`,
                params: value,

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
            setValue(defaultValue);
            if (preCode) setValue({...defaultValue, code: preCode});
            setError(null);
        }
    }, [isOpen]);

    const textFieldProp = {
        variant: "filled",
        fullWidth: true
    }

    return (
        <DialogLayout
            title={"카테고리 추가"}
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

                <HierarcialCategory
                    view={isOpen}
                    selected={value.code}
                    onSelect={val => setValue({...value, code: val})}
                />
            </Stack>

        </DialogLayout>
    );
}

export default CategoryCreateDialog;