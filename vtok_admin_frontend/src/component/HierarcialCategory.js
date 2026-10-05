import * as React from 'react';
import {FormControl, InputLabel, Select} from "@mui/material";
import {useEffect, useState} from "react";
import MenuItem from "@mui/material/MenuItem";
import {apiRequest} from "../api/request";
import strings from "../res/strings";

const CategoryCreateDialog = ({view, selected, onSelect}) => {
    const [category, setCategory] = useState(null);
    const [hierarchy, setHierarchy] = useState(null);
    const [crumb, setCrumb] = useState(null);

    const handleParent = (e, level) => {
        if (e.target.value === null && level > 0) onSelect(crumb[level - 1]);
        else {
            if (e.target.value === null && level === 0) setCrumb(null);
            onSelect(e.target.value);
        }
    }

    const getCategory = async () => {
        await apiRequest({
            method: "GET",
            url: `/api/get/category`,

        }).then(response => {
            console.log(response);
            const jsonData = response;
            if (jsonData) setCategory(jsonData);

        }).catch(err => {
            console.log(err);

        });
    }

    useEffect(() => {
        if (view) {
            setCategory(null);
            setHierarchy(null);
            setCrumb(null);
            getCategory(true)
        }
    }, [view]);

    useEffect(() => {
        let mArray = category ? [category.filter(element => element.Line.toString().length / 2 === 1)] : null;

        if (selected && category) {
            const codeString = selected.toString();

            let splits = [];
            for (let i = 2; i <= codeString.length; i += strings.codeLength) splits.push(codeString.substr(0, i));
            setCrumb(splits);

            if (splits.length > 0) {
                splits.forEach((element, index) => {
                    const childArray =
                        category
                            .filter(e => e.Line.toString().length === element.toString().length + strings.codeLength)
                            .filter(e => e.Line.toString().startsWith(element));
                    if (childArray.length > 0) mArray.push(childArray);
                })
            }
        }

        setHierarchy(mArray);
    }, [category, selected])

    if (!hierarchy) return <></>
    return (
        hierarchy.map((arr, index) => (
            <FormControl variant="filled" sx={{ minWidth: 120 }}>
                <InputLabel id="select-label">분류 {index + 1}</InputLabel>
                    <Select
                        labelId="select-label"
                        value={crumb && crumb[index]}
                        onChange={e => handleParent(e, index)}
                    >
                        <MenuItem value={null}>
                            <em>선택 안함</em>
                        </MenuItem>

                        {arr.map((item) => (
                            <MenuItem
                                key={item.Line}
                                value={item.Line}
                                // onClick={() => handleCloseNavMenu(page)}
                            >
                                {item.Name}
                            </MenuItem>
                        ))}
                    </Select>
            </FormControl>
        ))
    );
}

export default CategoryCreateDialog;