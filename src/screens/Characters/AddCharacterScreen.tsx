import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { Layout } from '../../components/Layout/Layout';
import { FormBox } from '../../components/FormLayout';
import { CharacterDetailsForm } from './CharacterDetailsForm';
import { useStores } from '../../stores/index';
import { useHistory } from 'react-router-dom';
import { ICharacter } from '../../types/Character';

export interface AddCharacterScreenProps {
  
}

export const AddCharacterScreen: FC<AddCharacterScreenProps> = observer(() => {
  const {
    charactersStore: {
      createCharacter
    },
  } = useStores();

  const history = useHistory();

  const onSubmit = async (formValues: any) => {
    await createCharacter(formValues);
    history.push('/characters');
  };

  const initialValues: ICharacter = {
    id: 0,
    name: "",
    description: "",
    externalLink: "",
    tags: "",
    server: null,
    datacenter: null
  };

  return (
    <Layout header='back' backUrl='/characters' headerText="Add a new Character">
      <FormBox>
        <CharacterDetailsForm
          onSubmit={onSubmit}
          initialValues={initialValues}
        />
      </FormBox>
    </Layout>
  );
});
