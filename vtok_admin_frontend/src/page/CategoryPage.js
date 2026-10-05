import {
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Fab, Stack,
} from "@mui/material";
import styled from "@emotion/styled";
import {AccountTreeRounded, AddRounded, DeleteRounded, EditRounded} from "@mui/icons-material";
import * as React from "react";
import TitleBar from "../component/TitleBar";
import {useEffect, useState} from "react";
import CategoryCreateDialog from "../component/CategoryCreateDialog";
import {escapeRegExp} from "../res/common";
import CustomDataGrid from "../component/CustomDataGrid";
import {apiRequest} from "../api/request";
import {GridActionsCellItem,} from '@mui/x-data-grid-pro';
import strings from "../res/strings";
import {useHistory} from "react-router-dom";
import CategoryModifyDialog from "../component/CategoryModifyDialog";
import HierarcialCategory from "../component/HierarcialCategory";
import Button from "@mui/material/Button";

const Root = styled(Box)(({ theme }) => ({
    padding: 24,
    width: "100%",
    height: "calc(100% - 69px)",
    boxSizing: "border-box",
}));

const CategoryPage = () => {
    const { push } = useHistory();

    const [createOpen, setCreateOpen] = useState(false);
    const [parent, setParent] = useState(null);
    const [edit, setEdit] = useState(null);
    const [alert, setAlert] = useState(null);
    const [move, setMove] = useState(null);

    const [rows, setRows] = useState(null);
    const [filtered, setFiltered] = useState(null);

    const columns = [
        { field: 'Line', headerName: '코드', type: 'number', minWidth: 70, hide: true },
        { field: 'Name', headerName: '이름', minWidth: 100, width: 300 },
        { field: 'Code', headerName: '상위코드', type: 'number', minWidth: 100, hide: true },
        {
            field: 'actions',
            type: 'actions',
            width: 150,
            getActions: r => [
                <GridActionsCellItem icon={<AccountTreeRounded />} onClick={() => {
                    setCreateOpen(true);
                    setParent(r.id);
                }} />,
                <GridActionsCellItem icon={<EditRounded />} onClick={() => setEdit(r.row)} />,
                <GridActionsCellItem icon={<DeleteRounded />} onClick={() => setAlert(r.id)} />,
            ],
        },
    ];

    const handleCreateOpen = () => setCreateOpen(true);
    const handleCreateClose = () => {
        setCreateOpen(false);
        setParent(null);
    }
    const handleEditClose = () => setEdit(null);

    const handleSearch = (param) => {
        if (rows && rows.length > 0) {
            const searchRegex = new RegExp(escapeRegExp(param), 'i');
            const filteredRows = rows.filter((row) => {
                return Object.keys(row).some((field) => {
                    return searchRegex.test(row[field].toString());
                });
            });
            setFiltered(filteredRows);
        }
    }

    const getData = async (reset) => {
        await apiRequest({
            method: "GET",
            url: `/api/get/category`,

        }).then(response => {
            console.log(response);
            const jsonData = response;
            if (jsonData) {
                if (rows && !reset) setRows({...rows, jsonData})
                else setRows(jsonData);
            }

        }).catch(err => {
            console.log(err);

        });
    }

    const handleDelete = async () => {
        await apiRequest({
            method: "POST",
            url: `/api/del/category`,
            params: {
                line: alert,
                reline: move,
            }

        }).then(response => {
            console.log(response);
            getData(true);

        }).catch(err => {
            console.log(err);

        }).then(() => setAlert(null));
    }

    useEffect(() => getData(true), []);

    return (
        <>
            <CategoryCreateDialog
                isOpen={createOpen}
                close={handleCreateClose}
                confirmText={"추가"}
                preCode={parent}
                onSuccess={async () => await getData(true)}
            />

            <CategoryModifyDialog
                isOpen={Boolean(edit)}
                close={handleEditClose}
                confirmText={"수정"}
                onSuccess={async () => await getData(true)}
                data={edit}
            />

            <Root>
                <TitleBar
                    title={"카테고리"}
                    onChange={handleSearch}
                />

                <CustomDataGrid
                    pro={true}
                    checkboxSelection={false}
                    rowId={r => r.Line}
                    rows={rows}
                    filtered={filtered}
                    columns={columns}
                    grouping={r => {
                        const codeString = r.Line.toString();
                        let splits = [];
                        for (let i = 2; i <= codeString.length; i += strings.codeLength) splits.push(codeString.substr(0, i));
                        return splits;
                    }}
                />

                <Fab
                    variant="extended"
                    sx={{
                        position: "fixed",
                        bottom: 0,
                        left: "50%",
                        marginRight: "-50%",
                        transform: `translate(-50%, -50%)`,
                        margin: "16px auto",
                    }}
                    onClick={handleCreateOpen}
                >
                    <AddRounded sx={{ mr: 1 }} />
                    카테고리 생성
                </Fab>
            </Root>

            <Dialog open={alert} onClose={() => setAlert(null)}>
                <DialogTitle>정말로 삭제하시겠습니까?</DialogTitle>
                <DialogContent>
                    <DialogContentText>이동하실 카테고리를 선택하세요</DialogContentText>
                    <DialogContentText color={"error"} variant={"caption"}>(카테고리를 선택하지 않으면 관련 파일이 모두 삭제됩니다)</DialogContentText>

                    <Stack direction={"column"} spacing={2} width={"100%"} mt={1}>
                        <HierarcialCategory
                            view={alert}
                            selected={move}
                            onSelect={val => setMove(val)}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setAlert(null)} autoFocus>취소</Button>
                    <Button onClick={handleDelete} color={"error"}>삭제</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default CategoryPage;
