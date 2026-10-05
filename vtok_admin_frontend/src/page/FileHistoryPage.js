import * as React from "react";
import {
    Backdrop,
    Box,
    CircularProgress,
    Fab,
    Stack,
} from "@mui/material";
import styled from "@emotion/styled";
import {AddRounded, DeleteRounded, DownloadRounded, EditRounded} from "@mui/icons-material";
import TitleBar from "../component/TitleBar";
import {useEffect, useState} from "react";
import {escapeRegExp} from "../res/common";
import CustomDataGrid from "../component/CustomDataGrid";
import {apiRequest} from "../api/request";
import {useHistory} from "react-router-dom";
import strings from "../res/strings";
import FileUpdateDialog from "../component/FileUpdateDialog";
import DeleteAlert from "../component/DeleteAlert";
import {GridActionsCellItem} from "@mui/x-data-grid-pro";

const Root = styled(Box)(({ theme }) => ({
    padding: 24,
    width: "100%",
    height: "calc(100% - 69px)",
    boxSizing: "border-box",
}));

const FileHistoryPage = (props) => {
    const { push } = useHistory();
    const id = props.match.params.id;

    const [createOpen, setCreateOpen] = useState(false);
    const [alert, setAlert] = useState(false);

    const [info, setInfo] = useState(null);
    const [rows, setRows] = useState(null);
    const [filtered, setFiltered] = useState(null);

    const columns = [
        {
            field: 'actions',
            type: 'actions',
            width: 50,
            getActions: r => [
                <GridActionsCellItem icon={<DownloadRounded />} onClick={() => window.open(strings.server_url + r.row.File_link, '_blank')} />,
            ],
        },
        { field: 'File_idx', headerName: '파일 번호', type: 'number', width: 70, hide: true },
        { field: 'Idx', headerName: '고유 번호', type: 'number', width: 70, hide: true },
        { field: 'File_ver', headerName: '버전', type: 'number', align: 'center', width: 60 },
        { field: 'Category_name', headerName: '카테고리', width: 130, hide: true },
        { field: 'Line', headerName: '카테고리 코드', type: 'number', width: 130, hide: true },
        { field: 'Comment', headerName: '설명', width: 300 },
        { field: 'File_link', headerName: '경로', width: 300, hide: true },
        {
            field: 'File_up_date',
            headerName: '생성일',
            width: 220,
            type: 'date',
            valueGetter: (params) => `${new Date(params.row.File_up_date)
                .toLocaleDateString("ko", {day: "numeric", month: "short", year: "numeric", hour: "numeric", hour12: true, minute: "numeric"})}`,
        },
        { field: 'File_name', headerName: '파일명', width: 300 },
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

    const getFile = async () => {
        await apiRequest({
            method: "GET",
            url: `/api/get/file`,
            params: {
                idx: id
            }

        }).then(response => {
            console.log("file", response);
            const jsonData = response;
            if (jsonData && jsonData.length > 0) setInfo(jsonData[0]);

        }).catch(err => {
            console.log(err);

        });
    }

    const getHistory = async (reset) => {
        await apiRequest({
            method: "GET",
            url: `/api/get/file_history`,
            params: {
                idx: id
            }

        }).then(response => {
            console.log("file history", response);
            const jsonData = response;
            if (jsonData) {
                if (rows && !reset) setRows([...rows, ...jsonData])
                else setRows([...jsonData]);
            }

        }).catch(err => {
            console.log(err);

        });
    }

    const handleDelete = async () => {
        setAlert(null);

        await apiRequest({
            method: "POST",
            url: `/api/del/file`,
            params: {
                idx: id
            }

        }).then(response => {
            console.log(response);
            push(strings.FILE);

        }).catch(err => {
            console.log(err);

        });
    }

    useEffect(() => {
        getFile();
        getHistory();
    }, []);

    if (!rows) return <Backdrop open={true} sx={{zIndex: 10000}}><CircularProgress sx={{color: "white"}}/></Backdrop>
    return (
        <>
            <FileUpdateDialog
                id={id}
                data={Boolean(rows) && rows.length > 0 && rows[rows.length - 1]}
                isOpen={createOpen}
                open={handleCreateOpen}
                close={handleCreateClose}
                onSuccess={async () => {
                    await getFile()
                    await getHistory(true)
                }}
            />

            <Root>
                <TitleBar
                    title={Boolean(info) && Boolean(info.Title) && info.Title}
                    subtitle={Boolean(info) && Boolean(info.Category_name) && `${info.Category_name}`}
                    onChange={handleSearch}
                    backClick={() => push(strings.FILE)}
                />

                <CustomDataGrid
                    checkboxSelection={false}
                    rowId={r => r.Idx}
                    rows={rows}
                    filtered={filtered}
                    columns={columns}
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
                    <Fab
                        color={"secondary"}
                        variant="extended"
                        onClick={handleCreateOpen}
                    >
                        <AddRounded sx={{ mr: 1 }} />
                        새로운 버전 추가
                    </Fab>

                    <Fab
                        sx={{width: 48, height: 48}}
                        onClick={() => setAlert(true)}
                    >
                        <DeleteRounded />
                    </Fab>
                </Stack>
            </Root>

            <DeleteAlert
                open={alert}
                close={() => setAlert(null)}
                confirm={handleDelete}
            />
        </>
    );
}

export default FileHistoryPage;
