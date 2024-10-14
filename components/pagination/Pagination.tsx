"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import styles from "./pagination.module.scss";
import { Button } from "@chakra-ui/react";
import { formUrlQuery } from "@/lib/utils";

type PaginationProps = {
  page: number | string;
  totalPages: number;
  urlParamName: string;
};

export default function Pagination({
  page,
  totalPages,
  urlParamName,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onClick = (btnType: string) => {
    const pageValue = btnType === "next" ? Number(page) + 1 : Number(page) - 1;

    const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: urlParamName,
        value: pageValue.toString(),
    })
    router.push(newUrl, {scroll: false});
  };

  const displayBtn = (type: string) => {
    if((type==='prev') && (Number(page) <= 1))
        return {display:'none'}
    if((type==='next') && (Number(page) >= totalPages))
        return {display:'none'}
  }
  return (
    <div className={styles.container}>
      <Button onClick={() => onClick("prev")} style={displayBtn('prev')}>
        Prev
      </Button>
      <Button
        onClick={() => onClick("next")}
        style={displayBtn('next')}
      >
        Next
      </Button>
    </div>
  );
}
