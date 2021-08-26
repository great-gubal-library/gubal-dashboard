import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { observer } from 'mobx-react';
import { useHistory, useParams } from 'react-router-dom';
import { Layout } from '../../components/Layout/Layout';
import { FormBox } from '../../components/FormLayout';
import { useStores } from '../../stores';
import { RootStore } from '../../stores/Stores';
import { IEditCharacter } from '../../types/Character';
import { CharacterDetailsForm } from './CharacterDetailsForm';

export const EditCharacterScreen: FC<any> = observer(() => {
  const {
    charactersStore: {
      singleCharacter,
      getCharacter,
      updateCharacter,
    }
  } = useStores() as RootStore;

  const history = useHistory();
  
  const { id: idString }: { id: string } = useParams();
  const id = useMemo(
    () => idString && parseInt(idString)
    , [idString]);

  useEffect(() => {
    if (id) {
      getCharacter(id);
    }
  }, [id, getCharacter]);

  const onSubmit = useCallback(async (data: IEditCharacter) => {
    if (id) {
      await updateCharacter(id, data);
      history.push('/characters');
    }
  }, [id, updateCharacter, history]);

  return (
    <Layout header='back' backUrl='/characters' headerText="Character details">
        <FormBox>
            <CharacterDetailsForm
              initialValues={singleCharacter}
              onSubmit={onSubmit}
            />
        </FormBox>
    </Layout>
  );
});
