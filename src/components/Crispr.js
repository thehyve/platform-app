import React, { Component, Fragment } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import HelpIcon from '@material-ui/icons/Help';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'ot-ui';

const styles = () => ({
  helpIcon: {
    fontSize: '10px',
  },
});

class Crispr extends Component {
  state = {};

  componentDidMount() {
    const { symbol } = this.props;
    fetch(`https://api.cellmodelpassports.sanger.ac.uk/score_search/${symbol}`)
      .then(res => res.json())
      .then(res => {
        const crisprId =
          res.genes && res.genes.count > 0 ? res.genes.hits[0].id : null;

        this.setState({ crisprId });
      });
  }

  render() {
    const { classes } = this.props;
    const { crisprId } = this.state;

    return crisprId ? (
      <Fragment>
        {' '}
        | CRISPR depmap
        <Tooltip
          title="CRISPR-Cas9 cancer cell line dependency data from Project Score"
          placement="top"
          interactive
        >
          <sup>
            <HelpIcon className={classes.helpIcon} />
          </sup>
        </Tooltip>
        :{' '}
        <Link
          external
          to={`https://score.depmap.sanger.ac.uk/gene/${crisprId}`}
        >
          {crisprId}
        </Link>
      </Fragment>
    ) : null;
  }
}

export default withStyles(styles)(Crispr);
