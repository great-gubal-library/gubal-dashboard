import React, { useEffect, useState, FC } from 'react';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { useStores } from '../../stores';
import { Layout } from '../../components/Layout';
import Table from '../../components/MaterialTable/MaterialTable';
import { CellRenderers } from '../../components/MaterialTable/CellRenderers'
import { ConfirmDialog } from '../../components/Dialog/ConfirmDialog'
import { RootStore } from '../../stores/Stores';

export interface CharactersScreenProps {

}

export const CharactersScreen: FC<CharactersScreenProps> = observer(() => {
  const {
    charactersStore: {
      Characters,
      loadingState,
      initializeCharacterListing,
      deleteCharacter
    },
  } = useStores() as RootStore;
  const history = useHistory();
  const [deleteId, setDeleteId] = useState(0);
  const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);

  useEffect(() => {
    initializeCharacterListing();
  }, [initializeCharacterListing]);

  const handleDeleteClick = ({ id }: any) => {
    if (id) {
      setDeleteId(id);
      setShowConfirmDeleteDialog(true);
    }
  }

  const confirmDialog =
    <ConfirmDialog
      open={showConfirmDeleteDialog}
      title="Are you sure you want to delete the character?"
      onAccept={() => {
        setShowConfirmDeleteDialog(false);
        if (deleteId) {
          deleteCharacter(deleteId);
        }
      }}
      onCancel={() => setShowConfirmDeleteDialog(false)}
    />

  const columns = [{
    accessor: 'name',
    Header: "Name",
    Cell: CellRenderers.link(row => `/characters/${row.id}`),
  },
  {
    accessor: 'tags',
    Header: "Tags",
  },
  {
    accessor: 'server',
    Header: "Server",
  },
  {
    accessor: 'edit',
    Header: "Edit",
    Cell: CellRenderers.editIcon(row => `/characters/${row.id}`),
  }, {
    accessor: 'id',
    Header: "Delete",
    Cell: CellRenderers.deleteIcon(handleDeleteClick),
  }];

  const screenActions = [{
    label: "Add new character",
    handler: () => {
      history.push('/characters/add')
    }
  }];

  return (
    <Layout screenActions={screenActions} headerText="Characters">
      {confirmDialog}
      <Table
        data={loadingState.loading ? [] : (Characters ?? [])}
        columns={columns}
      />
    </Layout>
  );
});
