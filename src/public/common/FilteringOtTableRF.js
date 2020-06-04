import React from 'react';
import { OtTableRF } from 'ot-ui';
import Select from 'react-select';
import crossfilter from 'crossfilter2';
import _ from 'lodash';

const FilteringOtTableRF = props => {
  const [filteredRows, addFilterDropdown] = useFilterDropdowns(props.data);

  return (
    <OtTableRF
      {...props}
      filters
      columns={props.columns.map(column =>
        column.filterable
          ? {
              ...column,
              filterable: undefined,
              renderFilter: addFilterDropdown(
                column.id,
                column.dropdownFilterValue
              ),
            }
          : column
      )}
      data={filteredRows}
    />
  );
};

const useFilterDropdowns = rows => {
  const [filteredRows, setFilteredRows] = React.useState(rows);
  const xf = React.useRef(crossfilter()).current;
  const dimensions = React.useRef({}).current;

  React.useEffect(
    () => {
      xf.add(rows);
      setFilteredRows(xf.allFiltered());
      return () => {
        xf.remove();
      };
    },
    [rows, xf]
  );

  const addFilterDropdown = (columnId, dropdownFilterValue) => {
    let valueAccessor = dropdownFilterValue || (row => row[columnId]);
    dimensions[columnId] = dimensions[columnId] || xf.dimension(valueAccessor);
    const dim = dimensions[columnId];
    return () => {
      const handler = selection => {
        if (selection) {
          dim.filter(cellValue => {
            if (_.isArray(cellValue)) {
              return _.some(
                cellValue,
                arrayElement => arrayElement === selection.value
              );
            } else {
              return cellValue === selection.value;
            }
          });
        } else {
          dim.filterAll();
        }

        setFilteredRows(xf.allFiltered());
      };
      const cellValues = xf.allFiltered().flatMap(row => {
        const cellValue = valueAccessor(row);
        if (_.isArray(cellValue)) {
          return cellValue;
        } else {
          return [cellValue];
        }
      });
      const options = _.sortedUniq(cellValues.sort()).map(value => ({
        label: value,
        value: value,
      }));
      return <Select isClearable options={options} onChange={handler} />;
    };
  };
  return [filteredRows, addFilterDropdown];
};

export default FilteringOtTableRF;
