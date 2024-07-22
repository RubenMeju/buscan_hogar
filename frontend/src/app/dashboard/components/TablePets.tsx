"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
  ChipProps,
  Image,
  Button,
} from "@nextui-org/react";
import { EditIcon } from "@/app/icons/EditIcon";
import { DeleteIcon } from "@/app/icons/DeleteIcon";
import { EyeIcon } from "@/app/icons/EyeIcon";
import { deletePetByID } from "@/app/action";

// Define la interfaz para los datos de las mascotas
interface PetData {
  id: string;
  name: string;
  breed: string;
  status: "Available" | "Adopted";
  images: { image: string }[];
}

// Define la interfaz para las props del componente TablePets
interface TablePetsProps {
  data: PetData[];
}

const statusColorMap: Record<string, ChipProps["color"]> = {
  Available: "success",
  Adopted: "danger",
};

// Define las columnas de la tabla
const columns = [
  { name: "IMAGE", uid: "image" },
  { name: "NAME", uid: "name" },
  { name: "RAZA", uid: "breed" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

export default function TablePets({ data }: TablePetsProps) {
  // Define el tipo de los parámetros de renderCell
  const renderCell = React.useCallback((data: PetData, columnKey: string) => {
    const cellValue = data[columnKey as keyof PetData];

    const handleDeletePet = async () => {
      const res = deletePetByID(data.id);
      console.log("el res: ", await res);
    };

    switch (columnKey) {
      case "image":
        return (
          <Image
            width={100}
            alt="NextUI hero Image"
            src={data.images[0].image}
            radius="sm"
          />
        );
      case "name":
        return <p> {data.name}</p>;
      case "breed":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">
              {cellValue as string}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[cellValue as string]}
            size="sm"
            variant="flat"
          >
            {cellValue as string}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <Button
                className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() => handleDeletePet()}
              >
                <DeleteIcon />
              </Button>
            </Tooltip>
          </div>
        );
      default:
        return cellValue as string;
    }
  }, []);

  return (
    <Table aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={data}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey as string)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
