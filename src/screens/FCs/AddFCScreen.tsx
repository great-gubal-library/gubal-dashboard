import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { Layout } from '../../components/Layout/Layout';
import { FormBox } from '../../components/FormLayout';
import { FCDetailsForm } from './FCDetailsForm';
import { useStores } from '../../stores/index';
import { useHistory } from 'react-router-dom';
import { IFC } from '../../types/FC';

export interface AddFCScreenProps {
  
}

export const AddFCScreen: FC<AddFCScreenProps> = observer(() => {
  const {
    FCsStore: {
      createFC
    },
  } = useStores();

  const history = useHistory();

  const onSubmit = async (formValues: any) => {
    await createFC(formValues);
    history.push('/free-companies');
  };

  const initialValues: IFC = {
    id: 0,
    name: "",
    description: "",
    externalLink: "",
    tags: "",
    location: "",
    owner: "",
    server: null,
    datacenter: null,
  };

  return (
    <Layout header='back' backUrl='/free-companies' headerText="Add a new Free Company">
      <FormBox>
        <FCDetailsForm
          onSubmit={onSubmit}
          initialValues={initialValues}
        />
      </FormBox>
    </Layout>
  );
});
