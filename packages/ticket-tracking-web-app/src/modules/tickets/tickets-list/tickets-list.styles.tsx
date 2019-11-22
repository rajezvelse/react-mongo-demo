import { Theme } from '@material-ui/core';

export const styles = (theme: Theme) => ({
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