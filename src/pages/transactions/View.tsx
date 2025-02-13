import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import TransactionForm from "../../components/TransactionForm";

const ViewTransaction = () => {
  const params = useParams();
  const navigate = useNavigate();

  useState(() => {
    (async () => {
      if (!params.id) {
        navigate(-1);
      }
    })();
  });

  return <TransactionForm mode="view" transactionId={params.id} />;
};

export default ViewTransaction;
