import React, { FC } from 'react';
import { Grid, Box } from '@material-ui/core';
import { Form } from 'react-final-form';
import { Input, SubmitButton, SelectField } from '../../components/FormControls';
import { IEditLocation, ILocation } from '../../types/Location';
import { gameServers } from '../../constants/gameServers';
import { dataCenters } from '../../constants';

export interface LocationDetailsFormProps {
  initialValues: ILocation | null;
  onSubmit: (value: IEditLocation) => void;
}

export const LocationDetailsForm: FC<LocationDetailsFormProps> = ({ onSubmit, initialValues }) => {
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
                id="inGameLocation"
                name="inGameLocation"
                label="In-game location"
                required
                validate={(v: any) => v !== null ? undefined : "Validation required"}
              />
            </Grid>
          </Grid>

          <Grid container spacing={8}>
            <Grid item sm={12}>
              <Input
                id="owner"
                name="owner"
                label="Owner"
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
                options={gameServers}
                getOptionString={server => server ? server : "Omega"}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <SelectField
                id="datacenter"
                name="datacenter"
                label="Data center"
                options={dataCenters}
                getOptionString={dc => dc ? dc : "Chaos"}
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
