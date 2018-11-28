import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import BasePage from './BasePage';
import TargetAssociationsDetail from '../components/TargetAssociationsDetail';

const targetAssociationsQuery = gql`
  query TargetAssociationsQuery($ensgId: String!) {
    dataTypes: __type(name: "DataType") {
      enumValues {
        name
        description
      }
    }
    targetAssociations(ensgId: $ensgId) {
      associations {
        disease {
          id
          name
        }
        score
        dataTypes {
          dataType
          score
        }
        therapeuticAreas {
          id
          name
        }
      }
    }
  }
`;

const TargetAssociationsPage = ({ match }) => {
  const { ensgId } = match.params;
  return (
    <BasePage>
      <Query query={targetAssociationsQuery} variables={{ ensgId }}>
        {({ loading, error, data }) => {
          if (loading || error) {
            return null;
          }

          return <TargetAssociationsDetail data={data} />;
        }}
      </Query>
    </BasePage>
  );
};

export default TargetAssociationsPage;
