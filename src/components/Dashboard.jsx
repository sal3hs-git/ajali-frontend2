
export default function Dashboard({ onReportClick }) {
    return (
      <div>
        <h2>Dashboard</h2>
        <button onClick={onReportClick}>+ Report New Incident</button>
      </div>
    );
  }
  