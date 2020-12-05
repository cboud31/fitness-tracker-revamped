
import "./Routines.css";

const Routines = (props) => {
  const { masterRoutinesList, setMasterRoutineList } = props;

  // console.log("Master Routine", masterRoutinesList);

  return masterRoutinesList.map((routine, indx) => {
    const { id, creatorId, activities, creatorName, goal, name } = routine;

    return (
      <div className="routineCard">
        <h1 key={indx}>{name}</h1>
        <h2>Goal: {goal}</h2>
        {activities
          ? activities.map((activity, index) => {
              const { name, description, duration, count } = activity;

              return (
                <div className="activity">
                  <h3 key={index} className="name" onClick={(event) =>{
                      // console.log(event);
                      // create function that shows all routines this activity is in
                  }}>
                    Activity: {name}
                  </h3>
                  <h4 classname="description">Description: {description}</h4>
                  <h4 classname="duration">
                    Duration: {duration} mins. Repeat: {count}
                  </h4>
                </div>
              );
            })
          : ""}
        <h4 onClick={(event)=>{
            // console.log(event);
            // create function that shows all routines by this user
        }}>Created by: {creatorName}</h4>
      </div>
    );
  });
};


export default Routines;
