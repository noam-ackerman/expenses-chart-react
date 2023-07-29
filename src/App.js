import React from "react";
import { Hearts } from "react-loader-spinner";
import { useExpensesContext } from "./context/expensesContext";
import Expenses from "./components/Expenses";
import NewExpenseForm from "./components/NewExpenseForm";
import ExpensesFilter from "./components/ExpensesFilter";
import ExpensesChart from "./components/ExpensesChart";
import "./style/App.css";

function App() {
  const { expenses } = useExpensesContext();
  const [imageLoaded, setImageLoaded] = React.useState(false);

  return (
    <>
      <div className="bg-gradient p-3 pb-5">
        <img
          src="https://images.cooltext.com/5650973.png"
          alt="expenses-chart-title"
          className="title-image"
          style={{ opacity: imageLoaded ? 1 : 0 }}
          onLoad={() => setImageLoaded(true)}
        />
        {imageLoaded ? (
          <>
            <NewExpenseForm />
            {expenses.length ? (
              <>
                <ExpensesFilter />
                <ExpensesChart />
              </>
            ) : null}
            <Expenses />
          </>
        ) : (
          <div className="Loader">
            <Hearts
              height="180"
              width="180"
              color="#fdb4ff"
              ariaLabel="hearts-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        )}
      </div>
      <footer>
        <a
          href="https://github.com/noam-ackerman/expenses-chart-react"
          target="_blank"
          rel="noreferrer"
          className="codeLink"
        >
          Open-source code
        </a>{" "}
        designed and built by{" "}
        <a
          href="https://www.linkedin.com/in/noam-ackerman/"
          target="_blank"
          rel="noreferrer"
          className="codeLink"
        >
          Noam Ackerman
        </a>
      </footer>
    </>
  );
}

export default App;
