import { useState } from "react";
import { useMutation } from "@apollo/client";

import { ADD_MONSTER } from "../../utils/mutations";
import { QUERY_MONSTERS } from "../../utils/queries";

const MonsterForm = () => {
  const [formState, setFormState] = useState({
    monsterName: "",
    type: "",
    habitat: "",
    weaknesses: [],
  });
  const [weaknessInput, setWeaknessInput] = useState("");
  const [addMonster, { error }] = useMutation(ADD_MONSTER, {
    refetchQueries: [QUERY_MONSTERS, "getMonsters"],
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addMonster({
        variables: { ...formState },
      });
      console.log(data);
      setFormState({
        monsterName: "",
        type: "",
        habitat: "",
        weaknesses: [],
      });
      setWeaknessInput("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };
  const handleWeaknessChange = (event) => {
    setWeaknessInput(event.target.value);
  };
  const handleAddWeakness = () => {
    if (weaknessInput.trim() !== "") {
      setFormState({
        ...formState,
        weaknesses: [...formState.weaknesses, weaknessInput],
      });
      setWeaknessInput("");
    }
  };

  const handleRemoveWeakness = (index) => {
    const updatedWeaknesses = formState.weaknesses.filter(
      (_, idx) => idx !== index
    );
    setFormState({ ...formState, weaknesses: updatedWeaknesses });
  };

  return (
    <div>
      <h3>Add Monster?</h3>

      <form
        className='flex-row justify-center justify-space-between-md align-center'
        onSubmit={handleFormSubmit}
      >
        <div className='col-12 col-lg-9'>
          <textarea
            name='monsterName'
            placeholder="Here's a new monster..."
            value={formState.monsterName}
            className='form-input w-100'
            style={{ lineHeight: "1.5", resize: "vertical" }}
            onChange={handleChange}
          ></textarea>
          <textarea
            name='type'
            placeholder='What type of monster is it?'
            value={formState.type}
            className='form-input w-100'
            style={{ lineHeight: "1.5", resize: "vertical" }}
            onChange={handleChange}
          ></textarea>
          <textarea
            name='habitat'
            placeholder='Where does it live?'
            value={formState.habitat}
            className='form-input w-100'
            style={{ lineHeight: "1.5", resize: "vertical" }}
            onChange={handleChange}
          ></textarea>
          {/* insert an input for an array of strings */}
          <div>
            <input
              type='text'
              placeholder='Enter a weakness'
              value={weaknessInput}
              onChange={handleWeaknessChange}
            />
            <button type='button' onClick={handleAddWeakness}>
              Add Weakness
            </button>
          </div>
          <div>
            <h4>Weaknesses:</h4>
            <ul>
              {formState.weaknesses.map((weakness, index) => (
                <li key={index}>
                  {weakness}
                  <button
                    type='button'
                    onClick={() => handleRemoveWeakness(index)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className='col-12 col-lg-3'>
          <button className='btn btn-primary btn-block py-3' type='submit'>
            Add Monster
          </button>
        </div>
        {error && (
          <div className='col-12 my-3 bg-danger text-white p-3'>
            {error.message}
          </div>
        )}
      </form>
    </div>
  );
};

export default MonsterForm;
