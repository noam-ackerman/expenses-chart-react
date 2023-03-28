import './style/App.css';
import Expenses from "./components/Expenses";

function App() {
  let expenses = [
    {
      id: 0,
      title: "New TV",
      amount: 200,
      date: new Date(2021, 3, 14),
    },
    {
      id: 1,
      title: "React Course",
      amount: 80,
      date: new Date(2021, 5, 28),
    },
    {
      id: 2,
      title: "New Bed",
      amount: 65,
      date: new Date(2021, 11, 3),
    },
  ];

   return (
    <div className="bg-gradient p-3">
      <Expenses data={expenses}/>
    </div>
  );
}

export default App;
