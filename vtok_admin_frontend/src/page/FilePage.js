import * as React from "react";
import {Box, Fab, Stack} from "@mui/material";
import styled from "@emotion/styled";
import {AddRounded, DeleteRounded} from "@mui/icons-material";
import TitleBar from "../component/TitleBar";
import FileUploadDialog from "../component/FileUploadDialog";
import {useEffect, useState} from "react";
import {escapeRegExp} from "../res/common";
import CustomDataGrid from "../component/CustomDataGrid";
import {apiRequest} from "../api/request";
import {useHistory} from "react-router-dom";
import strings from "../res/strings";
import DeleteAlert from "../component/DeleteAlert";

const Root = styled(Box)(({ theme }) => ({
    padding: 24,
    width: "100%",
    height: "calc(100% - 69px)",
    boxSizing: "border-box",
}));

const FilePage = () => {
    const { push } = useHistory();

    const [createOpen, setCreateOpen] = useState(false);
    const [alert, setAlert] = useState(false);

    const [rows, setRows] = useState(null);
    const [filtered, setFiltered] = useState(null);
    const [selected, setSelected] = useState(null);

    const columns = [
        { field: 'Idx', headerName: '고유 번호', type: 'number', align: 'center', width: 90 },
        { field: 'Category_name', headerName: '카테고리', align: 'center', width: 100 },
        { field: 'File_ver', headerName: '최종 버전', type: 'number', align: 'center', width: 90 },
        { field: 'Title', headerName: '제목', width: 250 },
        {
            field: 'File_up_date',
            headerName: '마지막 수정',
            width: 220,
            type: 'date',
            valueGetter: (params) => `${new Date(params.row.File_up_date)
                .toLocaleDateString("ko", {day: "numeric", month: "short", year: "numeric", hour: "numeric", hour12: true, minute: "numeric"})}`,
        },
        { field: 'File_name', headerName: '최근 업로드 파일명', width: 400 },
    ];

    const handleCreateOpen = () => {
        setCreateOpen(true);
    };

    const handleCreateClose = () => {
        setCreateOpen(false);
    };

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
            url: `/api/get/file`,

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

    const handleDeleteChecked = async () => {
        setAlert(null);

        if (selected && selected.length > 0) {
            await apiRequest({
                method: "POST",
                url: `/api/del/file`,
                params: {
                    idx: selected.join(",")
                }

            }).then(response => {
                console.log(response);
                getData(true);

            }).catch(err => {
                console.log(err);

            });
        }
    }

    useEffect(() => getData(), []);

    return (
        <>
            <FileUploadDialog
                isOpen={createOpen}
                open={handleCreateOpen}
                close={handleCreateClose}
                onSuccess={async () => await getData(true)}
            />

            <Root>
                <TitleBar
                    title={"파일"}
                    onChange={handleSearch}
                />

                <CustomDataGrid
                    rowId={r => r.Idx}
                    rows={rows}
                    filtered={filtered}
                    columns={columns}
                    onCellDoubleClick={(params, event) => {
                        event.defaultMuiPrevented = true;
                        push(strings.FILE + "/" + params.id)
                    }}
                    onSelection={e => {setSelected(e)}}
                />

                <Stack
                    direction={"row"}
                    spacing={2}
                    alignItems={"center"}
                    sx={{
                        position: "fixed",
                        bottom: 0,
                        left: "50%",
                        marginRight: "-50%",
                        transform: `translate(-50%, -50%)`,
                        margin: "16px auto",
                    }}
                >

                    {(!selected || selected.length < 1) ?
                        <Fab
                            variant="extended"
                            onClick={handleCreateOpen}
                        >
                            <AddRounded sx={{ mr: 1 }} />
                            파일 추가
                        </Fab>
                        :
                        <>
                            <Fab
                                variant="extended"
                                onClick={() => setAlert(true)}
                                style={{backgroundColor: "#f44336", color: "white"}}
                            >
                                <DeleteRounded sx={{ mr: 1 }} />
                                선택 삭제
                            </Fab>
                        </>
                    }

                </Stack>
            </Root>

            <DeleteAlert
                open={alert}
                close={() => setAlert(null)}
                confirm={handleDeleteChecked}
            />
        </>
    );
}

export default FilePage;
