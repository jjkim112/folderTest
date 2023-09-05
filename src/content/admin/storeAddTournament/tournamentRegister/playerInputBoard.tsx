import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from '@mui/x-data-grid-generator';
import { GamePlayerThumb } from 'src/domain/Game.model';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/store/store';
import {
  setOneGameData,
  setOneGamePlayer,
  updateOneGamePlayer,
} from 'src/reducer/gameSlice';

interface EditToolbarProps {
  rows: GamePlayerThumb[];
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { rows, setRowModesModel } = props;
  const dispatch = useDispatch<AppDispatch>();
  const handleClick = () => {
    const id = randomId();

    dispatch(
      setOneGamePlayer([
        ...rows,
        {
          id,
          name: '',
          rank: rows.length + 1,
          prize: 0,
          note: '',
        },
      ])
    );
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'id' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        플레이어추가
      </Button>
    </GridToolbarContainer>
  );
}

interface PlayerListInputProps {
  rows: GamePlayerThumb[];
}

export const FullFeaturedCrudGrid: React.FC<PlayerListInputProps> = ({
  rows,
}) => {
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );
  const dispatch = useDispatch<AppDispatch>();
  const handleRowEditStop: GridEventListener<'rowEditStop'> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    dispatch(setOneGamePlayer(rows.filter((row) => row.id !== id)));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow) {
      dispatch(setOneGamePlayer(rows.filter((row) => row.id !== id)));
    }
  };

  const processRowUpdate = (newRow: GamePlayerThumb) => {
    const updatedRow = { ...newRow };
    dispatch(
      setOneGamePlayer(
        rows.map((row) => (row.id === newRow.id ? updatedRow : row))
      )
    );

    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    {
      field: 'rank',
      headerName: 'Rank',
      type: 'number',
      width: 150,
      editable: true,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'name',
      headerName: 'NickName',
      type: 'string',
      width: 180,
      align: 'center',
      headerAlign: 'center',
      editable: true,
    },
    {
      field: 'prize',
      headerName: 'Prize',
      type: 'number',
      width: 200,
      align: 'center',
      headerAlign: 'center',
      editable: true,
    },
    {
      field: 'note',
      headerName: 'Note',
      type: 'string',
      width: 200,
      align: 'center',
      headerAlign: 'center',
      editable: true,
    },

    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 300,
      cellClassName: 'actions',
      align: 'right',
      headerAlign: 'right',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { rows, setRowModesModel },
        }}
      />
    </Box>
  );
};
