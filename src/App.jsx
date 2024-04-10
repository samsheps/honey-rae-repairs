import { useEffect, useState } from "react";
import { getAllTickets } from "./services/ticketService.jsx";
import "./App.css";

export const App = () => {
  const [allTickets, setAllTickets] = useState([]);
  const [showEmergencyOnly, setShowEmergencyOnly] = useState(false);
  const [filteredTickets, setFilteredTickets] = useState([]);

  useEffect(() => {
    getAllTickets().then((ticketsArray) => {
      setAllTickets(ticketsArray); //the set function for state will trigger a rerender of our component; if we're setting our tickets here then we're rerendering our component
      console.log("tickets set!");
    });
  }, []); // ONLY runs on the initial render of component. the function is what we want to happen, the array is when we want it to happen. can think of this like an event listener. when we have an empty dependency array, this is telling our useEffect "only run this function on the initial render of our component"

  /* 
  
we run the above to get all of our tickts. fetching the tickets is asyncronous. This will happen while everything
else is happening at the same time 

in the meantime, we're also running the second useEffect below. 
if (showEmergencyOnly) - on our innitial render, it's false. 
so then we get to our "else" where we've setFilteredTickets with all of our tickets (setFilteredTickets(allTickets)). 
but what is the value of all tickts? it's an empty array. so until showEmergencyOnly changes, 
the second useEffect won't run again. So we've added "allTickets" so this way whenever 
showEmergencyOnly changes OR allTickets changes, then we'll run the useEffect function again 
and we'll be able to setFilteredTickets w/all the tickets. Once the first useEffect finishes, 
we set all tickets and get all our tickets back from the API (setAllTickets(ticketsArray)). 
if we have our allTickets in the dependency array for the second useEffect func, 
it's going to run that again, showEmergencyOnly will still be false on our initial render (we haven't clicked the button yet)
and we'll be able to set set this will all the tickets we got back (setFilteredTickets(allTickets)). 

*/

  useEffect(() => {
    if (showEmergencyOnly) {
      const emergencyTickets = allTickets.filter(
        (ticket) => ticket.emergency === true
      );
      setFilteredTickets(emergencyTickets);
    } else {
      setFilteredTickets(allTickets);
    }
  }, [showEmergencyOnly, allTickets]); // this function will run on both the initial render and whenever "[showEmergencyOnly]" changes

  return (
    <div className="tickets-container">
      <h2>Tickets</h2>
      <div>
        <button
          className="filter-btn btn-primary"
          onClick={() => {
            setShowEmergencyOnly(true);
          }}
        >
          Emergency
        </button>
        <button
          className="filter-btn btn-info"
          onClick={() => {
            setShowEmergencyOnly(false);
          }}
        >
          Show All
        </button>
      </div>
      <article className="tickes">
        {filteredTickets.map((ticket) => {
          return (
            <section className="ticket" key={ticket.id}>
              <header className="ticket-info">#{ticket.id}</header>
              <div>{ticket.description}</div>
              <footer>
                <div>
                  <div className="ticket-info">emergency</div>
                  <div>{ticket.emergency ? "yes" : "no"}</div>
                </div>
              </footer>
            </section>
          );
        })}
      </article>
    </div>
  );
};
