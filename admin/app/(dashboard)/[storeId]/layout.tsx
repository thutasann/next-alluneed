import Navbar from '@/components/navbar'
import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { Fragment } from 'react'

export default async function DashbaordLayout({ children, params }: { children: React.ReactNode; params: { storeId: string } }) {
  const { userId } = auth()

  if (!userId) {
    redirect('/sign-in')
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  })

  if (!store) {
    redirect('/')
  }

  return (
    <Fragment>
      <Navbar />
      <div className='mt-5'>{children}</div>
    </Fragment>
  )
}
