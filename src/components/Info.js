import React from 'react';
import './Info.css';

const TableRow = ({ row, cols = [{ key: 'name' }, { key: 'value' }] }) => (
  <tr>
    {cols.map((col, index) => <td key={index}>{row[col.key]}</td>)}
  </tr>
);

const TableHeader = ({ cols }) => (
  <thead>
    <tr>
      {cols.map(col => <th key={col.key}>{col.label}</th>)}
    </tr>
  </thead>
);

const Table = ({ data, cols }) => (
  <table className="info-table">
    {cols && <TableHeader cols={cols} />}
    <tbody>{data.map((row, index) => <TableRow key={index} row={row} cols={cols} />)}</tbody>
  </table>
);

const BenchmarkInfo = ({ state, frames, data, cols }) => {
  if (state === 'RUNNING') {
    return <span>Benchmark results in {frames}</span>;
  } else if (state === 'DONE') {
    return <Table data={data} cols={cols} />;
  }
  return false;
}

const Info = ({ stats: { basic, bench } }) => (
  <div className="info">
    <Table data={basic.data} cols={basic.cols} />
    {bench.state !== 'IDLE' && <div className="divider" />}
    <BenchmarkInfo {...bench} />
  </div>
);

export default Info;
