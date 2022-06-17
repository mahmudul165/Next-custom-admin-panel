import { useRouter } from "next/router";
import React from "react";

function edit() {
  const router = useRouter();
  const { id } = router.query;

  return <div>{id}</div>;
}

export default edit;
