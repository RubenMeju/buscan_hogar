"use client";
import { Card, CardBody, CardFooter, Image, Link } from "@nextui-org/react";
import { typePet } from "../page";

interface CardMascotaProps {
  pet: typePet;
}

export default function CardMascota({ pet }: CardMascotaProps): JSX.Element {
  return (
    <Link href={`/mascota/${pet.slug}`}>
      <Card
        shadow="sm"
        key={pet.id}
        isPressable
        onPress={() => console.log("item pressed")}
      >
        <CardBody className="overflow-visible p-0">
          <Image
            shadow="sm"
            radius="lg"
            width="100%"
            alt={pet.name}
            className="w-full object-cover h-[140px]"
            src={pet.images[0].image}
          />
        </CardBody>
        <CardFooter className="text-small justify-between">
          <b>{pet.name}</b>
          <p className="text-default-500">{pet.breed}</p>
        </CardFooter>
      </Card>
    </Link>
  );
}
