import * as React from 'react';
import { Theme, Grid, Paper, Toolbar, Box, TextField, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';


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

class CreateTicket extends React.Component<any, any>  {
  // Form validation schema
  validationSchema: Yup.ObjectSchema = Yup.object().shape({
    subject: Yup.string().required('Please enter Ticket subject'),
    priority: Yup.string().required('Please select Ticket priority'),
    description: Yup.string().required('Please add some description')
  });

  CREATE_TICKET_MUTATION = gql`
  mutation CreateTicket($ticketData: CreateTicketInput!) {
    createTicket(ticketData : $ticketData) {
      _id,
      ticketNumber
    }
  }`;


  navigateBack = () => {
    this.props.history.goBack();
  }



  public render() {
    const { classes } = this.props;

    return (
      <Paper>
        <Grid container>
          <Grid item xs={12}>
            <Toolbar className={classes.sectionHeader}>
              <h2 className="section-title">Create new Ticket</h2>
            </Toolbar>

            <Box className={classes.sectionContainer}>
              <Grid container>
                <Grid item lg={6} xs={12}>

                  {/* Mutation wrapper for posting data to the server */}
                  <Mutation mutation={this.CREATE_TICKET_MUTATION} onCompleted={(result: any) => this.props.history.push('/tickets')}>
                    {(createTicket: Function) => (

                      // Form definition
                      <Formik
                        enableReinitialize={true}
                        initialValues={{ subject: '', description: '', priority: 'low' }}
                        validate={values => { }}
                        validationSchema={this.validationSchema}

                        // Form submit action
                        onSubmit={async (values, { setSubmitting }) => {

                          try {
                            // Post to API
                            await createTicket({
                              variables: {
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

                              {/* Actions */}
                              <div className={classes.formAction}>
                                <Button type="button" onClick={this.navigateBack} disabled={isSubmitting} variant="outlined" size="large">Cancel</Button>
                                <Button type="submit" disabled={isSubmitting || !isValid} variant="outlined" size="large" color="primary">Create</Button>
                              </div>
                            </form>

                          )}
                      </Formik>
                    )}
                  </Mutation>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Paper >
    );
  }
}

export default withStyles(styles)(CreateTicket);
