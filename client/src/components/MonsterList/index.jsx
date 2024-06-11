import { Link } from "react-router-dom";

const MonsterList = ({ monsters }) => {
  if (!monsters.length) {
    return <h3>No Monsters Yet</h3>;
  }
  console.log(monsters);
  return (
    <div>
      {monsters &&
        monsters.map((monster) => (
          <div key={monster._id} className='card mb-3'>
            <h4 className='card-header bg-dark text-light p-2 m-0'>
              {monster.monsterName}
            </h4>
            <div className='card-body bg-light p-2'>
              <h5>Type:</h5>
              <p>{monster.type}</p>
              <h5>Habitat:</h5>
              <p>{monster.habitat}</p>
              <h5>Weaknesses:</h5>
              <ul>
                {monster.weaknesses.map((weakness, i) => (
                  <li key={weakness[i]}>{weakness}</li>
                ))}
              </ul>
            </div>
            <Link
              className='btn btn-primary btn-block btn-squared'
              to={`/monsters/${monster._id}`}
            >
              Join the discussion on this monster.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default MonsterList;
