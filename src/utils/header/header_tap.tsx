import { Box, Tab, Tabs } from '@mui/material';
import React, { useState, useEffect, SyntheticEvent } from 'react';

type Section = {
  label: string;
};

type HeaderTapProps = {
  content: Section[];
  activeTab: React.Dispatch<React.SetStateAction<number>>;
};

export const HeaderTap = ({ content, activeTab }: HeaderTapProps) => {
  const [activeHeaderTab, setActiveHeaderTab] = useState(0);

  function handleClickTab(
    event: SyntheticEvent<Element, Event>,
    value: any
  ): void {
    activeTab(value);
    setActiveHeaderTab(value);
  }

  return (
    <Box
      bgcolor={'black'}
      color={'white'}
      display="flex"
      justifyContent="center"
    >
      <Tabs
        value={activeHeaderTab}
        onChange={handleClickTab}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable force tabs example"
      >
        {content ? (
          content.map((tab, index) => (
            <Tab
              key={index}
              label={tab.label}
              style={{ color: activeHeaderTab === index ? 'white' : 'gray' }}
            />
          ))
        ) : (
          <Tab label="없음" />
        )}
      </Tabs>
    </Box>
  );
};
