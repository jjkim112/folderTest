import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { PlayerButton } from './playerButton';
import { DetailTournaUser } from './detailTournaUser';
import { BasicTextFields } from './playerInputBox';
import { useMemo, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/store/store';
import { Game, GamePlayerThumb } from 'src/domain/Game.model';
import { AdminRequireLayout } from '../../AdminRequireLayout';
import {
  refreshGames,
  setOneGameData,
  setOneGamePlayer,
  toggleEditMode,
} from 'src/reducer/gameSlice';
import { TournaEditButton } from './tournaEditButton';
import { FirebasePub } from 'src/data/firebase/FirebasePub';
export interface typeGames {
  id: string;
  pubId: string;
  gameTempId: string;
  title: string;
  subTitle: string;
  description: string;
  note: string;
  entry: number;
  date: Date;
  totalReward: string;
  players: GamePlayerThumb[];
}

export default function EnhancedTable() {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof typeGames>('id');
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [playerList, setPlayerList] = useState<GamePlayerThumb[]>([]);
  const [gameId, setGameId] = useState<string>('');

  const id = useParams().id;
  const dispatch = useDispatch<AppDispatch>();
  const pubsData = useSelector((state: RootState) => state.admin.pub);
  const gamesData = useSelector((state: RootState) => state.game.games);
  const isEdit = useSelector((state: RootState) => state.game.isEdit);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof typeGames
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = gamesData.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - gamesData.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort(gamesData, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, gamesData]
  );
  async function tournamentDelete() {
    let newGameDatas = gamesData;
    console.log('dsadsa');

    for (let index = 0; index < selected.length; index++) {
      console.log('dsadsa');
      newGameDatas = newGameDatas.filter(
        (value) => value.id !== selected[index]
      );
      await FirebasePub.deleteGame(pubsData.id, selected[index]);
    }
    console.log(newGameDatas);
    dispatch(refreshGames(newGameDatas));
    setSelected([]);
  }

  return (
    <AdminRequireLayout>
      <div className="flex gap-4">
        <Box sx={{ width: '100%' }}>
          <Paper sx={{ width: '100%', mb: 2 }}>
            <EnhancedTableToolbar
              onClick={tournamentDelete}
              numSelected={selected.length}
            />
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={dense ? 'small' : 'medium'}
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  // onRequestSort={() => {}}
                  rowCount={gamesData.length}
                />
                <TableBody>
                  {visibleRows.map((row: typeGames, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        // onClick={(event) => handleClick(event, row.name)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={index}
                        selected={isItemSelected}
                        style={{
                          border: isItemSelected ? '3px solid red' : '',
                        }}
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            onClick={(event) => handleClick(event, row.id)}
                            aria-checked={isItemSelected}
                            checked={isItemSelected}
                            inputProps={{
                              'aria-labelledby': labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell
                          className="h-20"
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {row.title}
                        </TableCell>
                        <TableCell align="right">
                          {row.date.toLocaleString()}
                        </TableCell>
                        <TableCell align="right">{row.entry}</TableCell>
                        <TableCell align="right">{pubsData.name}</TableCell>
                        <TableCell align="right">
                          {row.players.length}
                        </TableCell>

                        <TableCell
                          onClick={() => {
                            console.log('test');
                          }}
                          align="right"
                        >
                          <PlayerButton
                            isEdit={isEdit}
                            onClick={() => {
                              if (!isEdit) {
                                setSelected([row.id]);
                                setPlayerList(row.players);
                                setGameId(row.id);
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell
                          onClick={() => {
                            console.log('test');
                          }}
                          align="right"
                        >
                          <TournaEditButton
                            onClick={() => {
                              dispatch(
                                setOneGameData(
                                  new Game(
                                    row.id,
                                    row.pubId,
                                    row.gameTempId,
                                    row.title,
                                    row.subTitle,
                                    row.description,
                                    row.note,
                                    row.entry,
                                    row.date,
                                    row.totalReward,
                                    row.players
                                  )
                                )
                              );
                              setPlayerList([]);
                              setSelected([row.id]);
                              dispatch(setOneGamePlayer(row.players));
                              dispatch(toggleEditMode(true));
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: (dense ? 33 : 53) * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={gamesData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>

        <DetailTournaUser playerList={playerList} />
      </div>
      <div>
        <BasicTextFields pubsData={pubsData} />
      </div>
    </AdminRequireLayout>
  );
}

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Game
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof Game) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: string | number | Date | GamePlayerThumb[] },
  b: { [key in Key]: string | number | Date | GamePlayerThumb[] }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Game;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'title',
    numeric: true,
    disablePadding: false,
    label: '토너이름',
  },
  {
    id: 'date',
    numeric: true,
    disablePadding: false,
    label: '날짜',
  },
  {
    id: 'entry',
    numeric: true,
    disablePadding: false,
    label: '엔트리',
  },
  {
    id: 'pubId',
    numeric: true,
    disablePadding: false,
    label: '지점아이디',
  },
  {
    id: 'players',
    numeric: true,
    disablePadding: false,
    label: '플레이어',
  },
];
interface EnhancedTableToolbarProps {
  onClick: () => void;
  numSelected: number;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { onClick, numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          토너먼트정보
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton
            onClick={() => {
              onClick();
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}
