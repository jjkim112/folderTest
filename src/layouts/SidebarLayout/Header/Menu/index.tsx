import {
  Box,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { styled } from "@mui/material/styles";

const ListWrapper = styled(Box)(
  ({ theme }) => `
        .MuiTouchRipple-root {
            display: none;
        }
        
        .MuiListItem-root {
            transition: ${theme.transitions.create(["color", "fill"])};
            
            &.MuiListItem-indicators {
                padding: ${theme.spacing(1, 2)};
            
                .MuiListItemText-root {
                    .MuiTypography-root {
                        &:before {
                            height: 4px;
                            width: 75%;
                            opacity: 0;
                            visibility: hidden;
                            display: block;
                            position: absolute;
                            bottom: -10px;
                            transition: all .2s;
                            border-radius: 20px;
                            content: "";
                            background: #5569ff;
                        }
                    }
                }

                &.active,
                &:active,
                &:hover {
                
                    background: transparent;
                
                    .MuiListItemText-root {
                        .MuiTypography-root {
                            &:before {
                                opacity: 1;
                                visibility: visible;
                                bottom: 0px;
                            }
                        }
                    }
                }
            }
        }
`
);

function HeaderMenu() {
  return (
    <>
      <ListWrapper
        sx={{
          display: {
            xs: "none",
            md: "block",
            lg: "block",
          },
        }}
      >
        <List disablePadding component={Box} display="flex">
          <ListItem
            classes={{ root: "MuiListItem-indicators" }}
            button
            component={NavLink}
            to="/admin/storeInfo"
          >
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary="매장 정보 관리"
            />
          </ListItem>
          {/* <ListItem
            classes={{ root: "MuiListItem-indicators" }}
            button
            component={NavLink}
            to="/admin/storeInfoEdit"
          >
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary="매장 정보 추가/삭제"
            />
          </ListItem> */}
          {/* <ListItem
            classes={{ root: 'MuiListItem-indicators' }}
            button
            component={NavLink}
            to="/admin/guestInfo"
          >
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary="손님 정보 관리"
            />
          </ListItem> */}
          {/* <ListItem
            classes={{ root: 'MuiListItem-indicators' }}
            button
            component={NavLink}
            to="/admin/guestInfoEdit"
          >
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary="손님 정보 추가/삭제"
            />
          </ListItem> */}
        </List>
      </ListWrapper>
    </>
  );
}

export default HeaderMenu;
