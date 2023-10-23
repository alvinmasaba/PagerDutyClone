import React from "react";
import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export function SimplePagination({ currentPage, totalPages, onPageChange }) {
  const next = () => {
    if (currentPage === totalPages) return;
    onPageChange(currentPage++);
  };

  const prev = () => {
    if (currentPage === 1) return;
    onPageChange(currentPage--); // Subtract 2 because react-table uses 0-based index
  };

  return (
    <tr>
      <td className="flex justify-center items-center gap-8 !col-span-6">
        <IconButton
          size="sm"
          variant="outlined"
          onClick={prev}
          disabled={currentPage === 1}
        >
          <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
        </IconButton>
        <Typography color="gray" className="font-normal">
          Page <strong className="text-gray-900">{currentPage}</strong> of{" "}
          <strong className="text-gray-900">{totalPages}</strong>
        </Typography>
        <IconButton
          size="sm"
          variant="outlined"
          onClick={next}
          disabled={currentPage === totalPages}
        >
          <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
        </IconButton>
      </td>
    </tr>
  );
}
