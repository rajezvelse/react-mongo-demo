import * as React from 'react';

import uniqueId from 'lodash/uniqueId';
import { gql } from 'apollo-boost';
import { Query, QueryResult, Mutation, MutationResult } from 'react-apollo';
import { Theme, Grid, Paper, Toolbar, Box, Typography, Chip, TextField, Button, Modal, List, ListItem, ListItemText, ListItemAvatar } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';

import { Formik } from 'formik';
import * as Yup from 'yup';

import { Link as RouterLink } from 'react-router-dom';

import DataLoading from 'src/utils/DataLoading';
import DataFetchError from 'src/utils/DataFetchError';
import TitleCase from 'src/utils/TitleCase';

const styles = (theme: Theme) => ({
  sectionHeader: {
    position: 'relative' as any,
    borderBottom: '1px solid #e0e0e0',
    paddingLeft: '50px',
    paddingRight: '50px'
  },
  sectionHeaderButtons: {
    position: "absolute" as any,
    right: '50px',
    'text-align': 'right',
    '& button, & a': {
      marginLeft: '15px',
      'text-transform': 'none'
    }
  },
  sectionContainer: {
    padding: `${theme.spacing(1)}px ${theme.spacing(6)}px`
  },
  dataTitle: {
    margin: '20px 0'
  },
  dataChips: {
    marginBottom: '20px',
    '&>div': {
      marginRight: '10px',
      'font-weight': 'bold'
    }
  },
  dataFieldTitle: {
    'font-weight': 'bold'
  },
  dataText: {
    marginBottom: '20px',
    'text-indent': '30px'
  },
  commentsList: {
    '& li:not(:first-child)': {
      borderTop: '1px dashed #cbcbcb'
    },
    '& li:last-child': {
      borderTop: 'none'
    }
  },
  commentItem: {
    margin: '15px 47px',
    width: 'auto'
  },
  commentItemIcon: {
    fontSize: '2em' as any,
    color: '#cbcbcb'

  },
  commentForm: {
    width: '100%'
  },
  inputGroup: {
    margin: "10px 30px 15px 30px"
  },
  formAction: {
    'text-align': 'right',
    margin: '0 30px 30px 30px',
    '& button': {
      marginLeft: '30px',
      textTransform: 'none' as any
    }
  },
  formError: {
    color: '#f44336'
  },
  deleteModal: {
    background: '#fff',
    width: "30%",
    height: "auto",
    padding: "30px",
    borderRadius: "4px",
    marginLeft: "35%",
    position: "relative" as any,
    marginTop: "150px",
    border: "none",
    textAlign: "center" as any,
  },
  modalButtons: {
    marginTop: '20px',
    '& button': {
      marginRight: '15px',
      textTransform: 'none' as any
    }
  },
  modalErrorText: {
    color: '#a55752',
    marginTop: '15px',
    fontSize: '12px'
  }
});

class TicketDetails extends React.Component<any, any>  {
  GET_TICKET_QUERY = gql`
  query GetTicket($ticketId: String!) {
    getTicket(ticketId: $ticketId) {
      _id,
      ticketNumber,
      subject,
      description,
      priority,
      status,
      createdAt,
      updatedAt
      comments {
        _id,
        comment
      }
    }
  }
  `;

  DELETE_TICKET_MUTATION = gql`
  mutation DeleteTicket($ticketId: String!) {
    deleteTicket(ticketId: $ticketId)
  }
  `;

  ADD_TICKET_COMMENT_MUTATION = gql`
  mutation AddComment($commentData: AddTicketCommentInput!){
    addTicketComment(commentData: $commentData){
      _id,
      comment
    }
  }
  `;

  DELETE_TICKET_COMMENT_MUTATION = gql`
  mutation DeleteTicketComment($commentId: String!) {
    deleteTicketComment(commentId: $commentId)
  }
  `;

  commentValidationSchema: Yup.ObjectSchema = Yup.object().shape({
    comment: Yup.string().required('Please enter comment text')
  });

  constructor(props: any) {
    super(props);

    this.state = {
      showTicketDeleteConfirmation: false,
      ticketComments: [],
      selectedCommentToDelete: null
    };
  }

  setTicketComments = (ticketData: any) => {
    this.setState({ ticketComments: ticketData.comments });
  }

  appendTicketComment = (commentData: any) => {

    let comments = this.state.ticketComments;

    comments.push(commentData);

    this.setState({ ticketComments: comments });

  }

  onTicketCommentDelete = (commentId: string) => {
    let comments = this.state.ticketComments.filter((c: any) => c._id !== commentId);

    this.setState({ ticketComments: comments, selectedCommentToDelete: null });
  }

  openTicketDelConfirmation = () => {
    this.setState({ showTicketDeleteConfirmation: true })
  }

  closeTicketDelConfirmation = () => {
    this.setState({ showTicketDeleteConfirmation: false })
  }

  openTicketCommentDelConfirmation = (commentId: string) => {
    this.setState({ selectedCommentToDelete: commentId })
  }

  closeTicketCommentDelConfirmation = () => {
    this.setState({ selectedCommentToDelete: null })
  }

  navigateToTicketsList = () => {
    this.props.history.push('/tickets');
  }

  navigateBack = () => {
    this.props.history.goBack();
  }

  public render() {
    let ticketId = this.props.match.params.ticketId;
    const { classes } = this.props;

    return (
      <>
        <Paper>
          <Grid container>
            <Grid item xs={12}>
              <Toolbar className={classes.sectionHeader}>
                <h2 className="section-title">Ticket details</h2>

                <Box className={classes.sectionHeaderButtons}>
                  <Button onClick={this.navigateBack} variant="outlined" size="small" >Back</Button>

                  <Button onClick={this.openTicketDelConfirmation} variant="outlined" size="small" color="secondary">Delete Ticket</Button>

                  <Button component={RouterLink} to={`/tickets/${ticketId}/edit`} variant="outlined" size="small" color="primary" >Edit Ticket</Button>
                </Box>

              </Toolbar>

              <Box className={classes.sectionContainer}>


                {/* Fetching data from API */}
                <Query query={this.GET_TICKET_QUERY} variables={{ ticketId }} onCompleted={(data: any) => this.setTicketComments(data.getTicket)}>
                  {(getTicketResult: QueryResult) => {
                    if (getTicketResult.loading) return <DataLoading></DataLoading>
                    if (getTicketResult.error) return <DataFetchError message={getTicketResult.error.message}></DataFetchError>

                    let data = getTicketResult.data.getTicket;

                    return (
                      <Grid container>
                        <Grid item lg={12} xs={12}>
                          <Typography variant="h5" component="h3" className={classes.dataTitle}>{data.subject} (#{data.ticketNumber})</Typography>

                          <Box className={classes.dataChips}>
                            <Chip
                              avatar={<></>}
                              label={<TitleCase text={'Priority: ' + data.priority}></TitleCase>}
                              color="primary"
                              variant="outlined"
                            />
                            <Chip
                              avatar={<></>}
                              label={<TitleCase text={'Status: ' + data.status}></TitleCase>}
                              color="secondary"
                              variant="outlined"
                            />
                          </Box>

                          <Typography component="p" className={classes.dataFieldTitle}>Description: </Typography>
                          <Typography component="p" className={classes.dataText}>{data.description}</Typography>

                          <Typography component="p" className={classes.dataFieldTitle}>Comments: </Typography>

                          <List className={classes.commentsList}>
                            {this.state.ticketComments.map((comment: any) => (

                              <ListItem key={uniqueId()} className={classes.commentItem}>
                                <ListItemAvatar className={classes.commentItemIcon}>
                                  <FontAwesomeIcon icon={faCommentDots} ></FontAwesomeIcon>
                                </ListItemAvatar>
                                <ListItemText><Typography component="i">{comment.comment}</Typography></ListItemText>

                                <Box className={classes.sectionHeaderButtons}>
                                  <Button onClick={(e) => this.openTicketCommentDelConfirmation(comment._id)} variant="outlined" color="secondary" size="small">Delete comment</Button>

                                </Box>
                              </ListItem>
                            ))}

                            {/* Add new comment form */}
                            <ListItem>
                              <Mutation mutation={this.ADD_TICKET_COMMENT_MUTATION} onCompleted={(data: any) => this.appendTicketComment(data.addTicketComment)}>
                                {(addCommentCall: Function, result: MutationResult) => (
                                  // Form definition
                                  <Formik
                                    enableReinitialize={true}
                                    initialValues={{ comment: '' }}
                                    validate={values => { }}
                                    validationSchema={this.commentValidationSchema}

                                    // Form submit action
                                    onSubmit={async (values, { setSubmitting, resetForm }) => {

                                      try {
                                        // Post to API
                                        await addCommentCall({
                                          variables: {
                                            commentData: {
                                              ticketId: ticketId,
                                              comment: values.comment
                                            }
                                          }
                                        });
                                        // On success
                                        setSubmitting(false);
                                        resetForm();
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
                                        <form onSubmit={handleSubmit} noValidate autoComplete="off" className={classes.commentForm}>
                                          {/* Subject field */}
                                          <div className={classes.inputGroup}>
                                            <TextField
                                              fullWidth
                                              multiline
                                              rows="6"
                                              margin="normal"
                                              variant="outlined"

                                              name='comment'
                                              value={values.comment}
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                            />
                                          </div>

                                          {/* Actions */}
                                          <div className={classes.formAction}>
                                            <Button type="submit" disabled={isSubmitting || !isValid} variant="outlined" size="small" color="primary">Add comment</Button>
                                          </div>
                                        </form>
                                      )}
                                  </Formik>
                                )}
                              </Mutation>


                            </ListItem>
                          </List>
                        </Grid>
                      </Grid>);
                  }}
                </Query>

              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Ticket delete  confirmation modal */}
        <Mutation mutation={this.DELETE_TICKET_MUTATION} variables={{ ticketId }} onCompleted={this.navigateToTicketsList}>
          {(mutaionCall: Function, result: MutationResult) => (
            <Modal open={this.state.showTicketDeleteConfirmation}>

              <Box className={classes.deleteModal}>
                {(() => {
                  if (result.loading) return <DataLoading></DataLoading>

                  return (
                    <>

                      <Typography>Are you sure to delete this Ticket?</Typography>

                      <Box className={classes.modalButtons}>
                        <Button onClick={this.closeTicketCommentDelConfirmation} variant="outlined" size="small" >Cancel</Button>
                        <Button onClick={(e) => mutaionCall()} variant="outlined" size="small" color="secondary">Delete</Button>
                      </Box>

                      {result.error && <Typography className={classes.modalErrorText}>{result.error.message}</Typography>}
                    </>
                  )
                }
                )()}


              </Box>

            </Modal>
          )}
        </Mutation>

        {/* Ticket delete comment confirmation modal */}
        <Mutation mutation={this.DELETE_TICKET_COMMENT_MUTATION} variables={{}} onCompleted={(result: any) => this.onTicketCommentDelete(this.state.selectedCommentToDelete)}>
          {(mutaionCall: Function, result: MutationResult) => (
            <Modal open={!!this.state.selectedCommentToDelete}>

              <Box className={classes.deleteModal}>
                {(() => {
                  if (result.loading) return <DataLoading></DataLoading>

                  return (
                    <>

                      <Typography>Are you sure to delete this Ticket comment?</Typography>

                      <Box className={classes.modalButtons}>
                        <Button onClick={this.closeTicketDelConfirmation} variant="outlined" size="small" >Cancel</Button>
                        <Button onClick={(e) => mutaionCall({ variables: { commentId: this.state.selectedCommentToDelete } })} variant="outlined" size="small" color="secondary">Delete</Button>
                      </Box>

                      {result.error && <Typography className={classes.modalErrorText}>{result.error.message}</Typography>}
                    </>
                  )
                }
                )()}


              </Box>

            </Modal>
          )}
        </Mutation>
      </>
    );
  }
}

export default withStyles(styles)(TicketDetails);
