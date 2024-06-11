import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";
import UpdateMonsterForm from "../components/updateMonsterForm";
import { QUERY_SINGLE_MONSTER } from "../utils/queries";

const SingleMonster = () => {
  const { monsterId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_MONSTER, {
    variables: { monsterId: monsterId },
  });

  const monster = data?.monster || {};

  const [showUpdateMonsterModal, setShowUpdateMonsterModal] = useState(false);

  const handleCloseUpdateMonsterModal = () => setShowUpdateMonsterModal(false);
  const handleShowUpdateMonsterModal = () => setShowUpdateMonsterModal(true);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className='my-3'>
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
              <li key={i}>{weakness}</li>
            ))}
          </ul>
          <Button onClick={handleShowUpdateMonsterModal}>Update Monster</Button>
        </div>

        <div className='my-5'>
          <CommentList comments={monster.comments} monsterId={monster._id} />
        </div>
        <div className='m-3 p-4' style={{ border: "1px dotted #1a1a1a" }}>
          <CommentForm monsterId={monster._id} />
        </div>
      </div>

      <Modal
        show={showUpdateMonsterModal}
        onHide={handleCloseUpdateMonsterModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Monster</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Pass initialMonsterData prop here */}
          <UpdateMonsterForm
            monsterId={monster._id}
            initialMonsterData={monster}
            handleCloseUpdateMonsterModal={handleCloseUpdateMonsterModal}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseUpdateMonsterModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SingleMonster;
