import * as React from 'react';

import { gql } from 'apollo-boost';
import { Query, QueryResult, useMutation } from 'react-apollo';
import { Theme, Grid, Paper, Toolbar, Box, Typography, Chip, TextField, Button, Modal } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

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
  inputGroup: {
    margin: "30px"
  },
  formAction: {
    'text-align': 'right',
    margin: '30px',
    '& button': {
      marginLeft: '30px'
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


  constructor(props: any) {
    super(props);

    this.state = {
      showTicketDeleteConfirmation: false
    };
  }

  openTicketDelConfirmation = () => {
    this.setState({ showTicketDeleteConfirmation: true })
  }

  closeTicketDelConfirmation = () => {
    this.setState({ showTicketDeleteConfirmation: false })
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
                <Query query={this.GET_TICKET_QUERY} variables={{ ticketId }}>
                  {(result: QueryResult) => {
                    if (result.loading) return <DataLoading></DataLoading>
                    if (result.error) return <DataFetchError message={result.error.message}></DataFetchError>

                    let data = result.data.getTicket;

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
                        </Grid>
                      </Grid>);
                  }}
                </Query>

              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Ticket delete  confirmation modal */}
        <Modal open={this.state.showTicketDeleteConfirmation}>
          <Box className={classes.deleteModal}>

            <Typography>
              Are you sure to delete this Ticket?
            </Typography>
            <Box className={classes.modalButtons}>
              <Button onClick={this.closeTicketDelConfirmation} variant="outlined" size="small" >Cancel</Button>
              <Button variant="outlined" size="small" color="secondary">Delete</Button>
            </Box>
          </Box>
        </Modal>
      </>
    );
  }
}

export default withStyles(styles)(TicketDetails);
