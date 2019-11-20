import * as React from 'react';

import { gql } from 'apollo-boost';
import { Query, QueryResult, Mutation } from 'react-apollo';
import { Theme, Grid, Paper, Toolbar, Box, TextField, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import DataLoading from 'src/utils/DataLoading';
import DataFetchError from 'src/utils/DataFetchError';

const styles = (theme: Theme) => ({
  sectionHeader: {
    position: 'relative' as any,
    borderBottom: '1px solid #e0e0e0',
    paddingLeft: '50px',
    paddingRight: '50px'
  },
  sectionContainer: {
    padding: `${theme.spacing(1)}px ${theme.spacing(5)}px`
  },
  inputGroup: {
    margin: "30px"
  },
  formAction: {
    'text-align': 'right',
    margin: '30px',
    '& button, & a': {
      marginLeft: '30px',
      'text-transform': 'none'
    }
  },
  formError: {
    color: '#f44336'
  }
});

class UpdateTicket extends React.Component<any, any>  {
  GET_TICKET_QUERY = gql`
  query GetTicket($ticketId: String!) {
    getTicket(ticketId: $ticketId) {
      _id,
      ticketNumber,
      subject,
      description,
      priority,
      status
    }
  }
  `;

  UPDATE_TICKET_MUTATION = gql`
  mutation UpdateTicket($ticketId: String!, $ticketData: UpdateTicketInput!) {
    updateTicket(ticketId: $ticketId, ticketData : $ticketData) {
      _id,
      ticketNumber
    }
  }`;

  // Form validation schema
  validationSchema: Yup.ObjectSchema = Yup.object().shape({
    subject: Yup.string().required('Please enter Ticket subject'),
    priority: Yup.string().required('Please select Ticket priority'),
    status: Yup.string().required('Please select Ticket status'),
    description: Yup.string().required('Please add some description')
  });

  navigateBack = () => {
    this.props.history.goBack();
  }


  public render() {
    let ticketId = this.props.match.params.ticketId;
    const { classes } = this.props;

    return (
      <Paper>
        <Grid container>
          <Grid item xs={12}>
            <Toolbar className={classes.sectionHeader}>
              <h2 className="section-title">Update Ticket details</h2>
            </Toolbar>

            <Box className={classes.sectionContainer}>
              <Grid container>
                <Grid item lg={6} xs={12}>

                  {/* Fetching data from API */}
                  <Query query={this.GET_TICKET_QUERY} variables={{ ticketId }}>
                    {(result: QueryResult) => {
                      if (result.loading) return <DataLoading></DataLoading>
                      if (result.error) return <DataFetchError message={result.error.message}></DataFetchError>

                      let data = result.data.getTicket;

                      return (
                        //  Mutation wrapper for posting data to the server
                        < Mutation mutation={this.UPDATE_TICKET_MUTATION} onCompleted={(result: any) => this.props.history.push('/tickets')}>
                          {(updateTicket: Function) => (

                            // Form definition
                            <Formik
                              enableReinitialize={true}
                              initialValues={{ subject: data.subject, description: data.description, priority: data.priority, status: data.status }}
                              validate={values => { }}
                              validationSchema={this.validationSchema}

                              // Form submit action
                              onSubmit={async (values, { setSubmitting }) => {

                                try {
                                  // Post to API
                                  await updateTicket({
                                    variables: {
                                      ticketId: ticketId,
                                      ticketData: values
                                    }
                                  });
                                  // On success
                                  // ...
                                }
                                catch (err) {
                                  // On API error
                                  console.log(err)
                                }

                              }}
                              validateOnMount={true}
                            >
                              {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                isSubmitting,
                                isValid
                              }) => (
                                  <form onSubmit={handleSubmit} noValidate autoComplete="off">
                                    {/* Subject field */}
                                    <div className={classes.inputGroup}>
                                      <TextField
                                        label="Subject"
                                        fullWidth
                                        margin="normal"
                                        variant="outlined"

                                        name='subject'
                                        value={values.subject}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.subject && !!errors.subject}
                                      />
                                      <ErrorMessage name="subject" component="div" className={classes.formError}></ErrorMessage>
                                    </div>

                                    {/* Priority field */}
                                    <div className={classes.inputGroup}>
                                      <TextField
                                        label="Priority"
                                        fullWidth
                                        select
                                        SelectProps={{
                                          native: true
                                        }}

                                        margin="normal"
                                        variant="outlined"

                                        name='priority'
                                        value={values.priority}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.priority && !!errors.priority}
                                      >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                      </TextField>
                                      <ErrorMessage name="priority" component="div" className={classes.formError}></ErrorMessage>
                                    </div>

                                    {/* Description field */}
                                    <div className={classes.inputGroup}>
                                      <TextField
                                        label="Description"
                                        fullWidth
                                        multiline
                                        rows="6"
                                        margin="normal"
                                        variant="outlined"

                                        name='description'
                                        value={values.description}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.description && !!errors.description}
                                      />
                                      <ErrorMessage name="description" component="div" className={classes.formError}></ErrorMessage>
                                    </div>

                                    {/* Status field */}
                                    <div className={classes.inputGroup}>
                                      <TextField
                                        label="Status"
                                        fullWidth
                                        select
                                        SelectProps={{
                                          native: true
                                        }}

                                        margin="normal"
                                        variant="outlined"

                                        name='status'
                                        value={values.status}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.status && !!errors.status}
                                      >
                                        <option value="open">Open</option>
                                        <option value="ongoing">Ongoing</option>
                                        <option value="completed">Completed</option>
                                      </TextField>
                                      <ErrorMessage name="status" component="div" className={classes.formError}></ErrorMessage>
                                    </div>

                                    {/* Actions */}
                                    <div className={classes.formAction}>
                                      <Button type="button" onClick={this.navigateBack} disabled={isSubmitting} variant="outlined" size="large">Cancel</Button>
                                      <Button type="submit" disabled={isSubmitting || !isValid} variant="outlined" size="large" color="primary">Update</Button>
                                    </div>
                                  </form>

                                )}
                            </Formik>
                          )}
                        </Mutation>
                      );
                    }}
                  </Query>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Paper >
    );
  }
}

export default withStyles(styles)(UpdateTicket);
