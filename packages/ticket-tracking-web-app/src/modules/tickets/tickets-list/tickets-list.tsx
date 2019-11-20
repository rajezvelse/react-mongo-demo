import * as React from 'react';

import uniqueId from 'lodash/uniqueId';
import { Theme, Grid, Paper, Table, TableHead, TableBody, TableRow, TableCell, Toolbar, Button, Box } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Moment from 'react-moment';
import { gql } from 'apollo-boost';
import { Query, QueryResult } from 'react-apollo';

import { Link as RouterLink } from 'react-router-dom';

import { Ticket } from 'src/interfaces/ticket';
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
  tableContainer: {
    padding: theme.spacing(5)
  },
  table: {
    border: "1px solid #e0e0e0"
  },
  tableBodyRow: {
    "&:hover": {
      background: "#eff0f1"
    }
  },
  tableHeaderCell: {
    background: "#8593a2",
    color: "white",
    fontSize: '16px',
    'font-weight': 'bold'
  },
  tableCellCenter: {
    'text-align': 'center'
  },
  actionButton: {
    marginRight: theme.spacing(1),
    'text-transform': 'none'
  }
});


class TicketsList extends React.Component<any, any>  {
  TICKETS_LIST_QUERY = gql`
  query {
    tickets {
      _id,
      ticketNumber,
      subject,
      description,
      priority,
      status,
      createdAt,
      updatedAt
    }
  }`;

  public render() {
    const { classes } = this.props;

    return (
      <Paper>
        <Grid container>
          <Grid item xs={12}>
            <Toolbar className={classes.sectionHeader}>
              <h2 className="section-title">Tickets</h2>
              <Box className={classes.sectionHeaderButtons}>
                <Button component={RouterLink} to={'/tickets/create'} variant="outlined" size="small" color="primary">Create new Ticket</Button>
              </Box>
            </Toolbar>

            <Box className={classes.tableContainer}>
              <Query query={this.TICKETS_LIST_QUERY}>
                {(result: QueryResult) => {
                  if (result.loading) return <DataLoading></DataLoading>
                  if (result.error) return <DataFetchError message={result.error.message}></DataFetchError>

                  return <Table className={classes.table}>
                    <TableHead >
                      <TableRow>
                        <TableCell className={classes.tableHeaderCell}>Ticket number</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Subject</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Priority</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Status</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Created Datetime</TableCell>
                        <TableCell className={classes.tableHeaderCell + ' ' + classes.tableCellCenter}>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {result.data.tickets.map((record: Ticket) =>
                        <TableRow key={uniqueId()} className={classes.tableBodyRow}>
                          <TableCell>{record.ticketNumber}</TableCell>
                          <TableCell>{record.subject}</TableCell>
                          <TableCell>
                            <TitleCase text={record.priority}></TitleCase>
                          </TableCell>
                          <TableCell>
                            <TitleCase text={record.status}></TitleCase>
                          </TableCell>
                          <TableCell>
                            <Moment date={record.createdAt} format="DD-MMM-YYYY HH:mm a"></Moment>
                          </TableCell>
                          <TableCell className={classes.tableCellCenter}>
                            <Button component={RouterLink} to={'/tickets/' + record._id} variant="outlined" size="small" color="primary" className={classes.actionButton}>View</Button>
                            <Button component={RouterLink} to={'/tickets/' + record._id + '/edit'} variant="outlined" size="small" className={classes.actionButton}>Edit</Button>
                          </TableCell>
                        </TableRow>)}
                    </TableBody>
                  </Table>

                }}
              </Query>
            </Box>

          </Grid>
        </Grid>
      </Paper >
    );
  }
}

export default withStyles(styles)(TicketsList);
