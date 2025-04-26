const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="bg-secondary rounded-lg p-4">
        <h2 className="font-bold mb-2">Cash Flow</h2>
        <p>Display cash flow information here.</p>
      </div>
      <div className="bg-secondary rounded-lg p-4">
        <h2 className="font-bold mb-2">Upcoming Due Dates</h2>
        <p>Show upcoming due dates here.</p>
      </div>
      <div className="bg-secondary rounded-lg p-4">
        <h2 className="font-bold mb-2">Credit Card Summary</h2>
        <p>Display credit card summaries here.</p>
      </div>
    </div>
  );
};

export default Dashboard;
