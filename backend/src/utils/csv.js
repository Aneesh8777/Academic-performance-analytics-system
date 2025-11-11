import { stringify } from 'csv-stringify';

export function toCSV(rows, columns) {
  return new Promise((resolve, reject) => {
    const s = stringify(rows, { header: true, columns });
    let csv = '';
    s.on('readable', () => { let row; while ((row = s.read()) !== null) csv += row; });
    s.on('error', reject);
    s.on('finish', () => resolve(csv));
    s.end();
  });
}
