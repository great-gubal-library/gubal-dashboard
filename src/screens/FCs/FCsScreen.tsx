import React, { useEffect, useState, FC } from 'react';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { useStores } from '../../stores';
import { Layout } from '../../components/Layout';
import Table from '../../components/MaterialTable/MaterialTable';
import { CellRenderers } from '../../components/MaterialTable/CellRenderers'
import { ConfirmDialog } from '../../components/Dialog/ConfirmDialog'
import { RootStore } from '../../stores/Stores';

export interface FCsScreenProps {

}

export const FCsScreen: FC<FCsScreenProps> = observer(() => {
  const {
    FCsStore: {
      FCs,
      loadingState,
      initializeFCListing,
      deleteFC
    },
  } = useStores() as RootStore;
  const history = useHistory();
  const [deleteId, setDeleteId] = useState(0);
  const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);

  useEffect(() => {
    initializeFCListing();
  }, [initializeFCListing]);

  const handleDeleteClick = ({ id }: any) => {
    if (id) {
      setDeleteId(id);
      setShowConfirmDeleteDialog(true);
    }
  }

  const confirmDialog =
    <ConfirmDialog
      open={showConfirmDeleteDialog}
      title="Are you sure you want to delete the FC?"
      onAccept={() => {
        setShowConfirmDeleteDialog(false);
        if (deleteId) {
          deleteFC(deleteId);
        }
      }}
      onCancel={() => setShowConfirmDeleteDialog(false)}
    />

  const columns = [{
    accessor: 'name',
    Header: "Name",
    Cell: CellRenderers.link(row => `/FCs/${row.id}`),
  }, {
    accessor: 'tags',
    Header: "Tags",
    Cell: CellRenderers.link(row => `/FCs/${row.id}`),
  }, {
    accessor: 'owner',
    Header: "Owner",
    Cell: CellRenderers.link(row => `/FCs/${row.id}`),
  }, {
    accessor: 'edit',
    Header: "Edit",
    Cell: CellRenderers.editIcon(row => `/FCs/${row.id}`),
  }, {
    accessor: 'id',
    Header: "Delete",
    Cell: CellRenderers.deleteIcon(handleDeleteClick),
  }];

  const screenActions = [{
    label: "Add new Free Company",
    handler: () => {
      history.push('/free-companies/add')
    }
  }];

  return (
    <Layout screenActions={screenActions} headerText="RP Free Companies">
      {confirmDialog}
      <Table
        data={loadingState.loading ? [] : (FCs ?? [])}
        columns={columns}
      />
    </Layout>
  );
});
