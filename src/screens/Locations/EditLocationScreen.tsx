import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { observer } from 'mobx-react';
import { useHistory, useParams } from 'react-router-dom';
import { Layout } from '../../components/Layout/Layout';
import { FormBox } from '../../components/FormLayout';
import { useStores } from '../../stores';
import { RootStore } from '../../stores/Stores';
import { IEditLocation } from '../../types/Location';
import { LocationDetailsForm } from './LocationDetailsForm';

export const EditLocationScreen: FC<any> = observer(() => {
  const {
    locationsStore: {
      singleLocation,
      getLocation,
      updateLocation,
    }
  } = useStores() as RootStore;

  const history = useHistory();
  
  const { id: idString }: { id: string } = useParams();
  const id = useMemo(
    () => idString && parseInt(idString)
    , [idString]);

  useEffect(() => {
    if (id) {
      getLocation(id);
    }
  }, [id, getLocation]);

  const onSubmit = useCallback(async (data: IEditLocation) => {
    if (id) {
      await updateLocation(id, data);
      history.push('/locations');
    }
  }, [id, updateLocation, history]);

  return (
    <Layout header='back' backUrl='/locations' headerText="Location details">
        <FormBox>
            <LocationDetailsForm
              initialValues={singleLocation}
              onSubmit={onSubmit}
            />
        </FormBox>
    </Layout>
  );
});
