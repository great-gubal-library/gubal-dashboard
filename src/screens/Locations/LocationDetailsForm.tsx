import React, { FC } from 'react';
import { Grid, Box } from '@material-ui/core';
import { Form } from 'react-final-form';
import { Input, SubmitButton, SelectField } from '../../components/FormControls';
import { IEditLocation } from '../../types/Location';

export interface LocationDetailsFormProps {
  onSubmit: (value: IEditLocation) => void;
}

export const LocationDetailsForm: FC<LocationDetailsFormProps> = ({ onSubmit }) => {
  return <Form
    onSubmit={onSubmit}
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
                id="location"
                name="location"
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
                options={[false, true]}
                getOptionString={key => key ? "Somewhere else" : "Omega"}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <SelectField
                id="datacenter"
                name="datacenter"
                label="Datacenter"
                options={[false, true]}
                getOptionString={key => key ? "Somewhere else" : "Chaos"}
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
