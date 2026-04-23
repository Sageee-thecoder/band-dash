export default function SectionTable({ title, columns, rows }) {
  return (
    <section className="card">
      <h2>{title}</h2>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={`${title}-${index}`}>
              {columns.map((column) => (
                <td key={`${column}-${index}`}>{row[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
