import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_MONSTER } from "../../utils/mutations";
import { QUERY_MONSTERS } from "../../utils/queries";

const UpdateMonsterForm = ({
  monsterId,
  initialMonsterData,
  handleCloseUpdateMonsterModal,
}) => {
  const [formState, setFormState] = useState({
    monsterName: initialMonsterData.monsterName,
    type: initialMonsterData.type,
    habitat: initialMonsterData.habitat,
    weaknesses: initialMonsterData.weaknesses,
  });

  useEffect(() => {
    setFormState({
      monsterName: initialMonsterData.monsterName,
      type: initialMonsterData.type,
      habitat: initialMonsterData.habitat,
      weaknesses: initialMonsterData.weaknesses,
    });
  }, [initialMonsterData]);

  const [updateMonster, { error }] = useMutation(UPDATE_MONSTER, {
    refetchQueries: [{ query: QUERY_MONSTERS }],
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateMonster({ variables: { monsterId, ...formState } });
      setFormState({
        monsterName: "",
        type: "",
        habitat: "",
        weaknesses: [],
      });
      handleCloseUpdateMonsterModal();
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleWeaknessChange = (event, index) => {
    const newWeaknesses = [...formState.weaknesses];
    newWeaknesses[index] = event.target.value;
    setFormState({ ...formState, weaknesses: newWeaknesses });
  };

  const handleRemoveWeakness = (index) => {
    const newWeaknesses = [...formState.weaknesses];
    newWeaknesses.splice(index, 1);
    setFormState({ ...formState, weaknesses: newWeaknesses });
  };

  const addWeakness = () => {
    setFormState({ ...formState, weaknesses: [...formState.weaknesses, ""] });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        name='monsterName'
        value={formState.monsterName}
        onChange={handleChange}
        placeholder='Monster Name'
      />
      <input
        name='type'
        value={formState.type}
        onChange={handleChange}
        placeholder='Type'
      />
      <input
        name='habitat'
        value={formState.habitat}
        onChange={handleChange}
        placeholder='Habitat'
      />
      {formState.weaknesses.map((weakness, index) => (
        <div key={index}>
          <input
            value={weakness}
            onChange={(event) => handleWeaknessChange(event, index)}
            placeholder='Weakness'
          />
          <button type='button' onClick={() => handleRemoveWeakness(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type='button' onClick={addWeakness}>
        Add Weakness
      </button>
      <button type='submit'>Update Monster</button>
      {error && <div>Error: {error.message}</div>}
    </form>
  );
};

export default UpdateMonsterForm;
