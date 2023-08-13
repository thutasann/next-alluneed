import prismadb from '@/lib/prismadb'
import { format } from 'date-fns'
import React from 'react'
import BillboardClient from './components/billboard-client'
import { CategoryColumn } from './components/columns'

async function CategoriesPage({ params }: { params: { storeId: string } }) {
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  const transformedCategoreis: CategoryColumn[] = categories.map(item => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.id,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }))

  return (
    <div className='flex flex-col'>
      <div className='flex-1 space-y-4 px-8 pt-2'>
        <BillboardClient data={transformedCategoreis} />
      </div>
    </div>
  )
}

export default CategoriesPage
