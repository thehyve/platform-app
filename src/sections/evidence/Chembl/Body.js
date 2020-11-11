import React, { Fragment } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'ot-ui';
import { betaClient } from '../../../client';
import usePlatformApi from '../../../hooks/usePlatformApi';
import SectionItem from '../../../components/Section/SectionItem';
import { DataTable, TableDrawer } from '../../../components/Table';
import Summary from './Summary';
import Description from './Description';

const CHEMBL_QUERY = gql`
  query ChemblQuery($ensemblId: String!, $efoId: String!, $size: Int!) {
    disease(efoId: $efoId) {
      id
      evidences(
        ensemblIds: [$ensemblId]
        enableIndirect: true
        datasourceIds: ["chembl"]
        size: $size
      ) {
        count
        rows {
          disease {
            id
            name
          }
          drug {
            id
            name
            drugType
            mechanismsOfAction {
              rows {
                mechanismOfAction
                targets {
                  id
                  approvedSymbol
                }
              }
            }
          }
          clinicalPhase
          clinicalStatus
          clinicalUrls {
            niceName
            url
          }
        }
      }
    }
  }
`;

const columns = [
  {
    id: 'disease.name',
    label: 'Disease/phenotype',
    renderCell: ({ disease }) => {
      return <Link to={`/disease/${disease.id}`}>{disease.name}</Link>;
    },
  },
  {
    id: 'drug.name',
    label: 'Drug',
    renderCell: ({ drug }) => {
      return <Link to={`/drug/${drug.id}`}>{drug.name}</Link>;
    },
  },
  {
    id: 'drug.drugType',
    label: 'Drug type',
  },
  {
    label: 'Mechanism of action',
    renderCell: ({ drug }) => {
      const {
        mechanismsOfAction: { rows },
      } = drug;
      return (
        <ul style={{ margin: 0, paddingLeft: '17px' }}>
          {rows.map(({ mechanismOfAction }) => (
            <li key={mechanismOfAction}>{mechanismOfAction}</li>
          ))}
        </ul>
      );
    },
  },
  {
    label: 'Target',
    renderCell: ({ drug }) => {
      const {
        mechanismsOfAction: { rows },
      } = drug;

      const allTargets = rows.reduce((acc, row) => {
        const { targets } = row;
        targets.forEach(({ id, approvedSymbol }) => {
          acc[id] = approvedSymbol;
        });
        return acc;
      }, {});

      return Object.entries(allTargets).map(([id, symbol]) => {
        return (
          <Fragment key={id}>
            <Link to={`/target/${id}`}>{symbol}</Link>{' '}
          </Fragment>
        );
      });
    },
  },
  {
    id: 'clinicalPhase',
    label: 'Phase',
  },
  {
    id: 'clinicalStatus',
    label: 'Status',
  },
  {
    label: 'Source',
    renderCell: ({ clinicalUrls }) => {
      const urlList = clinicalUrls.map(({ niceName, url }) => {
        return {
          name: niceName,
          url,
          group: 'sources',
        };
      });
      return <TableDrawer entries={urlList} caption="Sources" />;
    },
  },
];

const headerGroups = [
  {
    label: 'Disease information',
    colspan: 1,
  },
  {
    label: 'Drug information',
    colspan: 3,
  },
  {
    label: 'Target information',
    colspan: 1,
  },
  {
    label: 'Clinical trials information',
    colspan: '3',
  },
];

function Body({ definition, id, label }) {
  const { ensgId: ensemblId, efoId } = id;
  const { data: summaryData } = usePlatformApi(
    Summary.fragments.ChemblSummaryFragment
  );
  const request = useQuery(CHEMBL_QUERY, {
    variables: { ensemblId, efoId, size: summaryData.chemblSummary.count },
    client: betaClient,
  });

  return (
    <SectionItem
      definition={definition}
      request={request}
      renderDescription={() => (
        <Description symbol={label.symbol} diseaseName={label.name} />
      )}
      renderBody={({ disease }) => {
        const { rows } = disease.evidences;
        return (
          <DataTable
            headerGroups={headerGroups}
            columns={columns}
            rows={rows}
            dataDownloader
            showGlobalFilter
          />
        );
      }}
    />
  );
}

export default Body;