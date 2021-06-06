import React, { useEffect, useState, FC } from 'react';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { useStores } from '../../stores';
import { Layout } from '../../components/Layout';
import Table from '../../components/MaterialTable/MaterialTable';
import { CellRenderers } from '../../components/MaterialTable/CellRenderers'
import { ConfirmDialog } from '../../components/Dialog/ConfirmDialog'
import { RootStore } from '../../stores/Stores';

export interface LocationsScreenProps {

}

export const LocationsScreen: FC<LocationsScreenProps> = observer(() => {
  const {
    locationsStore: {
      locations,
      loadingState,
      initializeLocationListing,
      deleteLocation
    },
  } = useStores() as RootStore;
  const history = useHistory();
  const [deleteId, setDeleteId] = useState(0);
  const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);

  useEffect(() => {
    initializeLocationListing();
  }, [initializeLocationListing]);

  const handleDeleteClick = ({ id }: any) => {
    if (id) {
      setDeleteId(id);
      setShowConfirmDeleteDialog(true);
    }
  }

  const confirmDialog =
    <ConfirmDialog
      open={showConfirmDeleteDialog}
      title="Are you sure you want to delete the location?"
      onAccept={() => {
        setShowConfirmDeleteDialog(false);
        if (deleteId) {
          deleteLocation(deleteId);
        }
      }}
      onCancel={() => setShowConfirmDeleteDialog(false)}
    />

  const columns = [{
    accessor: 'name',
    Header: "Name",
    Cell: CellRenderers.link(row => `/locations/${row.id}`),
  }, {
    accessor: 'owner',
    Header: "Owner",
    Cell: CellRenderers.link(row => `/locations/${row.id}`),
  }, {
    accessor: 'inGameLocation',
    Header: "Location",
    Cell: CellRenderers.link(row => `/locations/${row.id}`),
  }, {
    accessor: 'edit',
    Header: "Edit",
    Cell: CellRenderers.editIcon(row => `/locations/${row.id}`),
  }, {
    accessor: 'id',
    Header: "Delete",
    Cell: CellRenderers.deleteIcon(handleDeleteClick),
  }];

  const screenActions = [{
    label: "Add new location",
    handler: () => {
      history.push('/locations/add')
    }
  }];

  return (
    <Layout screenActions={screenActions} headerText="Roleplay Venues">
      {confirmDialog}
      <Table
        data={loadingState.loading ? [] : (locations ?? [])}
        columns={columns}
      />
    </Layout>
  );
});
