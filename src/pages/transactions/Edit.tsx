import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import TransactionForm from "../../components/TransactionForm";

const EditTransaction = () => {
  const params = useParams();
  const navigate = useNavigate();

  useState(() => {
    (async () => {
      if (!params.id) {
        navigate(-1);
      }
    })();
  });

  return <TransactionForm mode="edit" transactionId={params.id} />;
};

export default EditTransaction;
