import { useState } from "react";
import UpdateCommentForm from "../updateCommentForm";
import Auth from "../../utils/auth";
import { useMutation } from "@apollo/client";
import { REMOVE_COMMENT } from "../../utils/mutations";

const CommentList = ({ comments = [], monsterId }) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);

  const handleUpdateComment = (commentId) => {
    // Set the selected comment id and show the modal
    setSelectedComment(commentId);
    setShowUpdateModal(true);
  };

  const [removeComment] = useMutation(REMOVE_COMMENT);
  const handleDeleteComment = async (commentId) => {
    try {
      await removeComment({
        variables: { monsterId, commentId },
      });
      // Optionally, you can update the comment list after deletion
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };
  const handleCloseModal = () => {
    // Reset selected comment and hide the modal
    setSelectedComment(null);
    setShowUpdateModal(false);
  };

  if (!comments.length) {
    return <h3>No Comments Yet</h3>;
  }

  return (
    <>
      <h3
        className='p-5 display-inline-block'
        style={{ borderBottom: "1px dotted #1a1a1a" }}
      >
        Comments
      </h3>
      <div className='flex-row my-4'>
        {comments &&
          comments.map((comment) => (
            <div key={comment._id} className='col-12 mb-3 pb-3'>
              <div className='p-3 bg-dark text-light'>
                <h5 className='card-header'>
                  {comment.commentAuthor} commented{" "}
                  <span style={{ fontSize: "0.825rem" }}>
                    on {comment.createdAt}
                  </span>
                </h5>
                <p className='card-body'>{comment.commentText}</p>
                {Auth.loggedIn() &&
                  Auth.getProfile().data.username === comment.commentAuthor && (
                    <div>
                      <button onClick={() => handleUpdateComment(comment._id)}>
                        Edit
                      </button>
                      <button onClick={() => handleDeleteComment(comment._id)}>
                        Delete
                      </button>
                    </div>
                  )}
              </div>
            </div>
          ))}
        {showUpdateModal && (
          <div className='modal'>
            <div className='modal-content'>
              {/* Pass comment id and initial comment text to UpdateCommentForm */}
              <UpdateCommentForm
                monsterId={monsterId}
                commentId={selectedComment}
                handleCloseModal={handleCloseModal}
                initialCommentText={
                  comments.find((comment) => comment._id === selectedComment)
                    ?.commentText
                }
                onUpdate={() => {
                  handleCloseModal(); // Close modal after updating
                }}
              />
              <button onClick={handleCloseModal}>Close</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CommentList;
