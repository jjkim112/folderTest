import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
type IntroductionTab = {
  label: string;
  mainLink?: string;
};

const tabs: IntroductionTab[] = [
  {
    label: '홈',
    mainLink: '/',
  },

  {
    label: '홀덤 정보',
    mainLink: '/holdem-base',
  },
  {
    label: '홀덤 유틸',
    mainLink: '/holdem-util',
  },
  {
    label: '홀덤 펍/지점',
    mainLink: '/holdem-pub',
  },

  {
    label: '포커 계산기',
    mainLink: '/poker-cal',
  },
];

export const Header = () => {
  const [activeHeaderTab, setActiveHeaderTab] = useState(0);
  const navigator = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const pathName = location.pathname.split('/');

    const currentTab = tabs.findIndex(
      (tab) => tab.mainLink === `/${pathName[1]}`
    );
    setActiveHeaderTab(currentTab !== -1 ? currentTab : 0);
  }, [location]);
  function handleClickTab(
    event: SyntheticEvent<Element, Event>,
    value: any
  ): void {
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
        {tabs ? (
          tabs.map((tab, index) => (
            <Tab
              key={index}
              label={tab.label}
              style={{ color: activeHeaderTab === index ? 'white' : 'gray' }}
              onClick={() => navigator(tab.mainLink)}
            />
          ))
        ) : (
          <Tab label="없음" />
        )}
      </Tabs>
    </Box>
  );
};
