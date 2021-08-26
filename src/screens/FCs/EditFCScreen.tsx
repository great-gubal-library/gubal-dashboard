import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { observer } from 'mobx-react';
import { useHistory, useParams } from 'react-router-dom';
import { Layout } from '../../components/Layout/Layout';
import { FormBox } from '../../components/FormLayout';
import { useStores } from '../../stores';
import { RootStore } from '../../stores/Stores';
import { IEditFC } from '../../types/FC';
import { FCDetailsForm } from './FCDetailsForm';

export const EditFCScreen: FC<any> = observer(() => {
  const {
    FCsStore: {
      singleFC,
      getFC,
      updateFC,
    }
  } = useStores() as RootStore;

  const history = useHistory();
  
  const { id: idString }: { id: string } = useParams();
  const id = useMemo(
    () => idString && parseInt(idString)
    , [idString]);

  useEffect(() => {
    if (id) {
      getFC(id);
    }
  }, [id, getFC]);

  const onSubmit = useCallback(async (data: IEditFC) => {
    if (id) {
      await updateFC(id, data);
      history.push('/free-companies');
    }
  }, [id, updateFC, history]);

  return (
    <Layout header='back' backUrl='/free-companies' headerText="Free Company details">
        <FormBox>
            <FCDetailsForm
              initialValues={singleFC}
              onSubmit={onSubmit}
            />
        </FormBox>
    </Layout>
  );
});
