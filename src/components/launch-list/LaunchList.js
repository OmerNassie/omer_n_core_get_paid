import { React } from "react";
import Launch from "../launch/Launch";
import "./launch-list.css";

const LaunchList = ({list}) => {

  return (
    <div className="list-container">
      {list && list.length > 0 && (
        list.map((launch) => {
          return (<Launch
            key={launch.id}
            id={launch.id}
            name={launch.name}
            status={launch.status}
            description={launch.description}
            image={launch.image}
            date={launch.date}
          />);
        })
      )}
    </div>
  );
};

export default LaunchList;
