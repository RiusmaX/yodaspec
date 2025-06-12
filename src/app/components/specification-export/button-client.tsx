'use client'

import { Button } from "@/components/ui/button";
import { adaptData } from "@/db/services/CSV/adapte-data";
import { ProjectCSV } from "@/db/services/CSV/project-CSV";
import { IFeature } from "@/types/interfaces";
import { Table } from "lucide-react";
import { redirect } from "next/navigation";

function ButtonClient({ features }: { features: IFeature[] }) {


  const handleClick = async (): Promise<void> => {
    if (features !== undefined) {
      const adapted = adaptData(features)
      await ProjectCSV(adapted)
    }
    redirect('/')
  }


  return (
    <Button className='m-1 hover:cursor-pointer' variant='outline' disabled={features === undefined} onClick={() => { void handleClick() }}><Table className='m-r-1' />CSV</Button>
  );
}

export default ButtonClient;