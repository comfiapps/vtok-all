import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export default function BasicTabs({tabs, value, setValue}) {
    const handleChange = (event, newValue) => setValue(newValue);

    if (!tabs) return <></>;
    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} centered>
                    {tabs.map(item => <Tab label={item.title} />)}
                </Tabs>
            </Box>
        </Box>
    );
}
