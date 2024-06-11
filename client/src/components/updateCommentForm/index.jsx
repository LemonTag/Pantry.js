import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_COMMENT } from "../../utils/mutations";
import { QUERY_MONSTERS } from "../../utils/queries";

const UpdateCommentForm = ({
  monsterId,
  commentId,
  initialCommentText,
  handleCloseModal,
}) => {
  const [commentText, setCommentText] = useState(initialCommentText);

  const [updateComment, { error }] = useMutation(UPDATE_COMMENT, {
    refetchQueries: [{ query: QUERY_MONSTERS }],
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateComment({ variables: { monsterId, commentId, commentText } });
      await handleCloseModal();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <button type='submit'>Update Comment</button>
      {error && <div>Error: {error.message}</div>}
    </form>
  );
};

export default UpdateCommentForm;
