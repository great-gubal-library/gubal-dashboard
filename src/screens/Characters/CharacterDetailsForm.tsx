import React, { FC, useState } from 'react';
import { Grid, Box } from '@material-ui/core';
import { Form } from 'react-final-form';
import { Input, SubmitButton, SelectField } from '../../components/FormControls';
import { IEditCharacter, ICharacter } from '../../types/Character';
import { gameServers } from '../../constants/gameServers';
import { dataCenters } from '../../constants';

export interface CharacterDetailsFormProps {
  initialValues: ICharacter | null;
  onSubmit: (value: IEditCharacter) => void;
}

export const CharacterDetailsForm: FC<CharacterDetailsFormProps> = ({ onSubmit, initialValues }) => {
  const [currentDatacenter, setCurrentDatacenter] = useState("Chaos");
  return <Form
    onSubmit={onSubmit}
    initialValues={initialValues}
    render={({ handleSubmit, submitting, pristine, invalid }) => 
      <form onSubmit={handleSubmit}>
        <Box p={8}>
          <Grid container spacing={8}>
            <Grid item sm={12}>
              <Input
                id="name"
                name="name"
                label="Name"
                required
                validate={(v: any) => v !== null ? undefined : "Validation required"}
              />
            </Grid>
          </Grid>

          <Grid container spacing={8}>
            <Grid item sm={12}>
              <Input
                id="description"
                name="description"
                label="Description"
                required
                multiline
                rows={6}
                validate={(v: any) => v !== null ? undefined : "Validation required"}
              />
            </Grid>
          </Grid>

          <Grid container spacing={8}>
            <Grid item sm={12}>
              <Input
                id="externalLink"
                name="externalLink"
                label="External link"
                validate={(v: any) => v !== null ? undefined : "Validation required"}
              />
            </Grid>
          </Grid>

          <Grid container spacing={8}>
            <Grid item sm={12}>
              <Input
                id="tags"
                name="tags"
                label="Tags"
                validate={(v: any) => v !== null ? undefined : "Validation required"}
              />
            </Grid>
          </Grid>

          <Grid container spacing={8}>
            <Grid item xs={12} />
            <Grid item xs={6} sm={4}>
              <SelectField
                id="server"
                name="server"
                label="Server"
                options={gameServers[currentDatacenter]}
                getOptionString={server => server ? server : gameServers[currentDatacenter][0]}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <SelectField
                id="datacenter"
                name="datacenter"
                value={currentDatacenter}
                label="Data center"
                options={dataCenters}
                onChange={e => {
                  console.info(e);
                  setCurrentDatacenter(e);
                }}
                getOptionString={dc => {
                  if(dc) {
                    return dc;
                  } else {
                    return dataCenters[0];
                  }
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={8} justify="flex-end">
            <Grid item>
              <SubmitButton label="Save" loading={submitting} disabled={pristine || invalid} />
            </Grid>
          </Grid>
        </Box>
      </form>
    }
  />
}
