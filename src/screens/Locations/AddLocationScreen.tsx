import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { Layout } from '../../components/Layout/Layout';
import { FormBox } from '../../components/FormLayout';
import { LocationDetailsForm } from './LocationDetailsForm';
import { useStores } from '../../stores/index';
import { useHistory } from 'react-router-dom';
import { ILocation } from '../../types/Location';

export interface AddLocationScreenProps {
  
}

export const AddLocationScreen: FC<AddLocationScreenProps> = observer(() => {
  const {
    locationsStore: {
      createLocation
    },
  } = useStores();

  const history = useHistory();

  const onSubmit = async (formValues: any) => {
    await createLocation(formValues);
    history.push('/locations');
  };

  const initialValues: ILocation = {
    id: 0,
    name: "",
    inGameLocation: "",
    owner: "",
    description: "",
    externalLink: "",
    tags: "",
    server: "Omega",
    datacenter: "Chaos"
  };

  return (
    <Layout header='back' backUrl='/locations' headerText="Add a new location">
      <FormBox>
        <LocationDetailsForm
          onSubmit={onSubmit}
          initialValues={initialValues}
        />
      </FormBox>
    </Layout>
  );
});
